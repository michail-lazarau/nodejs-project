const schemas = require('./validators');
const httpMethods = require('../../utilities/httpMethods');

exports.validateRequestSchema = (schema) => {
  const selectedSchema = schemas[schema];
  if (!selectedSchema) {
    throw new Error(`${schema} does not exist`);
  }

  return (req, res, next) => {
    // temporal solution to circumvent the validator
    if (req.query.is_counted === '') {
      delete req.query.is_counted;
    }

    if (req.query.is_potentially_hazardous_asteroid === '') {
      delete req.query.is_counted;
    }

    const requestDataType = httpMethods[req.method].requestDataType;
    const { error } = selectedSchema.validate(req[requestDataType]);

    if (error) {
      return next(error);
    }

    next();
  };
};
