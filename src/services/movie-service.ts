import axios from 'axios'
import { OmdbMovie, SavedMovie, convertMovieToSavedMovie } from '../types/movie'
import { OMDB_API_KEY } from '../utils/config'
import { cacheMovie, getMovieFromCache } from '../utils/cache'
import { NotFoundError } from '../errors/not-found-error'
import { archiveMovieQueue } from '../workers/archive-movie-worker'
import { Job } from '../types/job'

export const getMovieByName = async (
  movieName: string,
): Promise<SavedMovie | null> => {
  const cachedMovie = await getMovieFromCache(movieName)
  if (cachedMovie) {
    return cachedMovie
  }
  const response = await axios.get(
    `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movieName}`,
  )
  const movie = convertMovieToSavedMovie(response.data as OmdbMovie)
  if (!movie.imdbID) {
    throw new NotFoundError({ message: `${movieName} not found in OMDB API` })
  }
  cacheMovie(movieName, movie)
  archiveMovieQueue.add(Job.ArchiveMovie, { movie })
  return movie
}

export const getMovieByImdbId = async (
  imdbId: string,
): Promise<SavedMovie | null> => {
  try {
    const cachedMovie = await getMovieFromCache(imdbId)
    if (cachedMovie) {
      console.log('Movie found in cache')
      return cachedMovie
    }
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbId}`,
    )
    const movie = response.data as OmdbMovie
    cacheMovie(imdbId, convertMovieToSavedMovie(movie))
    return convertMovieToSavedMovie(movie)
  } catch (error) {
    return null
  }
}
