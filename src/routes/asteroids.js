const express = require('express')
const router = express.Router()
const meteorsController = require('../controllers/asteroids')
const validator = require("../apiSchemas/request/schemaValidator");


router.get('/meteors', validator.validateRequestSchema('neoWsSchema'), meteorsController.getMeteors)

module.exports = router
