import { redis } from '../database/db'
import { OmdbMovie, SavedMovie } from '../types/movie'

export const ENDING_CACHE_KEY = 'ending'
export const MOVIE_CACHE_KEY = 'movie'
export const RATING_CACHE_KEY = 'rating'
export const cacheEnding = async ({
  imdbId,
  ending,
}: {
  imdbId: string
  ending: { deepseek: string | null; openai: string | null }
}) => {
  await redis.set(`${ENDING_CACHE_KEY}-${imdbId}`, JSON.stringify(ending))
}

export const getEndingFromCache = async (imdbId: string) => {
  const ending = await redis.get(`${ENDING_CACHE_KEY}-${imdbId}`)
  if (!ending) {
    return null
  }
  return JSON.parse(ending)
}

export const deleteEndingFromCache = async (imdbId: string) => {
  await redis.del(`${ENDING_CACHE_KEY}-${imdbId}`)
}

export const cacheMovie = async (imdbId: string, movie: SavedMovie) => {
  await redis.set(`${MOVIE_CACHE_KEY}-${imdbId}`, JSON.stringify(movie))
}

export const getMovieFromCache = async (
  imdbId: string,
): Promise<SavedMovie | null> => {
  const movie = await redis.get(`${MOVIE_CACHE_KEY}-${imdbId}`)
  if (!movie) {
    return null
  }
  return JSON.parse(movie)
}

export const cacheRating = async (userId: string, rating: number) => {
  await redis.set(`${RATING_CACHE_KEY}-${userId}`, JSON.stringify(rating))
}

export const getRatingFromCache = async (userId: string) => {
  const cacheKey = `${RATING_CACHE_KEY}-${userId}`
  const rating = await redis.get(cacheKey)
  if (!rating) {
    return null
  }
  return JSON.parse(rating)
}
