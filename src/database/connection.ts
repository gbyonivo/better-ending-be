import { Sequelize } from 'sequelize'
import { createClient } from 'redis'
import {
  REDIS_URL,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  DB_SCHEMA,
  DB_SSL,
} from '../utils/config'

const connectionUrl =
  DB_SSL === 'true'
    ? `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?ssl=${DB_SSL}`
    : `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

const sequelize = new Sequelize(connectionUrl, {
  logging: false,
  schema: DB_SCHEMA,
})

sequelize
  .authenticate()
  .then(() => {
    // Connection established
  })
  .catch((e) => {
    console.error(e)
  })

const redis = createClient({
  url: REDIS_URL,
})

redis.connect()

redis.on('error', (err: any) => {
  console.error('Redis error', err)
})
redis.on('connect', () => {
  console.log('Redis connected')
})
redis.on('ready', () => {
  console.log('Redis ready')
})
redis.on('end', () => {
  console.log('Redis end')
})

export { sequelize, redis }
