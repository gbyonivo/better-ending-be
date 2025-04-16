import { Request, Response } from 'express'
import { BaseErrorType } from '../types/error'

export function logError(err: BaseErrorType, req: Request, res: Response) {
  console.log('ersssss', Error)
}
