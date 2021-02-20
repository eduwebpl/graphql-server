import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
  type Query {
    hello(name: String): String!
    welcomeMessage(name: String!): WelcomeMessage
  }
  
  type WelcomeMessage {
      country: String!
      message: String!
  }
`

const resolvers = {
  Query: {
    hello: (_, {name}) => `Hello ${name || 'World'}`,
    welcomeMessage: (_, {name}) => {
        return {
            country: 'Poland',
            name,
            message: ''
        }
    }
  },
  WelcomeMessage: {
      message: (parent) => {
          return `welcome ${parent.name} in ${parent.country}`
      }
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))