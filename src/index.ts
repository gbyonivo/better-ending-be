import { ApolloServer } from '@apollo/server'
import bodyParser from 'body-parser'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import { typeDefs } from './schema/schema'
import { resolvers } from './resolvers/resolvers'

const app = express()
const httpServer = http.createServer(app)
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

server.start().then(() => {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.get('/test', (req: any, res: any) => {
    res.send('Here we go')
  })
})

httpServer.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000/`)
})
