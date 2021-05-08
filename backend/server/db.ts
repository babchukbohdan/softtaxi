import { Pool } from 'pg'

const port = parseInt(process.env.DB_PORT!, 10) || 5432

export default new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: port,
  database: process.env.DB_DATABASE,
})
