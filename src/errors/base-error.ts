import { GraphQLError } from 'graphql'
import { BaseErrorType, ErrorCode, ErrorName } from '../types/error'

export class BaseError extends GraphQLError {
  public code?: number

  constructor({
    message,
    code = ErrorCode.INTERNAL_SERVER_ERROR,
    name = ErrorName.INTERNAL_SERVER_ERROR,
  }: BaseErrorType) {
    super(message)
    this.name = name
    this.extensions.code = code
    this.code = code
  }
}
