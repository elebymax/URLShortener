import dotenv from 'dotenv'
dotenv.config()

export const server = {
  host: process.env.SERVER_HOST,
  port: +(process.env.SERVER_PORT || 3000),
  domain: process.env.SERVER_DOMAIN,
}
