import Router from '@koa/router'
import * as urlControllers from '../url/url.controllers'
import { State, Context } from '../context'

export const router = new Router<State, Context>()

router.get('/:hash', urlControllers.redirect)
