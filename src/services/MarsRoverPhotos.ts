import axios from 'axios';
import * as dateUtil from 'date-fns';
import { buildUrl } from '../utilities/urlBuilder.ts';
// eslint-disable-next-line import/no-unresolved
import { DATE_TEMPLATE } from '../utilities/dates.js';

const PATH_MarsCuriousityPhotoManifest = process.env.PATH_MarsCuriousityPhotoManifest ?? ''; // todo: amend
const PATH_MarsCuriousityPhotos = process.env.PATH_MarsCuriousityPhotos ?? ''; // todo: amend

// MARK: queryParams: api_key
export const getPhotoManifestData = async (urlSearchParams) => {
  const manifestUrl = buildUrl(PATH_MarsCuriousityPhotoManifest, urlSearchParams);
  return await axios.get(manifestUrl);
};

// MARK: queryParams: api_key, earth_date
export const getPhotos = async (urlSearchParams) => {
  const url = buildUrl(PATH_MarsCuriousityPhotos, urlSearchParams);
  return await axios.get(url);
};

// MARK: queryParams: api_key
export const getMostRecentPhoto = async (urlSearchParams) => {
  const { data: manifestData } = await getPhotoManifestData(urlSearchParams);
  const earth_date = dateUtil.format(manifestData.photo_manifest.max_date, DATE_TEMPLATE);

  urlSearchParams.append('earth_date', earth_date);

  const { data: photosData } = await getPhotos(urlSearchParams);
  return photosData.photos.pop().img_src; // pop() is quicker than slice(-1)
};
