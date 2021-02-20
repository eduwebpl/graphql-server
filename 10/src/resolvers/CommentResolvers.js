import { v4 as uuidv4 } from 'uuid';

export const RootCommentResolver = {
    getComments: (_, args, {db}) => {
        return db.comments;
    }
}


export const RootMutationCommentResolver = {
    addComment: (_, {commentInput}, {db, pubsub}) => {
        const id = uuidv4();
        
        const newComment = {
            id,
            ...commentInput
        }
        
        db.comments.push(newComment)
        
        pubsub.publish('COMMENT_ADDED', {onCommentAdded: newComment})
        
        return newComment;
    },
    updateComment: (_, {id, commentInput}, {db}) => {
        const commentIndex = db.comments.findIndex(comment => comment.id === id)
        const existingComment = db.comments[commentIndex];
        
        const updatedComment = {
            ...existingComment,
            ...commentInput
        }
        
        db.comments[commentIndex] = updatedComment
        
        return updatedComment;
    }
}