import { NextFunction, Request, Response } from 'express'
import { BaseErrorType } from '../types/error'
import { logError } from './logger'

export function errorHandler(
  err: BaseErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logError(err, req, res)
  res.status(err.code || 500)
  res.send({ error: err })
}
