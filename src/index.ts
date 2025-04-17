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

const app = express()
const httpServer = http.createServer(app)
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError: (error) => {
    console.log('error', error)
    return error
  },
})

process.on('uncaughtException', (error) => {
  console.log(error)
})

process.on('unhandledRejection', (error) => {
  console.log(error)
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

server.start().then(() => {
  app.get('/test', (req: any, res: any) => {
    res.send('Here we go')
  })
  app.get('/test-error', () => {
    throw new BadInputError({ message: 'Test error' })
  })
  app.get('/clear-cache', async (req: any, res: any) => {
    await redis.flushAll()
    res.send('Cache cleared')
  })
  app.use(errorHandler)
  app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return {
          user: {},
        }
      },
    }),
  )
})

httpServer.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000/`)
})
