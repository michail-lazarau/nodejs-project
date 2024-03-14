const axios = require('axios')
const urlBuilder = require('../urlBuilder')

const env = process.env

exports.getAsteroids = async (queryParams) => {
  const url = urlBuilder.make(env.PATH_NeoWs, queryParams)
  return await axios.get(url);
}
