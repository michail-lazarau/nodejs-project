const env = process.env

exports.make = (path, urlSearchParams) => {
  const url = new URL(`${env.PROTOCOL}://${env.HOSTNAME}${path}`)
  url.search = urlSearchParams
  return url.toString()
}
