export const RootCommentResolver = {
    getComments: (_, args, {db}) => {
        return db.comments;
    }
}