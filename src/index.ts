import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { typeDefs } from './schema/schema'
import { resolvers } from './resolvers/resolvers'
import { expressMiddleware } from '@apollo/server/express4'
import { redis } from './database/connection'
import { BadInputError } from './errors/bad-input-error'
import { shutdown } from './utils/shutdown'
import { errorHandler } from './errors/error-handler'
import { getDailyWeather, getWeather } from './services/weather-service'
import { validationResult, query } from 'express-validator'
import 'express-async-errors'

const app = express()
const httpServer = http.createServer(app)
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError: (error) => {
    console.log('==================formatError=============================')
    console.log('error', error)
    return error
  },
})

app.use(cors())
app.get('/test', (req: any, res: any) => {
  res.send('Here we go')
})
app.get('/clear-cache', async (req: any, res: any) => {
  await redis.flushAll()
  res.send('Cache cleared')
})
app.get(
  '/weather',
  [query('city').notEmpty().withMessage('City is required')],
  async (req: any, res: any) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new BadInputError({
        errors: errors.array(),
        message: 'Invalid input',
      })
    }
    const weatherReport = await getWeather(req.query.city)
    res.json(weatherReport)
  },
)
app.get(
  '/weather/daily',
  [query('lon').isFloat(), query('lat').isFloat()],
  async (req: any, res: any) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new BadInputError({
        errors: errors.array(),
        message: 'Invalid input',
      })
    }
    const weatherReport = await getDailyWeather({
      lon: req.query.lon,
      lat: req.query.lat,
    })
    res.json(weatherReport)
  },
)
app.get('/test-error', () => {
  throw new BadInputError({ message: 'Test error' })
})
app.use(errorHandler)
server.start().then(() => {
  app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    // @ts-ignore
    expressMiddleware(server, {
      // @ts-ignore
      context: async ({ req, res }: { req: Request; res: Response }) => {
        return {
          req,
          res,
        }
      },
    }),
  )
})

httpServer.listen({ port: 4040 }, () => {
  console.log(`🚀 Server ready at http://localhost:4040/`)
})

process.on('uncaughtException', (error) => {
  console.log(error)
  httpServer.close(() => {
    process.exit(1)
  })
})

process.on('unhandledRejection', (error) => {
  console.log(error)
  httpServer.close(() => {
    process.exit(1)
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT received. Cleaning up...')
  shutdown()
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Cleaning up...')
  shutdown()
  process.exit(0)
})
