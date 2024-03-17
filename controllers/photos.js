const marsRoverPhotosService = require('../services/marsRoverPhotos')

exports.postUserToGetLatestMarsPhoto = async (req, res, next) => {
  const apiKey = req.body.api_key
  try {
  const latestMarsPhoto = await marsRoverPhotosService.getMostRecentPhoto(makeQueryParams(apiKey))
  res.status(201).redirect(latestMarsPhoto)
  } catch(err) {
  console.log(err)
  res.status(err.response.status || 500).json({message: 'postUserToGetLatestMarsPhoto request has failed!', error: err.message})
}
  // res.status(201).send(`<img src='${latestMarsPhoto}'>`)
  // res.status(201).render('')
}

const makeQueryParams = (apiKey) => {
  const urlSearchParams = new URLSearchParams({})
  urlSearchParams.append("api_key", apiKey)
  return urlSearchParams
}
