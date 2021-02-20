import { v4 as uuidv4 } from 'uuid';

export const RootAuthorResolver = {
    getAuthor: (_, {id}, {db}) => {
        return db.authors.find(author => author.id === id)
    }
}

export const RootMutationResolver = {
    addAuthor: (_, {author}, {db}) => {
        const id = uuidv4();
        
        const authorDb = {
            id,
            firstName: author.firstName,
            lastName: author.lastName,
        }
        
        db.authors.push(authorDb)
        
        return authorDb;
    }
}