import { BaseErrorType } from '../types/error'

export class BaseError extends Error {
  public statusCode?: number

  constructor({ message, statusCode = 500, name = '' }: BaseErrorType) {
    super(message)
    this.name = name
    this.statusCode = statusCode
  }
}
