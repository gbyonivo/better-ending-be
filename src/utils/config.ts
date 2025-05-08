import dotenv from 'dotenv'

dotenv.config()

export const OPEN_AI_SECRET = process.env.OPEN_AI_SECRET
export const DEEPSEEK_SECRET = process.env.DEEPSEEK_SECRET
export const MOVIE_READ_ACCESS_API_KEY = process.env.MOVIE_READ_ACCESS_API_KEY
export const DB_HOST = process.env.DB_HOST
export const DB_NAME = process.env.DB_NAME
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_PORT = process.env.DB_PORT
export const DB_SCHEMA = process.env.DB_SCHEMA
export const OMDB_API_KEY = process.env.OMDB_API_KEY
export const DB_SSL = process.env.DB_SSL
export const REDIS_URL = process.env.REDIS_URL
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
export const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY
