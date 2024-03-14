const express = require('express')
const router = express.Router()
const meteorsController = require('../controllers/asteroids')

router.get('/meteors', meteorsController.getMeteors)

module.exports = router
