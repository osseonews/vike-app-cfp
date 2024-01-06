import {
  error,      // creates error responses
  json,       // creates JSON responses
  //html,       // creates HTML responses
  //StatusError,
  Router,     // the ~440 byte router itself
  //withParams, // middleware: puts params directly on the Request
} from 'itty-router'
import { renderPage } from 'vike/server'
import { todos } from './data/posts' //default posts if KV fails for some reason

const router = Router()

router
  // add some middleware upstream on all routes to serve assets
  // Pages requirement: Serve the static assets.
  // Without this, the Worker will error and no assets will be served.
  .all('*', (req, env) => {
    const { pathname } = new URL(req.url);
    if (pathname.startsWith("/assets/")) {
      return env.ASSETS.fetch(req);
    }
  })
  //add other routes, i.e. api routes, can be anything see itty docs. here we just go with /api and make sure its a post request only.
  .post('/api/:message', ({ params }) => {
    //console.log ("params", params.message)
    const expr = params?.message
    let message;
    switch (expr) {
      case 'hello':
        message = "hello"
        break;
      case 'goodbye':
        message = "goodbye"
        break;
      default:
        message = "Sorry, no message"
    }
    const data = {
      message,
    };
    return data
  })

  //everything else serve with Vike 
  .all('*', async (req, env) => {
    const userAgent = req.headers.get('User-Agent') || ""
    console.log('ua', userAgent)
    const response = await handleSsr(req.url, userAgent, env)
    if (response !== null) return response
  })

// Cloudflare Worker module syntax
export default {
  fetch: (req, env, ctx) =>
    router
      .handle(req, env, ctx)
      .then(json)     // send as JSON
      .catch(error),  // catch errors
}

async function handleSsr(url, userAgent, env) {
  //get KV Data - you need try catch here and return a backup array in case KV failes, which it can sometimes - I've seen outages
  let postsData = []
  try { 
    const value = await env.POST_STORE.list();
    postsData = value.keys
  //we don't need to stop anything here, as this is just an issue with getting KV. We should set default posts here.
  } catch (error) {
    console.log ("error", error?.message || "KV Error Message")
    postsData = todos //if KV fails assign default posts
  }
  
  //"list_complete": true,
  //"cacheStatus": null
  //"keys" has the data
  const pageContextInit = {
    urlOriginal: url,
    userAgent,
    postsData: postsData
  }
  const pageContext = await renderPage(pageContextInit)
  const { httpResponse } = pageContext
  if (!httpResponse) {
    return null
  } else {
    const { statusCode: status, headers } = httpResponse
    const stream = httpResponse.getReadableWebStream()
    return new Response(stream, { headers, status })
  }
}