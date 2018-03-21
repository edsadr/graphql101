'use strict'

const { buildSchema } = require('graphql')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const app = express()
const port = process.env.port || 3000

// Defining a initial schama with GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// Setup a resolver for the query defined in the schema
const root = {
  hello: () => {
    return 'Hello world!'
  }
}

// Serve the GraphQL in /api using an express middleware
app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}/api`)
})
