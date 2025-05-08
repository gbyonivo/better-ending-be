import { format } from 'date-fns'

export const createWeatherCacheKey = (city: string) => {
  const datePart = format(new Date(), 'yyyy-MM-dd')
  return `weather-${city}-${datePart}`
}
