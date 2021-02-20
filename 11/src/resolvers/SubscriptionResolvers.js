export const RootSubscriptionResolvers = {
    onCommentAdded: {
        subscribe: (_, args, {pubsub}) => pubsub.asyncIterator('COMMENT_ADDED')
    }
}