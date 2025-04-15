import { ApolloServer } from '@apollo/server'
import bodyParser from 'body-parser'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { typeDefs } from './schema/schema'
import { resolvers } from './resolvers/resolvers'
import { expressMiddleware } from '@apollo/server/express4'

const app = express()
const httpServer = http.createServer(app)
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

server.start().then(() => {
  app.get('/test', (req: any, res: any) => {
    res.send('Here we go')
  })
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

httpServer.listen({ port: 5001 }, () => {
  console.log(`🚀 Server ready at http://localhost:5001/`)
})
