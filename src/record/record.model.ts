import { Context } from '../context'
import snakecaseKeys from 'snakecase-keys'
import camelcaseKeys from 'camelcase-keys'

export interface RecordPayload {
  ip: string
  urlId: number
}

export type RecordInfoInput = RecordPayload

export interface RecordInfoOutput extends RecordPayload {
  id: number
  createdAt: string
}

export const create = async (ctx: Context, info: RecordInfoInput): Promise<RecordInfoOutput> => {
  const data = snakecaseKeys(info)

  const rows = await ctx.database.sql<RecordInfoOutput>`INSERT INTO records ${ctx.database.sql(data as {})} RETURNING *`
  return camelcaseKeys(rows[0])
}
