export const RootBookResolver = {
    getBooks: (_, args, {db}) => {
        return db.books;
    }
}

export const Book = {
    authors: ({authors}, args, {db}) => {
        return db.authors.filter(author => authors.includes(author.id))
    }
}