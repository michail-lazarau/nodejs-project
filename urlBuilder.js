const env = process.env

exports.make = (path, queryParams) => {
  const url = new URL(`${env.PROTOCOL}://${env.HOSTNAME}${path}`)
  url.search = queryParams
  return url.toString()
}
