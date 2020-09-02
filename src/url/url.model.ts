import { Context } from '../context'
import snakecaseKeys from 'snakecase-keys'
import camelcaseKeys from 'camelcase-keys'

export interface URLPayload {
  url: string
  expiredAt?: string | null
}

export interface URLInfoInput extends URLPayload {
  hash: string
}

export interface URLInfoOutput extends URLPayload {
  id: number
  hash: string
  createdAt: string
  deletedAt: string
}

export const create = async (ctx: Context, info: URLInfoInput): Promise<URLInfoOutput> => {
  const data = snakecaseKeys(info)

  const rows = await ctx.database.sql<URLInfoOutput>`INSERT INTO urls ${ctx.database.sql(data as {})} RETURNING *`
  return camelcaseKeys(rows[0])
}

export const findByHash = async (ctx: Context, hash: string): Promise<URLInfoOutput[]> => {
  const rows = await ctx.database.sql<URLInfoOutput[]>`
    SELECT * FROM urls 
    WHERE hash = ${hash} AND deleted_at IS NULL
  `
  return camelcaseKeys(JSON.parse(JSON.stringify(rows)))
}
