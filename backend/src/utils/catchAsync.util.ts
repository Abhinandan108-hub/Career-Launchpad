import { Request, Response, NextFunction } from 'express';

// Wraps async route handlers to avoid try/catch boilerplate
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const catchAsync = (fn: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
};