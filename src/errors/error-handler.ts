import { NextFunction, Request, Response } from 'express'
import { BaseErrorType } from '../types/error'

export function errorHandler(
  err: BaseErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(err.statusCode || 500)
  res.render('error ---', { error: err })
}
