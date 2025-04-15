import { getRatingFromCache } from '../utils/cache'

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
    const cachedRatings = await getRatingFromCache(cacheKey)
    if (cachedRatings) {
      return cachedRatings
    }
  } catch (error) {}
}
