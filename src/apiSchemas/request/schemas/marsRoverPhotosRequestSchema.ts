import joi from 'joi';

const marsRoverPhotos = joi.object({
  userId: joi.alternatives([joi.string(), joi.number()]).required(),
  userName: joi.string().required(),
  api_key: joi.string().alphanum().required(),
});

export { marsRoverPhotos };
