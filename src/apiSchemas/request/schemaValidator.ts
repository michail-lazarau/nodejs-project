import { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
// eslint-disable-next-line import/no-unresolved
import { Query } from 'express-serve-static-core'; // todo: to resolve
import schemas from './validators/index';

type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;

const validateRequestSchema = (schema: string): RequestHandler => {
  const selectedSchema: ObjectSchema = schemas[schema];

  if (!selectedSchema) {
    throw new Error(`${schema} does not exist`);
  }

  return (req: Request, res: Response, next: NextFunction) => {
    removeEmptyQueryParams(req.query);
    const dataType = Object.keys(req.body).length === 0 ? 'query' : 'body';
    const { error } = selectedSchema.validate(req[dataType]);

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

export default validateRequestSchema;
