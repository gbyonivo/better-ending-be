import { ValidationError } from 'express-validator'

export enum ErrorCode {
  INTERNAL_SERVER_ERROR = 500,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  CONFLICT = 409,
}

export enum ErrorName {
  INTERNAL_SERVER_ERROR = 'InternalServerError',
  NOT_FOUND = 'NotFound',
  BAD_REQUEST = 'BadRequest',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  CONFLICT = 'Conflict',
  WEATHER_ERROR = 'WeatherError',
}

export interface BaseErrorType {
  message: string
  code?: ErrorCode
  name?: ErrorName
  errors?: ValidationError[]
}
