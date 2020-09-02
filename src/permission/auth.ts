import { Context } from '../context'
import * as config from '../config'
import { APIError } from '../errors'

export const middleware = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  if (ctx.request.header['x-api-key'] !== config.api.key) {
    throw new APIError(401, { code: '', message: 'Unauthorized' })
  }

  await next()
}
