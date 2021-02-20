export const RootBookResolver = {
    getBooks: (_, args, {db}) => {
        return db.books;
    }
}