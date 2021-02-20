import { GraphQLServer } from 'graphql-yoga'
import {RootBookResolver, Book, RootMutationBookResolver} from './src/resolvers/BookResolvers'
import {RootAuthorResolver, RootMutationAuthorResolver} from './src/resolvers/AuthorResolvers'
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
      addBook(bookInput: BookInput!): Book
  }
  
  input BookInput {
      title: String!
      authors: AuthorConnectionInput!
  }
  
  input AuthorConnectionInput {
      create: AuthorInput
      connect: AuthorConnetInput
  }
  
  input AuthorConnetInput {
      ids: [String!]!
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
      ...RootMutationAuthorResolver,
      ...RootMutationBookResolver
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