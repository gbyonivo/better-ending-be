export const typeDefs = `
  type Ending {
    movieId: String
    movieImage: String
    content: String
    aiName: String
  }
  type Query {
    endings: [Ending]
  }

  type Mutation {
    createEnding(movieId: String): Ending
  }
`
