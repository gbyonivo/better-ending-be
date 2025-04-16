import { BaseErrorType, ErrorCode, ErrorName } from '../types/error'
import { BaseError } from './base-error'

export class NotFoundError extends BaseError {
  constructor({
    name = ErrorName.NOT_FOUND,
    code = ErrorCode.NOT_FOUND,
    message,
  }: BaseErrorType) {
    super({ message, code, name })
  }
}
