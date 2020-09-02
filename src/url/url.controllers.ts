import { KoaContext } from '../context'
import * as services from './url.services'

export const create = async (ctx: KoaContext): Promise<void> => {
  const info = await services.create(ctx, ctx.request.body)

  ctx.status = 201
  ctx.body = info
}

export const redirect = async (ctx: KoaContext): Promise<void> => {
  console.log(ctx.params.hash)
  const hash: string = await services.findURL(ctx, ctx.params.hash)

  ctx.status = 302
  ctx.redirect(hash)
}
