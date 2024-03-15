const axios = require('axios')
const urlBuilder = require('../urlBuilder')

const PATH_NeoWs = process.env.PATH_NeoWs

exports.getMeteors = async (queryParams) => {
  const url = urlBuilder.make(PATH_NeoWs, queryParams)
  return await axios.get(url);
}
