import { getEndings } from '../ending-service'
import * as movieService from '../movie-service'
import * as cache from '../../utils/cache'
import { mockedMovie } from './mock-data'
import * as connection from '../../database/connection'

jest.mock('../movie-service')
jest.mock('../../utils/cache')
jest.mock('../../database/connection')

const mockedGetMovieByImdbId = (
  movieService as jest.Mocked<typeof movieService>
).getMovieByImdbId

const mockedCacheEnding = (cache as jest.Mocked<typeof cache>).cacheEnding

const mockedGetEndingFromCache = (cache as jest.Mocked<typeof cache>)
  .getEndingFromCache

describe('ending service', () => {
  test('adds 1 + 2 to equal 3', () => {
    mockedGetMovieByImdbId.mockImplementation(() =>
      Promise.resolve(mockedMovie),
    )
    mockedCacheEnding.mockImplementation(() => Promise.resolve())
    mockedGetEndingFromCache.mockImplementation(() =>
      Promise.resolve(mockedMovie),
    )
    expect(1 + 2).toBe(3)
  })
})
