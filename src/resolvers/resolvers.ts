import { getEndings } from '../services/ending-service'
import { getMovieByImdbId, getMovieByName } from '../services/movie-service'

export const resolvers = {
  Query: {
    endings: (_: any, { imdbId }: any) => {
      console.log('imdbId', imdbId)
      return getEndings(imdbId)
    },
    movieByName: (_: any, { name }: any) => getMovieByName(name),
    movieById: (_: any, { imdbId }: any) => getMovieByImdbId(imdbId),
  },
  Mutation: {
    createEnding: () => 'Hello, world!',
  },
}
