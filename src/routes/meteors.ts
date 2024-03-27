import express from 'express';
import { getMeteors, getStartPage } from '../controllers/meteors';
import { neoWsSchema } from '../apiSchemas/request/schemas';
import { validateRequest } from '../apiSchemas/request/schemaValidator';

const router = express.Router();

router.get('/', getStartPage);
router.get('/meteors', validateRequest(neoWsSchema), getMeteors);

export default router;
