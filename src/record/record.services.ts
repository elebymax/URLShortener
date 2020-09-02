import { Context } from '../context'
import * as model from './record.model'

export type CreateRecordInput = model.RecordInfoInput

export type CreateRecordOutput = model.RecordInfoOutput

export const create = async (ctx: Context, info: CreateRecordInput): Promise<CreateRecordOutput> => {
  return await model.create(ctx, info)
}
