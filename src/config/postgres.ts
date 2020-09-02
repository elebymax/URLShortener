import dotenv from 'dotenv'
dotenv.config()

export interface Connection {
  user: string
  password: string
  database: string
  host: string
  path: string
}

export const postgres = {
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '',
  database: process.env.POSTGRES_DATABASE || 'url_shortener',
  host: process.env.POSTGRES_HOST || 'localhost',
  path: process.env.NODE_ENV === 'production' ? '/cloudsql/' : '',
}
