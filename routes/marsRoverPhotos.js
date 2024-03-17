const express = require('express')
const router = express.Router()
const photosController = require('../controllers/photos')

router.post('/mars-rover-photo', photosController.postUserToGetLatestMarsPhoto)

module.exports = router
