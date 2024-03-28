import express from 'express';
import { getLatestMarsPhotoPage, postUserToGetLatestMarsPhoto } from '../controllers/photos';
import { marsRoverPhotos } from '../apiSchemas/request/schemas';
import { validateRequest } from '../apiSchemas/request/schemaValidator';
const router = express.Router();

router.get('/mars-rover-latest-photo-search', getLatestMarsPhotoPage);
router.post('/mars-rover-latest-photo', validateRequest(marsRoverPhotos), postUserToGetLatestMarsPhoto);

export default router;
