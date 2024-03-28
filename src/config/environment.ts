import dotenv from 'dotenv';
dotenv.config();

const { HOSTNAME, PATH_NeoWs, PATH_MarsCuriousityPhotos, PATH_MarsCuriousityPhotoManifest, PORT, SENTRY_DNS } =
  process.env;

export const environment = {
  port: PORT,
  nasaApi: {
    hostname: HOSTNAME,
    PATH_NeoWs: PATH_NeoWs,
    PATH_MarsCuriousityPhotos: PATH_MarsCuriousityPhotos,
    PATH_MarsCuriousityPhotoManifest: PATH_MarsCuriousityPhotoManifest,
  },
  sentry: {
    dns: SENTRY_DNS,
  },
};
