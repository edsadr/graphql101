'use strict'

const { buildSchema } = require('graphql')
const fs = require('fs')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const root = require('./lib/resolvers')
const path = require('path')

const app = express()
const port = process.env.port || 3000
const schemaCode = fs.readFileSync(path.join(__dirname, 'lib', 'schema.graphql'), 'utf8')

// Defining a initial schema with GraphQL schema language
const schema = buildSchema(schemaCode)

// Serve the GraphQL in /api using an express middleware
app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}/api`)
})
