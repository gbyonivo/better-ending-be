import { getMovieByImdbId, getMovieByName } from '../services/movie-service'

export const resolvers = {
  Query: {
    endings: () => 'Hello, world!',
    movieByName: (_: any, { name }: any) => getMovieByName(name),
    movieById: (_: any, { imdbId }: any) => getMovieByImdbId(imdbId),
  },
  Mutation: {
    createEnding: () => 'Hello, world!',
  },
}
