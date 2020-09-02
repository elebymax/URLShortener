import { KoaContext } from '../context'
import * as service from './health.services'

export const healthz = async (ctx: KoaContext): Promise<void> => {
  ctx.body = await service.healthz(ctx)
}
