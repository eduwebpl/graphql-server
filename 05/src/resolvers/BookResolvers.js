export const RootBookResolver = {
    getBooks: (_, args, {db}) => {
        return db.books;
    },
    getBook: (_, {id}, {db}) => {
        return db.books.find(book => book.id === id)
    }
}

export const Book = {
    authors: ({authors}, args, {db}) => {
        return db.authors.filter(author => authors.includes(author.id))
    },
    comments: ({id}, args, {db}) => {
        return db.comments.filter(comment => comment.bookId === id)
    }
}