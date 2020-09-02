import Koa from 'koa'
import Router from '@koa/router'
import Cors from '@koa/cors'
import BodyParser from 'koa-bodyparser'
import http from 'http'

import * as config from './config'
import * as errors from './errors'
import * as route from './route'
import * as health from './health'
import * as url from './url'
import { State, Context } from './context'
import { Database } from './database'

export const app = new Koa<State, Context>()
export const server = http.createServer(app.callback())

const database = new Database(config.postgres)
const handler = new errors.Handler()

const router = new Router<State, Context>()
router.use('', route.router.routes())
router.use('/healthz', health.router.routes())
router.use('/urls', url.router.routes())

app.proxy = true
app.use(
  Cors({
    origin: () => {
      return '*'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Access-Control-Allow-Origin'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowHeaders: ['Origin', 'Content-Type', 'Authorization', 'Accept'],
  }),
)
app.use(BodyParser())
app.use(handler.middleware())
app.use(database.middleware())
app.use(router.routes())
app.use(router.allowedMethods())

export const run = ({ port, host } = config.server): http.Server => server.listen(port, host)
