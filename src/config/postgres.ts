import dotenv from 'dotenv'
dotenv.config()

export const postgres = {
  url: process.env.POSTGRES_CONNECTION_URL || '',
  password: process.env.POSTGRES_PASSWORD || '',
}
