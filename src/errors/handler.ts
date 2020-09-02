import { KoaContext } from '../context'
import { APIError } from './api'
export class Handler {
  constructor() {
    //
  }

  public middleware = (): ((ctx: KoaContext, next: () => Promise<void>) => Promise<void>) => {
    return async (ctx, next): Promise<void> => {
      try {
        await next()
      } catch (err) {
        if (err instanceof APIError) {
          ctx.status = err.httpCode
          ctx.body = err.httpBody
        }
      }
    }
  }
}
