import axios from 'axios'
import { Movie } from '../types/movie'
import { OMDB_API_KEY } from '../utils/config'
import { cacheMovie, getMovieFromCache } from '../utils/cache'
import { NotFoundError } from '../errors/not-found-error'
import { BaseError } from '../errors/base-error'

export const getMovieByName = async (
  movieName: string,
): Promise<Movie | null> => {
  const cachedMovie = await getMovieFromCache(movieName)
  if (cachedMovie) {
    return cachedMovie as Movie
  }
  const response = await axios.get(
    `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movieName}`,
  )
  const movie = response.data as Movie
  if (!movie.imdbID) {
    throw new NotFoundError({ message: `${movieName} not found in OMDB API` })
  }
  console.log(movie)
  cacheMovie(movieName, movie)
  return movie
}

export const getMovieByImdbId = async (
  imdbId: string,
): Promise<Movie | null> => {
  try {
    const cachedMovie = await getMovieFromCache(imdbId)
    if (cachedMovie) {
      console.log('Movie found in cache')
      return cachedMovie as Movie
    }
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbId}`,
    )
    const movie = response.data as Movie
    cacheMovie(imdbId, movie)
    return movie
  } catch (error) {
    console.error(error)
    return null
  }
}
