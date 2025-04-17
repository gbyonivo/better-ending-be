import * as endingService from '../ending-service'
import * as ai from '../../utils/ai'
import * as movieService from '../movie-service'
import * as cache from '../../utils/cache'

describe('ending service', () => {
  test('getEndingFromOpenAI: returns the first content in response', async () => {
    // @ts-ignore
    ai.OPEN_AI.chat.completions.create = jest.fn(() =>
      Promise.resolve({
        choices: [{ message: { content: 'test' } }],
      }),
    )
    const result = await endingService.getEndingFromOpenAI('test')
    expect(result).toBe('test')
  })

  test('getEndingFromOpenAI: should return null if ai call fails', async () => {
    // @ts-ignore
    ai.OPEN_AI.chat.completions.create = jest.fn(() => Promise.reject())
    const result = await endingService.getEndingFromOpenAI('test')
    expect(result).toBe(null)
  })

  test('getEndingFromDeepseekAI: returns the first content in response', async () => {
    // @ts-ignore
    ai.DEEPSEEK_AI.chat.completions.create = jest.fn(() =>
      Promise.resolve({
        choices: [{ message: { content: 'test' } }],
      }),
    )
    const result = await endingService.getEndingFromDeepseekAI('test')
    expect(result).toBe('test')
  })

  test('getEndingFromDeepseekAI: should return null if ai call fails', async () => {
    // @ts-ignore
    ai.DEEPSEEK_AI.chat.completions.create = jest.fn(() => Promise.reject())
    const result = await endingService.getEndingFromDeepseekAI('test')
    expect(result).toBe(null)
  })
})

describe('getEndingsFromAI', () => {
  test('should null when movie is not found', async () => {
    // @ts-ignore
    movieService.getMovieByImdbId = jest.fn(() => Promise.resolve(null))
    const result = await endingService.getEndingsFromAI('test')
    expect(result).toMatchObject({ deepseek: null, openai: null })
  })

  test('getEndingFromDeepseekAI: should return the endings from cache', async () => {
    // @ts-ignore
    movieService.getMovieByImdbId = jest.fn(() => Promise.resolve({}))
    // @ts-ignore
    cache.getEndingFromCache = jest.fn(() => Promise.resolve('cachedEnding'))
    const result = await endingService.getEndingsFromAI('test')
    expect(result).toBe('cachedEnding')
  })

  test('getEndingFromDeepseekAI: should return the endings from cache', async () => {
    // @ts-ignore
    movieService.getMovieByImdbId = jest.fn(() =>
      Promise.resolve({ imdbID: 'test' }),
    )
    ai.DEEPSEEK_AI.chat.completions.create = jest.fn(
      () =>
        Promise.resolve({
          choices: [{ message: { content: 'test' } }],
        }) as any,
    )
    ai.OPEN_AI.chat.completions.create = jest.fn(() =>
      Promise.resolve({
        choices: [{ message: { content: 'test' } }],
      }),
    ) as any
    // @ts-ignore
    cache.getEndingFromCache = jest.fn(() => Promise.resolve(null))
    // @ts-ignore
    cache.cacheEnding = jest.fn(() => Promise.resolve())
    const result = await endingService.getEndingsFromAI('test')

    expect(cache.cacheEnding).toHaveBeenCalled()
    expect(result).toMatchObject({
      deepseek: 'test',
      openai: 'test',
    })
  })
  test('getEndingsFromAI: should return the endings from cache', async () => {
    // @ts-ignore
    movieService.getMovieByImdbId = jest.fn(() =>
      Promise.reject({ imdbID: 'test' }),
    )
    const result = await endingService.getEndingsFromAI('test')
    expect(result).toMatchObject({ deepseek: null, openai: null })
  })

  test('getEndings: should throw an error if the movie is not found', async () => {
    // @ts-ignore
    movieService.getMovieByImdbId = jest.fn(() => Promise.resolve(null))
    await expect(endingService.getEndings('test')).rejects.toThrow()
  })
})
