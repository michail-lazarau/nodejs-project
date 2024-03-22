import marsRoverPhotosSchema from './neoWsRequestSchema.ts';
import neoWsSchema from './marsRoverPhotosRequestSchema.ts';
import { ObjectSchema } from 'joi';

interface Schemas {
  [key: string]: ObjectSchema;
}

// Create an object containing all schemas
const schemas: Schemas = {
  marsRoverPhotosSchema,
  neoWsSchema,
};

export default schemas;

// export default {
//   marsRoverPhotosSchema,
//   neoWsSchema,
// };
