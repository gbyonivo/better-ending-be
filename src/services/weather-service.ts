import axios, { AxiosError } from 'axios'
import { OPENWEATHER_API_KEY } from '../utils/config'
import { WeatherError } from '../errors/weather-error'
import { ErrorName } from '../types/error'
import NodeCache from 'node-cache'
import { createWeatherCacheKey } from '../utils/weather'

const nodeCache = new NodeCache()

export const getWeather = async (city: string) => {
  const cacheKey = createWeatherCacheKey(city)
  const cachedWeather = nodeCache.get(cacheKey)
  if (cachedWeather) {
    console.log('cachedWeather', cachedWeather)
    return cachedWeather
  }
  console.log(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`,
  )
  try {
    // validate input
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`,
      {
        timeout: 4000,
      },
    )
    // validate response.data
    nodeCache.set(cacheKey, response.data, 60 * 60 * 24)
    return response.data
  } catch (e: unknown) {
    throw new WeatherError({
      message: (e as AxiosError)?.message || 'Failed to get weather',
      name: ErrorName.WEATHER_ERROR,
      code: (e as AxiosError)?.status,
    })
  }
}
