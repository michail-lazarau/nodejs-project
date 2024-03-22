const express = require('express')
const router = express.Router()
const meteorsController = require('../controllers/meteors')
const validator = require("../apiSchemas/request/schemaValidator");

router.get('/', meteorsController.getStartPage)
router.get('/meteors', meteorsController.getMeteors)
// validator.validateRequestSchema('neoWsSchema')
module.exports = router
