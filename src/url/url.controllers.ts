import { KoaContext } from '../context'
import * as services from './url.services'
import * as record from '../record'
import * as config from '../config'

export const create = async (ctx: KoaContext): Promise<void> => {
  const info = await services.create(ctx, ctx.request.body)

  ctx.status = 201
  ctx.body = {
    url: `${config.server.domain}/${info.hash}`,
  }
}

export const redirect = async (ctx: KoaContext): Promise<void> => {
  const info = await services.findURL(ctx, ctx.params.hash)

  await record.services.create(ctx, {
    ip: ctx.ip,
    urlId: info.id,
  })

  ctx.status = 302
  ctx.redirect(info.url)
}
