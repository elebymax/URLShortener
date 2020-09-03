import Router from '@koa/router'
import { State, Context } from '../context'
import * as controllers from './url.controllers'
import * as validators from './url.validators'
import * as permission from '../permission'

export const router = new Router<State, Context>()

router.post('/', permission.auth.middleware, validators.create.middleware(), controllers.create)
