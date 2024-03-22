const joi = require('joi');

const neoWs = joi.object({
  start_date: joi.date().less('now').iso(),
  end_date: joi.date().less('now').iso(),
  is_potentially_hazardous_asteroid: joi.boolean(),
  api_key: joi.string().alphanum().required(),
  is_counted: joi.boolean(),
});

module.exports = neoWs;
