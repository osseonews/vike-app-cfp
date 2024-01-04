import { renderPage } from 'vike/server'
export default {
    async fetch(request, env) {

        if (!isAssetUrl(request.url)) {
            const userAgent = request.headers.get('User-Agent') || ""
            console.log('ua', userAgent)

            //intercept "api" routes - here you can use regular cloudflare workers if you want. Or use telefunc, by changing the url for the api
            //to do: maybe use a router library like itty or hono instead of these if/else with request.url?
            if (isApiUrl(request.url)) {
                // TODO: Add your custom /api/* logic here. 
                const data = {
                    hello: "world",
                };

                const json = JSON.stringify(data, null, 2);

                return new Response(json, {
                    headers: {
                        "content-type": "application/json;charset=UTF-8",
                    },
                });
            }
            //if it's not an api route, just do Vike SSR
            const response = await handleSsr(request.url, userAgent,env)
            if (response !== null) return response
        }
        // Otherwise, serve the static assets.
        // Without this, the Worker will error and no assets will be served.
        return env.ASSETS.fetch(request);
    },
}
function isAssetUrl(url) {
    const { pathname } = new URL(url);
    return pathname.startsWith("/assets/");
}

function isApiUrl(url) {
    const { pathname } = new URL(url);
    return pathname.startsWith("/api/");
}

async function handleSsr(url, userAgent,env) {
    //get KV Data
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