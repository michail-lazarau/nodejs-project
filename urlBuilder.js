const env = process.env
const url = require('url')

exports.make = (path, queryParams) => {

  const urlObject = {
    protocol: env.PROTOCOL,
    hostname: env.HOSTNAME,
    pathname: path,
    query: { ...queryParams, api_key: env.NASA_API_KEY }
  }

  return url.format(urlObject)
}
