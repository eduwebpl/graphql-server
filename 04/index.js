import { GraphQLServer } from 'graphql-yoga'
import {RootBookResolver} from './src/resolvers/BookResolvers'
import db from './db';

const typeDefs = `
  type Query {
    getBooks: [Book!]!
  }
  
  type Book {
      id: ID!
      title: String!
  }
`

const resolvers = {
  Query: {
    ...RootBookResolver
  },
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: {
        db
    }
 })
server.start(() => console.log('Server is running on localhost:4000'))