import { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
// eslint-disable-next-line import/no-unresolved
import { Query } from 'express-serve-static-core'; // todo: to resolve

type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;

export const validateRequest = (schema: ObjectSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    removeEmptyQueryParams(req.query);
    const dataType = Object.keys(req.body).length === 0 ? 'query' : 'body';
    const { error } = schema.validate(req[dataType]);

    if (error) {
      return next(error);
    }

    next();
  };
};

function removeEmptyQueryParams(query: Query) {
  Object.keys(query).forEach((key) => {
    if (query[key] === '') {
      delete query[key];
    }
  });
}
