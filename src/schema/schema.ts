export const typeDefs = `
  type Ending {
    movieId: String
    movieImage: String
    content: String
    aiName: String
  }

  type Rating {
    Source: String
    Value: String
  }

  type Movie {
    Title: String,
    Year: String,
    Rated: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Writer: String,
    Actors: String,
    Plot: String,
    Language: String,
    Country: String,
    Awards: String,
    Poster: String,
    Ratings: [Rating],
    Metascore: String,
    imdbRating: String,
    imdbVotes: String,
    imdbID: String,
    Type: String,
    DVD: String,
    BoxOffice: String,
    Production: String,
    Website: String,
    Response: String
  }
    
  type Query {
    endings: [Ending]
    movieByName(name: String): Movie
    movieById(imdbId: String): Movie
  }

  type Mutation {
    createEnding(movieId: String): Ending
  }
`
