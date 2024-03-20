const marsRoverPhotosService = require('../services/MarsRoverPhotos');

exports.getLatestMarsPhotoPage = (req, res) => {
  res.render('photos/mars-rover-latest-photo-search', {
    pageTitle: 'Search Latest Mars Photo',
    path: '/mars-rover-latest-photo-search',
  });
};

exports.postUserToGetLatestMarsPhoto = async (req, res, next) => {
  const apiKey = req.body.api_key;
  try {
    const latestMarsPhoto = await marsRoverPhotosService.getMostRecentPhoto(
      makeQueryParams(apiKey)
    );
    // res.status(201).redirect(latestMarsPhoto)
    // res.status(201).send(`<img src='${latestMarsPhoto}'>`)
    res.status(201).render('photos/mars-rover-latest-photo', {
      url: latestMarsPhoto,
      pageTitle: 'Latest Mars Photo',
      path: '/mars-rover-latest-photo',
    });
  } catch (err) {
    next(err);
  }
};

const makeQueryParams = (apiKey) => {
  const urlSearchParams = new URLSearchParams({});
  urlSearchParams.append('api_key', apiKey);
  return urlSearchParams;
};
