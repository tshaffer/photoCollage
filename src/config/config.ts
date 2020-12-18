import { PhotoCollageConfig } from '../type';
import * as dotenv from 'dotenv';

export let photoCollageConfig: PhotoCollageConfig;

export const readConfig = (pathToConfigFile: string) => {

  let rawConfig: any;

  try {
    // const rawConfig = dotenv.config({ path: pathToConfigFile }).parsed;
    rawConfig = dotenv.config({ path: pathToConfigFile }).parsed;
  }
  catch (err) {
    console.log('Dotenv config error: ' + err.message);
  }

  photoCollageConfig = {
    volumeSpec: rawConfig.volumeSpec,
    photosRootDirectory: rawConfig.photosRootDirectory,
    photosManifestFileName: rawConfig.photosManifestFileName,
    width: parseInt(rawConfig.width, 10),
    height: parseInt(rawConfig.height, 10),
  };

  console.log('readConfig, config: ', photoCollageConfig);
};
