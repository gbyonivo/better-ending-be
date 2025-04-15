import { BaseErrorType } from '../types/error'
import { BaseError } from './base-error'

export class BadInputError extends BaseError {
  constructor({
    message,
    statusCode = 400,
    name = 'BadInputError',
  }: BaseErrorType) {
    super({ message, statusCode, name })
  }
}
