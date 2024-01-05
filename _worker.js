import {
  error,      // creates error responses
  json,       // creates JSON responses
  //html,       // creates HTML responses
  //StatusError,
  Router,     // the ~440 byte router itself
  withParams, // middleware: puts params directly on the Request
} from 'itty-router'
import { renderPage } from 'vike/server'

const router = Router()

router
  // add some middleware upstream on all routes
  //.all('*', withParams)
  .all('*', (req, env) => {
    const { pathname } = new URL(req.url);
    if (pathname.startsWith("/assets/")) {
      return env.ASSETS.fetch(req);
    }
  })

  // Pages requirement: Serve the static assets.
  // Without this, the Worker will error and no assets will be served.
  .get('/todos', (params) => {
    const todos = [
      { id: '1', message: 'Pet the puppy' },
      { id: '2', message: 'Pet the kitty' },
    ]
    const ID = params?.query?.id
    if (ID) {
      const todo = todos.find(t => t.id === ID)
      return todo
    }
    //console.log ("env", env.BASIC_TOKEN)
    return { todos }
  })
  
  //everything else serve with Vike 
  .all('*', async (req, env) => {
    const userAgent = req.headers.get('User-Agent') || ""
    console.log('ua', userAgent)
    const response = await handleSsr(req.url, userAgent, env)
    if (response !== null) return response
  })

// Example: Cloudflare Worker module syntax
export default {
  fetch: (req, env, ctx) =>
    router
      .handle(req, env, ctx)
      .then(json)     // send as JSON
      .catch(error),  // catch errors
}

async function handleSsr(url, userAgent, env) {
  //get KV Data - you need try catch here and return a backup array in case KV failes, which it can sometimes - I've seen outages
  const value = await env.POST_STORE.list();
  //"list_complete": true,
  //"cacheStatus": null
  //"keys" has the data
  const postsData = value.keys
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