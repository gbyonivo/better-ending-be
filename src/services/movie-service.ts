import axios from 'axios'
import { Movie } from '../types/movie'
import NodeCache from 'node-cache'
import { OMDB_API_KEY } from '../utils/config'

const movieCache = new NodeCache()

export const getMovieByName = async (
  movieName: string,
): Promise<Movie | null> => {
  try {
    const cachedMovie = movieCache.get(movieName)
    if (cachedMovie) {
      return cachedMovie as Movie
    }
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movieName}`,
    )
    const movie = response.data as Movie
    movieCache.mset([
      { key: movieName, val: movie, ttl: 10000 },
      { key: movie.Title, val: movie, ttl: 10000 },
      { key: movie.imdbID, val: movie, ttl: 10000 },
    ])
    return movie
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getMovieByImdbId = async (
  imdbId: string,
): Promise<Movie | null> => {
  try {
    const cachedMovie = movieCache.get(imdbId)
    if (cachedMovie) {
      return cachedMovie as Movie
    }
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbId}`,
    )
    const movie = response.data as Movie
    movieCache.mset([
      { key: movie.Title, val: movie, ttl: 10000 },
      { key: movie.imdbID, val: movie, ttl: 10000 },
    ])
    return movie
  } catch (error) {
    console.error(error)
    return null
  }
}
