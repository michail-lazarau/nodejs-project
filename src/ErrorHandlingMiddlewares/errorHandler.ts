import { Response } from 'express';
import path from 'path';

// todo: to resolve
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (err: any, res: Response) => {
  const errorCode = err?.response?.status || 500;
  res.status(errorCode).json({
    success: false,
    message: err?.message || 'lol, take care, drink more water',
  });
};

// todo: to resolve
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const notFoundHandler = async (err: any, res: Response) =>
  res.status(404).render(path.join(__dirname, '..', 'views', 'notFound/not-found.html'));
