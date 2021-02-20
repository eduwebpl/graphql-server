import { v4 as uuidv4 } from 'uuid';
import {RootAuthorResolver, RootMutationAuthorResolver} from './AuthorResolvers'

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

export const RootMutationBookResolver = {
    addBook: (_, {bookInput}, {db}) => {
        const id = uuidv4();
        const {title, authors} = bookInput;
        
        let resolvedAuthors = [];
        
        if (authors.connect && authors.connect.ids.length) {
            resolvedAuthors = authors.connect.ids.map(id => {
                const author = RootAuthorResolver.getAuthor(null, {id}, {db});
                return author && author.id;
            })
        }
        
        if (authors.create) {
            const addedAuthor = RootMutationAuthorResolver.addAuthor(null, {author: authors.create}, {db})
            resolvedAuthors = [addedAuthor.id]
        }
        
        const book = {
            id,
            title,
            authors: resolvedAuthors
        }
        
        db.books.push(book);
        
        return book;
    }
}