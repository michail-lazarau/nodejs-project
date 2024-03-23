"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { HOSTNAME, PATH_NeoWs, PATH_MarsCuriousityPhotos, PATH_MarsCuriousityPhotoManifest, PORT } = process.env;
exports.environment = {
    port: PORT,
    nasaApi: {
        hostname: HOSTNAME,
        PATH_NeoWs: PATH_NeoWs,
        PATH_MarsCuriousityPhotos: PATH_MarsCuriousityPhotos,
        PATH_MarsCuriousityPhotoManifest: PATH_MarsCuriousityPhotoManifest,
    },
};
//# sourceMappingURL=environment.js.map