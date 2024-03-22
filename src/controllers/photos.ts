import { NextFunction, Request, Response } from 'express';

const marsRoverPhotosService = require('../services/MarsRoverPhotos.js');

const makeQueryParams = (apiKey: string) => {
  const urlSearchParams = new URLSearchParams({});
  urlSearchParams.append('api_key', apiKey);
  return urlSearchParams;
};

const getLatestMarsPhotoPage = (req: Request, res: Response) => {
  res.render('photos/mars-rover-latest-photo-search', {
    pageTitle: 'Search Latest Mars Photo',
    path: '/mars-rover-latest-photo-search',
  });
};

const postUserToGetLatestMarsPhoto = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.body.api_key;
  try {
    const latestMarsPhoto = await marsRoverPhotosService.getMostRecentPhoto(makeQueryParams(apiKey));
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

export { postUserToGetLatestMarsPhoto, getLatestMarsPhotoPage };
