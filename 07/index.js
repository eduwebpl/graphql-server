import { GraphQLServer } from 'graphql-yoga'
import {RootBookResolver, Book} from './src/resolvers/BookResolvers'
import {RootAuthorResolver, RootMutationResolver} from './src/resolvers/AuthorResolvers'
import {RootCommentResolver} from './src/resolvers/CommentResolvers'
import db from './db';

const typeDefs = `
  type Query {
    getBooks(first: Int! = 10, offset: Int! = 0): [Book!]!
    getAuthor(id: ID!): Author
    getBook(id: ID!): Book
    getComments: [Comment!]!
  }
  
  type Mutation {
      addAuthor(author: AuthorInput!): Author
  }
  
  input AuthorInput {
      firstName: String!
      lastName: String!
  }
  
  type Book {
      id: ID!
      title: String!
      authors: [Author!]!
      comments(filterByApproved: Boolean = false): [Comment!]!
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
  Mutation: {
      ...RootMutationResolver
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