const express = require('express');
const router = express.Router();

const photosController = require('../controllers/photos');
const validator = require('../apiSchemas/request/schemaValidator');

router.get('/mars-rover-latest-photo-search', photosController.getLatestMarsPhotoPage);
router.post('/mars-rover-latest-photo', validator.validateRequestSchema('marsRoverPhotosSchema'), photosController.postUserToGetLatestMarsPhoto);

module.exports = router;
