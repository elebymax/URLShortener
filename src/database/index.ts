import postgres from 'postgres'
import { KoaContext } from '../context'
import * as migrations from '../migrations'

export class Database {
  public sql: postgres.Sql<never>
  public ready: Promise<boolean>

  constructor(url: string, password: string) {
    this.sql = postgres(url, {
      password: password,
      debug: (connection, query, parameters) => {
        console.log(query, parameters)
      },
    })
    this.ready = this.initialize()
  }

  private initialize = async (): Promise<boolean> => {
    await migrations.up(this.sql)
    return true
  }

  public middleware = (): ((ctx: KoaContext, next: () => Promise<void>) => Promise<void>) => {
    return async (ctx, next): Promise<void> => {
      await this.ready
      ctx.database = this
      await next()
    }
  }
}
