const { PROTOCOL, HOSTNAME } = process.env;

exports.make = (path, urlSearchParams) => {
  const url = new URL(`${PROTOCOL}://${HOSTNAME}${path}`);
  url.search = urlSearchParams;
  return url.toString();
};
