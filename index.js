'use strict'

const { graphql, buildSchema } = require('graphql')

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

// Run the GraphQL query 'hello' and print out the response
graphql(schema, '{ hello }', root).then((data) => {
  console.log(data)
})
