import { format } from 'date-fns'

export const createWeatherCacheKey = (city: string) => {
  const datePart = format(new Date(), 'yyyy-MM-dd')
  return `weather-${city.toLowerCase()}-${datePart}`
}

export const createDailyWeatherCacheKey = (lon: string, lat: string) => {
  const datePart = format(new Date(), 'yyyy-MM-dd')
  return `weather-daily-${lon}-${lat}-${datePart}`
}
