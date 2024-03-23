"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestMarsPhotoPage = exports.postUserToGetLatestMarsPhoto = void 0;
const marsRoverPhotos_1 = __importDefault(require("../services/marsRoverPhotos"));
const makeQueryParams = (apiKey) => {
    const urlSearchParams = new URLSearchParams({});
    urlSearchParams.append('api_key', apiKey);
    return urlSearchParams;
};
const getLatestMarsPhotoPage = (req, res) => {
    res.render('photos/mars-rover-latest-photo-search', {
        pageTitle: 'Search Latest Mars Photo',
        path: '/mars-rover-latest-photo-search',
    });
};
exports.getLatestMarsPhotoPage = getLatestMarsPhotoPage;
const postUserToGetLatestMarsPhoto = async (req, res, next) => {
    const apiKey = req.body.api_key;
    try {
        const latestMarsPhoto = await (0, marsRoverPhotos_1.default)(makeQueryParams(apiKey));
        res.status(201).render('photos/mars-rover-latest-photo', {
            url: latestMarsPhoto,
            pageTitle: 'Latest Mars Photo',
            path: '/mars-rover-latest-photo',
        });
    }
    catch (err) {
        next(err);
    }
};
exports.postUserToGetLatestMarsPhoto = postUserToGetLatestMarsPhoto;
//# sourceMappingURL=photos.js.map