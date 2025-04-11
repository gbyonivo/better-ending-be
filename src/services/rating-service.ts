import NodeCache from 'node-cache'
import { EndingModel } from '../database'

const ratingCache = new NodeCache()

export const rateEnding = async ({
  endingId,
  rating,
}: {
  endingId: string
  rating: number
}) => {
  try {
  } catch (error) {}
}

export const getRatingsByUser = async (userId: string) => {
  try {
    const cacheKey = userId
    const cachedRatings = ratingCache.get(cacheKey)
    if (cachedRatings) {
      return cachedRatings
    }
  } catch (error) {}
}
