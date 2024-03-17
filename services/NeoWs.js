const axios = require('axios')
const urlBuilder = require('../urlBuilder')

const PATH_NeoWs = process.env.PATH_NeoWs

exports.getMeteors = async (urlSearchParams) => {
  const url = urlBuilder.make(PATH_NeoWs, urlSearchParams)
  return await axios.get(url);
}
