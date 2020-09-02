import postgres from 'postgres'

export const up = async (sql: postgres.Sql<never>): Promise<void> => {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
  await sql`
    CREATE TABLE records (
      id         SERIAL PRIMARY KEY NOT NULL,
      url_id     INTEGER NOT NULL,
      ip         TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `
}
