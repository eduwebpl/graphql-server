import {withFilter} from 'graphql-yoga'

export const RootSubscriptionResolvers = {
    onCommentAdded: {
        subscribe: withFilter(
            (_, args, {pubsub}) => pubsub.asyncIterator('COMMENT_ADDED'),
            (payload, {bookId}) => payload.onCommentAdded.bookId === bookId
        )
    }
}