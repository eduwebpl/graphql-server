import { GraphQLServer } from 'graphql-yoga'
import {RootBookResolver, Book} from './src/resolvers/BookResolvers'
import db from './db';

const typeDefs = `
  type Query {
    getBooks: [Book!]!
    getAuthor(id: ID!): Author
  }
  
  type Book {
      id: ID!
      title: String!
      authors: [Author!]!
  }
  
  type Author {
      id: ID!
      firstName: String!
      lastName: String!
  }
`

const resolvers = {
  Query: {
    ...RootBookResolver
  },
  Book,
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: {
        db
    }
 })
server.start(() => console.log('Server is running on localhost:4000'))