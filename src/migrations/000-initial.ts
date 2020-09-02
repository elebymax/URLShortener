import postgres from 'postgres'

export const up = async (sql: postgres.Sql<never>): Promise<void> => {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
  await sql`
    CREATE TABLE urls (
      id         SERIAL PRIMARY KEY NOT NULL,
      hash       TEXT NOT NULL,
      url        TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      expired_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
      deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
    );
  `
  // await sql`CREATE INDEX CONCURRENTLY url_hash ON urls USING HASH (hash);`
}
