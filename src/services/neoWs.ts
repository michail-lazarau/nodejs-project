import get from 'axios';
import { buildUrl } from '../utilities/urlBuilder';
import { URLSearchParams } from 'node:url';

const PATH_NeoWs = process.env.PATH_NeoWs ?? ''; // TODO: amend

export const getMeteors = async (searchParams: URLSearchParams) => {
  const url = buildUrl(PATH_NeoWs, searchParams);
  return get(url);
};
