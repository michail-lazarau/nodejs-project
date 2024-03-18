const schemas = require('./validators')
const httpMethods = require('../../utilities/httpMethods')

exports.validateRequestSchema = (schema) => {
  const selectedSchema = schemas[schema];
  if (!selectedSchema) {
    throw new Error(`${schema} does not exist`)
  }

  return (req, res, next) => {
    const requestDataType = httpMethods[req.method].requestDataType
    const { error, value } = selectedSchema.validate(req[requestDataType]);

    if (error) {
      return next(error)
    }

    next();
  };
};

