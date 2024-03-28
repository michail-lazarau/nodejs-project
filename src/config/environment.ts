import dotenv from 'dotenv';
dotenv.config();

const { HOSTNAME, PATH_NeoWs, PATH_MarsCuriousityPhotos, PATH_MarsCuriousityPhotoManifest, PORT } = process.env;

const environment = {
  port: PORT,
  nasaApi: {
    hostname: HOSTNAME,
    PATH_NeoWs: PATH_NeoWs,
    PATH_MarsCuriousityPhotos: PATH_MarsCuriousityPhotos,
    PATH_MarsCuriousityPhotoManifest: PATH_MarsCuriousityPhotoManifest,
  },
};

export default environment;
