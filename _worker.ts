import {
  error,      // creates error responses
  json,       // creates JSON responses
  //html,       // creates HTML responses
  StatusError,
  Router,     // the ~440 byte router itself
  withParams, // middleware: puts params directly on the Request
  IRequest,
} from 'itty-router'
import { KVNamespace, ExecutionContext } from '@cloudflare/workers-types'
// define a custom RequestType
type DaliRequest = {
  customTopic?: string
} & IRequest

// declare what's available in our env
export interface Env {
  CL_TOKEN_STORE_DC1: KVNamespace
  ASSETS: any,
}

// create a convenient duple
type CF = [env: Env, context: ExecutionContext]
const todos = [
  { id: '1', message: 'Pet the puppy' },
  { id: '2', message: 'Pet the kitty' },
]
// then pass them to the Router
const router = Router<DaliRequest, CF>()


router
  // add some middleware upstream on all routes
  .all('*', withParams)
  /*EXAMPLES*/
  // ise .get for GET list of todos with authorization
  .get('/todos', (params) => {
    //console.log ("params query", params.query?.id) //if send ?id=
    const ID = params?.query?.id
    if (ID) {
      const todo = todos.find(t => t.id === ID)
      return todo
    }
    //console.log ("env", env.BASIC_TOKEN)
    return { todos }
  })

  // GET single todo, by ID -  of :/id
  .get('/todos/:id',
    ({ id }) => {
      const todo = todos.find(t => t.id === id)
      if (todo) {
        return todo
      }
      throw new StatusError(400, 'No Todo.')
    }
  )


  /*END OF EXAMPLES*/


  // 
  .all('*', (req, env) => {
    return env.ASSETS.fetch(req);
  })

// Example: Cloudflare Worker module syntax
export default {
  fetch: (req: IRequest, env: Env, ctx: ExecutionContext) =>
    router
      .handle(req, env, ctx)
      .then(json)     // send as JSON
      .catch(error),  // catch errors
}