const Joi = require('joi');

const marsRoverPhotos = Joi.object({
  userId: Joi.alternatives([Joi.string(), Joi.number()]).required(),
  userName: Joi.string().required(),
  api_key: Joi.string().alphanum().required()
});

module.exports = marsRoverPhotos;
