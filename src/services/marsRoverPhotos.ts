import axios from 'axios';
import * as dateUtil from 'date-fns';
import { buildUrl } from '../utilities/urlBuilder';
import { DATE_TEMPLATE } from '../utilities/dates';
import { URLSearchParams } from 'node:url';

const PATH_MarsCuriousityPhotoManifest = process.env.PATH_MarsCuriousityPhotoManifest ?? ''; // todo: amend
const PATH_MarsCuriousityPhotos = process.env.PATH_MarsCuriousityPhotos ?? ''; // todo: amend

// MARK: searchParams: api_key
const getPhotoManifestData = async (searchParams: URLSearchParams) => {
  const manifestUrl = buildUrl(PATH_MarsCuriousityPhotoManifest, searchParams);
  return await axios.get(manifestUrl);
};

// MARK: searchParams: api_key, earth_date
const getPhotos = async (searchParams: URLSearchParams) => {
  const url = buildUrl(PATH_MarsCuriousityPhotos, searchParams);
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
