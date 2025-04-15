import { BaseErrorType } from '../types/error'
import { BaseError } from './base-error'

export class NotFoundError extends BaseError {
  constructor({
    name = 'NotFoundError',
    statusCode = 404,
    message,
  }: BaseErrorType) {
    super({ message, statusCode, name })
  }
}
