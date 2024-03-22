import express from 'express';
import { meteorsController } from '../controllers/meteors.ts';
import { validator } from '../apiSchemas/request/schemaValidator.ts';

const router = express.Router();

router.get('/', meteorsController.getStartPage);
router.get('/meteors', validator.validateRequestSchema('neoWsSchema'), meteorsController.getMeteors);

export default router;
