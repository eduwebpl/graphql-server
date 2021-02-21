export const RootPersonResolver = {
    getPerson: (_, {args}, {db}) => ([
        ...db.women,
        ...db.men
    ])
}

export const Person = {
    __resolveType(obj, context, info){
      if(obj.favoriteCars){
        return 'Man';
      }
      if(obj.favoriteClothes){
        return 'Woman';
      }
      return null; // GraphQLError is thrown
    },
}