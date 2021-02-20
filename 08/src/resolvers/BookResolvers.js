export const RootBookResolver = {
    getBooks: (_, {first, offset}, {db}) => {
        return db.books.slice(offset, first + offset);
    },
    getBook: (_, {id}, {db}) => {
        return db.books.find(book => book.id === id)
    }
}

export const Book = {
    authors: ({authors}, args, {db}) => {
        return db.authors.filter(author => authors.includes(author.id))
    },
    comments: ({id}, {filterByApproved}, {db}) => {
        return db.comments.filter(comment => {
            const basicFilter = comment => comment.bookId === id;
            
            if (!filterByApproved) {
                return basicFilter;
            } else {
                return basicFilter && comment.approved;
            }
        })
    }
}