import { getMovieByImdbId } from './movie-service'
import {
  DEEPSEEK_AI,
  DEEPSEEK_MODEL,
  OPEN_AI,
  OPEN_AI_MODEL,
} from '../utils/ai'
import { Ending } from '../types/ending'
import { AI_NAMES } from '../types/ai'
import { cacheEnding, getEndingFromCache } from '../utils/cache'
import { NotFoundError } from '../errors/not-found-error'

interface EndingsFromAI {
  deepseek: string | null
  openai: string | null
}

export const getEndingFromOpenAI = async (
  prompt: string,
): Promise<string | null> => {
  try {
    const response = await OPEN_AI.chat.completions.create({
      model: OPEN_AI_MODEL,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    return response.choices[0].message.content
  } catch (error) {
    return null
  }
}

export const getEndingFromDeepseekAI = async (
  prompt: string,
): Promise<string | null> => {
  try {
    const response = await DEEPSEEK_AI.chat.completions.create({
      model: DEEPSEEK_MODEL,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    return response.choices[0].message.content
  } catch (error) {
    return null
  }
}

export const getEndingsFromAI = async (
  imdbId: string,
): Promise<EndingsFromAI> => {
  try {
    const movie = await getMovieByImdbId(imdbId)
    if (!movie) {
      return { deepseek: null, openai: null }
    }
    const cachedEnding = await getEndingFromCache(imdbId)
    if (cachedEnding) {
      console.log('cachedEnding', cachedEnding)
      return cachedEnding as EndingsFromAI
    }

    if (!movie.plot || !movie.title) {
      throw new NotFoundError({
        message: `Movie not found - ${imdbId} - not title or not plot`,
      })
    }

    const openaiPrompt = `The plot of the movie ${movie.title} is ${movie.plot}. Please give me a different happy ending for the movie.`
    const deepseekPrompt = `The plot of the movie ${movie.title} is ${movie.plot}. Please give me a different mysterious ending for the movie.`

    const [openai, deepseek] = await Promise.all([
      getEndingFromOpenAI(openaiPrompt),
      getEndingFromDeepseekAI(deepseekPrompt),
    ])

    console.log('openai', openai)
    console.log('deepseek', deepseek)

    cacheEnding({ imdbId, ending: { deepseek, openai } })
    console.log('cachedEnding cached', cachedEnding)
    return { deepseek, openai }
  } catch (error) {
    throw error
  }
}

export const getEndings = async (imdbId: string): Promise<Ending[]> => {
  try {
    const movie = await getMovieByImdbId(imdbId)
    if (!movie) {
      throw new NotFoundError({ message: 'Movie not found' })
    }

    const commonProps = {
      movieId: movie.imdbId,
      movieImage: movie.poster,
      plot: movie.plot,
    }

    const { openai, deepseek } = await getEndingsFromAI(imdbId)
    const endings = []
    if (openai) {
      endings.push({
        ...commonProps,
        ending: openai,
        aiName: AI_NAMES.OPEN_AI,
      } as Ending)
    }
    if (deepseek) {
      endings.push({
        ...commonProps,
        ending: deepseek,
        aiName: AI_NAMES.DEEPSEEK,
      } as Ending)
    }
    return endings
  } catch (error) {
    throw error
  }
}
