import { Response } from 'express';

export const errorHandler = (err: any, res: Response) => {
  const errorCode = err?.response?.status || 500;
  res.status(errorCode).json({
    success: false,
    message: err?.message || 'lol, take care, drink more water',
  });
};

export const notFoundHandler = (res: Response) => res.status(404).render('not-found');
