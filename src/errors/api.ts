export type HttpCode = number
export interface HttpBody {
  code: string
  message?: string
}
export class APIError extends Error {
  public httpCode: HttpCode
  public httpBody: HttpBody

  constructor(httpCode: HttpCode, httpBody: HttpBody) {
    super(httpBody.message)
    this.httpCode = httpCode
    this.httpBody = httpBody
  }
}
