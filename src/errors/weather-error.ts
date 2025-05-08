import { BaseErrorType } from '../types/error'

export class WeatherError extends Error {
  public code?: number

  constructor({ name, code, message }: BaseErrorType) {
    super(message)
    this.name = `WeatherError: ${name}`
    this.code = code
  }
}
