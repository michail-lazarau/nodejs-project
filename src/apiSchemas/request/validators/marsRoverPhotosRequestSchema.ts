import { object, alternatives, string, number } from 'joi';

const marsRoverPhotosSchema = object({
  userId: alternatives([string(), number()]).required(),
  userName: string().required(),
  api_key: string().alphanum().required(),
});

export default marsRoverPhotosSchema;
