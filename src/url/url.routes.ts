import Router from '@koa/router'
import * as controllers from './url.controllers'
import { State, Context } from '../context'
import * as validators from './url.validators'

export const router = new Router<State, Context>()

router.post('/', validators.create.middleware(), controllers.create)
