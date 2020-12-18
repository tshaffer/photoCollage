import { PhotoCollageConfig } from '../type';
import * as dotenv from 'dotenv';

export let photoCollageConfig: PhotoCollageConfig;

export const readConfig = (pathToConfigFile: string) => {

  let parsedConfig: dotenv.DotenvParseOutput;

  try {
    // const rawConfig = dotenv.config({ path: pathToConfigFile }).parsed;
    const configOutput: dotenv.DotenvConfigOutput = dotenv.config({ path: pathToConfigFile });
    parsedConfig = configOutput.parsed!;
  }
  catch (err) {
    console.log('Dotenv config error: ' + err.message);
  }

  photoCollageConfig = {
    volumeSpec: parsedConfig.volumeSpec,
    photosRootDirectory: parsedConfig.photosRootDirectory,
    photosManifestFileName: parsedConfig.photosManifestFileName,
    width: parseInt(parsedConfig.width, 10),
    height: parseInt(parsedConfig.height, 10),
  };

  console.log('readConfig, config: ', photoCollageConfig);
};
