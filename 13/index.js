import { GraphQLServer, PubSub} from 'graphql-yoga'
import {RootBookResolver, Book, RootMutationBookResolver} from './src/resolvers/BookResolvers'
import {RootAuthorResolver, RootMutationAuthorResolver} from './src/resolvers/AuthorResolvers'
import {RootCommentResolver, RootMutationCommentResolver} from './src/resolvers/CommentResolvers'
import {RootSubscriptionResolvers} from './src/resolvers/SubscriptionResolvers'
import {RootPersonResolver, Person} from './src/resolvers/PersonResolvers'
import db from './db';
import dotenv from 'dotenv'

dotenv.config()

const typeDefs = `
  type Query {
    getBooks(first: Int! = 10, offset: Int! = 0): [Book!]!
    getAuthor(id: ID!): Author
    getBook(id: ID!): Book
    getComments: [Comment!]!
    getPerson: [Person]
  }
  
  type Mutation {
      addAuthor(author: AuthorInput!): Author
      addBook(bookInput: BookInput!): Book
      addComment(commentInput: CommentInput): Comment
      updateComment(id: ID!, commentInput: CommentInput): Comment
  }
  
  type Subscription {
      onCommentAdded(bookId: ID!): Comment
  }
  
  input CommentInput {
      bookId: ID
      content: String
      approved: Boolean = false
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
  
  
  type Woman {
      id: ID!
      age: Int!
      firstName: String!
      lastName: String!
      favoriteClothes: [String!]!
  }
  
  type Man {
      id: ID!
      age: Int!
      firstName: String!
      lastName: String!
      favoriteCars: [String!]!
  }
  
  union Person = Woman | Man
  
`



const resolvers = {
  Query: {
    ...RootBookResolver,
    ...RootAuthorResolver,
    ...RootCommentResolver,
    ...RootPersonResolver
  },
  Mutation: {
      ...RootMutationAuthorResolver,
      ...RootMutationBookResolver,
      ...RootMutationCommentResolver
  },
  Subscription: {
      ...RootSubscriptionResolvers
  },
  Book,
  Person
}

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: {
        db,
        pubsub
    }
 })
server.start({
    playground: process.env.PRODUCTION === 'true' ? false : '/'
}, () => console.log('Server is running on localhost:4000'))

