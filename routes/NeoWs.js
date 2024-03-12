const express = require('express')
const router = express.Router()
const neoWsController = require('../controllers/NeoWs')

router.get('/meteors', neoWsController.getAsteroids)

module.exports = router
