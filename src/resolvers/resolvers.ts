import axios from 'axios'
import { getEndings } from '../services/ending-service'
import { getMovieByImdbId, getMovieByName } from '../services/movie-service'
import { GOOGLE_CLIENT_ID } from '../utils/config'

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
    loginGoogle: async (
      _: any,
      { token: accessToken }: { token: string },
      { req, res }: { req: any; res: any },
    ) => {
      console.log('accessToken', accessToken)
      try {
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}&client_id=${GOOGLE_CLIENT_ID}`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
              accept: 'application/json',
            },
          },
        )
        console.log(response)
        return response
      } catch (e) {
        console.log('error', e)
        return null
      }
    },
  },
}
