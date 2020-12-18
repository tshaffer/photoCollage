import {
  PhotoCollageModelState,
  createModel,
  PhotoCollageAttributes,
  PhotoCollageItem,
  PhotoCollageSpec,
  PhotoCollection,
  PhotoPlayer,
} from '../type';
import {
  bsUiModelRehydrateModel,
  bsUiModelResetModel,
} from '../model';

// -----------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------

const fetchModelAsync = (): Promise<PhotoCollageModelState> => {
  return new Promise((resolve) => {
    const photoCollage: PhotoCollageItem[] = [];
    const photoCollageAttributes: PhotoCollageAttributes = {
      photosRootDirectory: '',
      photoCollageSpecIndex: 0,
    };
    const photoCollageSpecs: PhotoCollageSpec[] = [];
    const photoCollection: PhotoCollection = {
      mediaItemsById: {},
      albums: {},
      photosInCollection: [],
    };
    const photoPlayer: PhotoPlayer = {
      playbackActive: false,
      timeBetweenUpdates: 5,
      photoCollageSpec: '',
      photosInCollage: [],
    };
    const model = createModel(
      photoCollage,
      photoCollageAttributes,
      photoCollageSpecs,
      photoCollection,
      photoPlayer,
    );
    resolve(model);
  });
};

// -----------------------------------------------------------------------
// Controller Methods
// -----------------------------------------------------------------------

export const initModel = () => {
  return (dispatch: any) => {
    return fetchModelAsync()
      .then((model) => dispatch(bsUiModelRehydrateModel(model)));
  };
};

export const resetModel = () => {
  return (dispatch: any) => {
    return dispatch(bsUiModelResetModel());
  };
};
