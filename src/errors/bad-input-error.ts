import { ValidationError } from 'express-validator'
import { BaseErrorType, ErrorCode, ErrorName } from '../types/error'
import { BaseError } from './base-error'

export class BadInputError extends BaseError {
  public errors: ValidationError[]

  constructor({
    message,
    code = ErrorCode.BAD_REQUEST,
    name = ErrorName.BAD_REQUEST,
    errors = [],
  }: BaseErrorType) {
    super({ message, code, name })
    this.errors = errors
  }
}
