'use strict'

const { buildSchema } = require('graphql')
const fs = require('fs')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const path = require('path')

const app = express()
const port = process.env.port || 3000
const schemaCode = fs.readFileSync(path.join(__dirname, 'lib', 'schema.graphql'), 'utf8')
const storage = require('./lib/storage')

// Defining a initial schema with GraphQL schema language
const schema = buildSchema(schemaCode)

// Setup a resolver for the query defined in the schema
const root = {
  getMessage: (args) => {
    const message = storage.filter((item) => item.id === args.id)
    return message[0]
  },
  getAllMessages: (args) => {
    return storage
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
