export const RootAuthorResolver = {
    getAuthor: (_, {id}, {db}) => {
        return db.authors.find(author => author.id === id)
    }
}