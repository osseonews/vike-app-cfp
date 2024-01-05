//see implementation here for KV: https://github.com/honojs/examples/blob/main/blog/src/model.ts
//Remember you want a prefix for the id, or key, see here: https://developers.cloudflare.com/kv/api/list-keys/#list-method
export default {
    async fetch(request, env) {
      const MOCK_POSTS = [
        {
          key: "1",
          content: "Hello, world!",
          author: "Jane Doe",
          postedAt: "2022-08-10T14:34:00.000Z",
        },
        {
          key: "2",
          content: "Hello ublog!",
          author: "Cody Reimer",
          postedAt: "2022-08-10T13:27:00.000Z",
        },
        {
          key: "3",
          content: "Wow, this is pretty cool!",
          author: "Zoey Washington",
          postedAt: "2022-08-10T12:00:00.000Z",
        },
      ];
      await Promise.all(
        // We'll do this in parallel with Promise.all,
        // just to be cool.
        MOCK_POSTS.map((post) =>
          env.POST_STORE.put(post.key, post.content, {
            metadata: {
              author: post.author,
              postedAt: post.postedAt,
            },
          })
        )
      );
      const value = await env.POST_STORE.list();
      //"list_complete": true,
      //"cacheStatus": null
      //"keys" has the data
      const data = value.keys
      const json = JSON.stringify(data, null, 2);

            return new Response(json, {
                headers: {
                    "content-type": "application/json;charset=UTF-8",
                },
            });
  
    }
  }