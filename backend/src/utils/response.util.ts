import { Response } from 'express';

export const sendSuccess = (
  res: Response,
  data: unknown,
  statusCode = 200,
  message = 'Success'
): void => {
  res.status(statusCode).json({ success: true, message, data });
};

export const sendError = (res: Response, message: string, statusCode = 500): void => {
  res.status(statusCode).json({ success: false, message });
};

export const paginate = (page: number, limit: number) => ({
  skip: (page - 1) * limit,
  limit,
});

export const paginatedResponse = <T>(
  res: Response,
  data: T[],
  total: number,
  page: number,
  limit: number
): void => {
  res.status(200).json({
    success: true,
    total,
    page,
    pages: Math.ceil(total / limit),
    count: data.length,
    data,
  });
};