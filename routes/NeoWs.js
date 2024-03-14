const express = require('express')
const router = express.Router()
const neoWsController = require('../NasaService/NeoWs')

router.get('/meteors', neoWsController.getAsteroids)

module.exports = router
