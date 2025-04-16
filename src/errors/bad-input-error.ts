import { BaseErrorType, ErrorCode, ErrorName } from '../types/error'
import { BaseError } from './base-error'

export class BadInputError extends BaseError {
  constructor({
    message,
    code = ErrorCode.BAD_REQUEST,
    name = ErrorName.BAD_REQUEST,
  }: BaseErrorType) {
    super({ message, code, name })
  }
}
