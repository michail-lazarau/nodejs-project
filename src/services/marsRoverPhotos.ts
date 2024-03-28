import axios from 'axios';
import * as dateUtil from 'date-fns';
import { buildUrl } from '../utilities/urlBuilder';
import { DATE_TEMPLATE } from '../utilities/dates';
import { URLSearchParams } from 'node:url';
import environment from '../config/environment';

// MARK: searchParams: api_key
const getPhotoManifestData = async (searchParams: URLSearchParams) => {
  const manifestUrl = buildUrl(environment.nasaApi.PATH_MarsCuriousityPhotoManifest ?? '', searchParams); // todo: amend path
  return await axios.get(manifestUrl);
};

// MARK: searchParams: api_key, earth_date
const getPhotos = async (searchParams: URLSearchParams) => {
  const url = buildUrl(environment.nasaApi.PATH_MarsCuriousityPhotos ?? '', searchParams); // todo: amend path
  return await axios.get(url);
};

// MARK: searchParams: api_key
const getMostRecentPhoto = async (searchParams: URLSearchParams) => {
  const { data: manifestData } = await getPhotoManifestData(searchParams);
  const earth_date = dateUtil.format(manifestData.photo_manifest.max_date, DATE_TEMPLATE);

  searchParams.append('earth_date', earth_date);

  const { data: photosData } = await getPhotos(searchParams);
  return photosData.photos.pop().img_src; // pop() is quicker than slice(-1)
};

export default getMostRecentPhoto;
