export const typeDefs = `
  type Ending {
    movieId: String
    movieImage: String
    plot: String
    aiName: String
    ending: String
    id: String
    createdAt: String
    updatedAt: String  
  }

  type Rating {
    Source: String
    Value: String
  }

  type Movie {
    title: String,
    year: String,
    rated: String,
    released: String,
    runtime: String,
    genre: String,
    director: String,
    writer: String,
    actors: String,
    plot: String,
    language: String,
    country: String,
    awards: String,
    poster: String,
    ratings: [Rating],
    metascore: String,
    imdbRating: String,
    imdbVotes: String,
    imdbId: String,
    type: String,
    dvd: String,
    boxOffice: String,
    production: String,
    website: String,
    response: String
  }
    
  type Query {
    endings(imdbId: String): [Ending]
    movieByName(name: String): Movie
    movieById(imdbId: String): Movie
  }

  type Mutation {
    createEnding(movieId: String): Ending
  }
`
