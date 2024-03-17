const axios = require('axios')
const dateUtil = require('date-fns')
const urlBuilder = require('../urlBuilder')
const { DATE_TEMPLATE } = require('../dates')

const PATH_MarsCuriousityPhotoManifest = process.env.PATH_MarsCuriousityPhotoManifest
const PATH_MarsRoverPhotos = process.env.PATH_MarsRoverPhotos

// MARK: queryParams: api_key
// Curiousity
const getPhotoManifestData = async (urlSearchParams) => {
  const manifestUrl = urlBuilder.make(PATH_MarsCuriousityPhotoManifest, urlSearchParams)
  return await axios.get(manifestUrl);
};

// MARK: queryParams: api_key, earth_date
const getPhotos = async (urlSearchParams) => {
  const url = urlBuilder.make(PATH_MarsRoverPhotos, urlSearchParams)
  return await axios.get(url);
}

// MARK: queryParams: api_key
exports.getMostRecentPhoto = async (urlSearchParams) => {
  const { data } = await getPhotoManifestData(urlSearchParams)
  const earth_date = dateUtil.format(data.photo_manifest.max_date, DATE_TEMPLATE)

  urlSearchParams.append("earth_date", earth_date)

  const { photos } = await getPhotos(urlSearchParams)
  return photos.pop().img_src // pop() is quicker than slice(-1)
}
