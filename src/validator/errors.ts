import * as error from '../errors/api'

export class ValidatorError extends error.APIError {
  constructor(message: string) {
    super(400, { code: '400B1', message })
  }
}
