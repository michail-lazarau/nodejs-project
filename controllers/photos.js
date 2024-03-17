const neoWs = require('../services/NeoWs')

exports.postPhoto = async (req, res, next) => {
  const userId = req.body.userId
  const userName = req.body.userName
  const apiKey = req.body.apiKey

  await

  res.status(201).json({
    userId: userId,
    userName: userName,
    apiKey: apiKey
  })
}

const makeQueryParams = (query) => {

  const SOL = "sol"
  const CAMERA = "camera"
  const PAGE = "page"
  const API_KEY = "api_key"

  const params = new URLSearchParams({

  })

  query.hasOwnProperty(START_DATE) && params.append(START_DATE, query[START_DATE])
  query.hasOwnProperty(END_DATE) && params.append(END_DATE, query[END_DATE])
  query.hasOwnProperty(API_KEY) && params.append(API_KEY, query[API_KEY])

  return params
}
