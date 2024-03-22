const { PROTOCOL, HOSTNAME } = process.env;

export const buildUrl = (path: string, urlSearchParams: URLSearchParams) => {
  const url = new URL(`${PROTOCOL}://${HOSTNAME}${path}`);
  url.search = urlSearchParams.toString();
  return url.toString();
};
