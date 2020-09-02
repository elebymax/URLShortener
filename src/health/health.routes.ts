import { State, Context } from '../context'
import Router from '@koa/router'
import * as controllers from './health.controllers'

export const router = new Router<State, Context>()

router.get('/', controllers.healthz)
