const express = require('express');
const router = express.Router();
const meteorsController = require('../controllers/meteors');
const validator = require('../apiSchemas/request/schemaValidator');

router.get('/', meteorsController.getStartPage);
router.get('/meteors', validator.validateRequestSchema('neoWsSchema'), meteorsController.getMeteors);
module.exports = router;
