import express from 'express';
import { getMeteors, getStartPage } from '../controllers/meteors';
import validateRequestSchema from '../apiSchemas/request/schemaValidator';

const router = express.Router();

router.get('/', getStartPage);
router.get('/meteors', validateRequestSchema('neoWsSchema'), getMeteors);

export default router;
