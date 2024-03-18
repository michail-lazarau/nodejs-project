const marsRoverPhotosService = require('../services/MarsRoverPhotos')

exports.postUserToGetLatestMarsPhoto = async (req, res, next) => {
  const apiKey = req.body.api_key
  try {
    const latestMarsPhoto = await marsRoverPhotosService.getMostRecentPhoto(makeQueryParams(apiKey))
    res.status(201).redirect(latestMarsPhoto)
    // res.status(201).send(`<img src='${latestMarsPhoto}'>`)
    // res.status(201).render('')
  } catch (err) {
    next(err)
  }
}

const makeQueryParams = (apiKey) => {
  const urlSearchParams = new URLSearchParams({})
  urlSearchParams.append("api_key", apiKey)
  return urlSearchParams
}
