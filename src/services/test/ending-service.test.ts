import * as endingService from '../ending-service'
import * as ai from '../../utils/ai'

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
})
