import get from 'axios';
import { buildUrl } from '../utilities/urlBuilder.ts';
import { URLSearchParams } from 'node:url';

const PATH_NeoWs = process.env.PATH_NeoWs ?? ''; // TODO: amend

const getMeteorsPhoto = async (searchParams: URLSearchParams) => {
  const url = buildUrl(PATH_NeoWs, searchParams);
  return get(url);
};

export default getMeteorsPhoto;
