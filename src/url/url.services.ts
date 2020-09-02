import { Context } from '../context'
import * as model from './url.model'
import { URLInfoOutput } from './url.model'
import isAfter from 'date-fns/isAfter'
import parseISO from 'date-fns/parseISO'
import { APIError } from '../errors'

export type CreateURLInput = model.URLPayload

export interface CreateURLOutput extends model.URLPayload {
  hash: string
}

export const create = async (ctx: Context, info: CreateURLInput): Promise<CreateURLOutput> => {
  let hash
  do {
    hash = generateHash(8)
  } while ((await model.findByHash(ctx, hash)).length)

  const urlInfoInput = Object.assign(info, {
    hash: hash,
  })
  const createdURL = await model.create(ctx, urlInfoInput)

  return {
    url: createdURL.url,
    hash: createdURL.hash,
    expiredAt: createdURL.expiredAt,
  }
}

export const findURL = async (ctx: Context, hash: string): Promise<string> => {
  const urlInfoOutputs: URLInfoOutput[] = (await model.findByHash(ctx, hash)).filter((u: URLInfoOutput) => {
    return !u.expiredAt || isAfter(parseISO(u.expiredAt), new Date())
  })

  const payload = urlInfoOutputs[0]
  if (!payload || !payload.url) {
    throw new APIError(404, { code: '', message: 'URL not found' })
  }

  return payload.url
}

const generateHash = (size: number): string => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < size; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
