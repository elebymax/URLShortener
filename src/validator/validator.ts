import Ajv from 'ajv'
import { openapi } from './openapi'
import { KoaContext } from '../context'
import { ValidatorError } from './errors'

export class Validator {
  public validate: Ajv.ValidateFunction

  private ajv: Ajv.Ajv

  constructor(schema: object) {
    this.ajv = new Ajv()
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.ajv.addSchema(openapi, 'openapi')
    this.ajv.addFormat('binary', {
      type: 'string',
      validate: () => true,
      async: false,
    })
    this.validate = this.ajv.compile(schema)
  }

  public middleware = (): ((ctx: KoaContext, next: () => Promise<void>) => Promise<void>) => {
    return async (ctx: KoaContext, next: () => Promise<void>): Promise<void> => {
      const valid = this.validate(ctx.request.body)
      if (!valid) {
        throw new ValidatorError(this.ajv.errorsText(this.validate.errors))
      }
      await next()
    }
  }
}
