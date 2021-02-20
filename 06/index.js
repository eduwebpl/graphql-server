import { GraphQLServer } from 'graphql-yoga'
import {RootBookResolver, Book} from './src/resolvers/BookResolvers'
import {RootAuthorResolver} from './src/resolvers/AuthorResolvers'
import {RootCommentResolver} from './src/resolvers/CommentResolvers'
import db from './db';

const typeDefs = `
  type Query {
    getBooks: [Book!]!
    getAuthor(id: ID!): Author
    getBook(id: ID!): Book
    getComments: [Comment!]!
  }
  
  type Book {
      id: ID!
      title: String!
      authors: [Author!]!
      comments: [Comment!]!
  }
  
  type Author {
      id: ID!
      firstName: String!
      lastName: String!
  }
  
  type Comment {
      id: ID!
      content: String!
      bookId: ID!
      approved: Boolean
  }
`

const resolvers = {
  Query: {
    ...RootBookResolver,
    ...RootAuthorResolver,
    ...RootCommentResolver
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