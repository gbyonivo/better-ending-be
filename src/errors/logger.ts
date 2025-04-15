import { NextFunction, Request, Response } from 'express'

export function logError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('ersssss', Error)
  next(err)
}
