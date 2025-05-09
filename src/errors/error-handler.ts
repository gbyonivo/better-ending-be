import { NextFunction, Request, Response } from 'express'
import { BaseErrorType } from '../types/error'
import { logError } from './logger'

export async function errorHandler(
  err: BaseErrorType,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logError(err, req, res)
  res.status(err.code || 500)
  res.json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    errors: err.errors || [],
  })
}
