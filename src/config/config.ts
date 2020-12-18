import { PhotoCollageConfig } from '../type';
import * as dotenv from 'dotenv';
import { isNil } from 'lodash';

export let photoCollageConfig: PhotoCollageConfig;

export const readConfig = (pathToConfigFile: string) => {

  try {
    // const rawConfig = dotenv.config({ path: pathToConfigFile }).parsed;
    const configOutput: dotenv.DotenvConfigOutput = dotenv.config({ path: pathToConfigFile });
    const parsedConfig: dotenv.DotenvParseOutput | undefined = configOutput.parsed;

    if (!isNil(parsedConfig)) {
      photoCollageConfig = {
        volumeSpec: parsedConfig.volumeSpec,
        photosRootDirectory: parsedConfig.photosRootDirectory,
        photosManifestFileName: parsedConfig.photosManifestFileName,
        width: parseInt(parsedConfig.width, 10),
        height: parseInt(parsedConfig.height, 10),
      };
      console.log('readConfig, config: ', photoCollageConfig);
    }
  }
  catch (err) {
    console.log('Dotenv config error: ' + err.message);
  }
};
