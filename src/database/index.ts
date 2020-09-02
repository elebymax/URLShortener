import postgres from 'postgres'
import { KoaContext } from '../context'
import * as migrations from '../migrations'
import { Connection } from '../config/postgres'

export class Database {
  public sql: postgres.Sql<never>
  public ready: Promise<boolean>

  constructor(connection: Connection) {
    this.sql = postgres('postgres://', {
      ...connection,
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
