import { Context } from '../context'

export interface Status {
  status: string
  message?: string
}
export const healthz = async (ctx: Context): Promise<Status> => {
  await ctx.database.ready
  return { status: 'ok' }
}
