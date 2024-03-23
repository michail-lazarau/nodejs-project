import express from 'express';
import { getLatestMarsPhotoPage, postUserToGetLatestMarsPhoto } from '../controllers/photos';
import validateRequestSchema from '../apiSchemas/request/schemaValidator';
const router = express.Router();

router.get('/mars-rover-latest-photo-search', getLatestMarsPhotoPage);
router.post('/mars-rover-latest-photo', validateRequestSchema('marsRoverPhotosSchema'), postUserToGetLatestMarsPhoto);

export default router;
