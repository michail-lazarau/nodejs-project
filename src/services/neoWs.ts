import get from 'axios';
import { buildUrl } from '../utilities/urlBuilder';
import { URLSearchParams } from 'node:url';
import environment from '../config/environment';

export const getMeteors = async (searchParams: URLSearchParams) => {
  const url = buildUrl(environment.nasaApi.PATH_NeoWs ?? '', searchParams); // TODO: amend path
  return get(url);
};
