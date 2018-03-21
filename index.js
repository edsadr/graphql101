'use strict'

const { buildSchema } = require('graphql')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const app = express()
const port = process.env.port || 3000

// Defining a initial schama with GraphQL schema language
const schema = buildSchema(`
  type Message {
    id: ID!
    text: String!
    author: String!
    comment: String
  }

  type Query {
    getAllMessages: [Message]
  }
`)

// Setup a resolver for the query defined in the schema
const root = {
  getAllMessages: (args) => {
    return [
      {
        id: '1',
        text: 'This is a message from the past',
        author: 'Steve Jobs',
        comment: 'Obviously, this was not Steve'
      },
      {
        id: '2',
        text: 'This is a message from the present',
        author: 'Elon Musk',
        comment: 'Obviously, this is not Elon'
      },
      {
        id: '3',
        text: 'This is a message from the future',
        author: 'Marty McFly',
        comment: 'Looks like this was Marty'
      }
    ]
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
