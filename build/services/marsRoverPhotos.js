"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dateUtil = __importStar(require("date-fns"));
const urlBuilder_1 = require("../utilities/urlBuilder");
const dates_1 = require("../utilities/dates");
const PATH_MarsCuriousityPhotoManifest = process.env.PATH_MarsCuriousityPhotoManifest ?? '';
const PATH_MarsCuriousityPhotos = process.env.PATH_MarsCuriousityPhotos ?? '';
const getPhotoManifestData = async (searchParams) => {
    const manifestUrl = (0, urlBuilder_1.buildUrl)(PATH_MarsCuriousityPhotoManifest, searchParams);
    return await axios_1.default.get(manifestUrl);
};
const getPhotos = async (searchParams) => {
    const url = (0, urlBuilder_1.buildUrl)(PATH_MarsCuriousityPhotos, searchParams);
    return await axios_1.default.get(url);
};
const getMostRecentPhoto = async (searchParams) => {
    const { data: manifestData } = await getPhotoManifestData(searchParams);
    const earth_date = dateUtil.format(manifestData.photo_manifest.max_date, dates_1.DATE_TEMPLATE);
    searchParams.append('earth_date', earth_date);
    const { data: photosData } = await getPhotos(searchParams);
    return photosData.photos.pop().img_src;
};
exports.default = getMostRecentPhoto;
//# sourceMappingURL=marsRoverPhotos.js.map