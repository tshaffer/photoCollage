import { cloneDeep } from 'lodash';
import { Action } from 'redux';
import { PhotoInCollageSpec, PhotoPlayer } from '../type';
import { PhotoCollageModelAction } from './baseAction';

// ------------------------------------
// Constants
// ------------------------------------
const START_PHOTO_PLAYBACK = 'START_PHOTO_PLAYBACK';
const STOP_PHOTO_PLAYBACK = 'STOP_PHOTO_PLAYBACK';
const SET_TIME_BETWEEN_UPDATES = 'SET_TIME_BETWEEN_UPDATES';
const SET_PHOTO_COLLAGE_SPEC = 'SET_PHOTO_COLLAGE_SPEC';
const SET_ACTIVE_POPULATED_PHOTO_COLLAGE = 'SET_ACTIVE_POPULATED_PHOTO_COLLAGE';

// ------------------------------------
// Actions
// ------------------------------------

export const startPhotoPlayback = (
): Action => {
  return {
    type: START_PHOTO_PLAYBACK,
  };
};

export const stopPhotoPlayback = (
): Action => {
  return {
    type: STOP_PHOTO_PLAYBACK,
  };
};

type SetTimeBetweenUpdatesPayload = number;
type SetTimeBetweenUpdatesAction = PhotoCollageModelAction<SetTimeBetweenUpdatesPayload>;

export const setTimeBetweenUpdates = (
  timeBetweenUpdates: number,
): SetTimeBetweenUpdatesAction => {
  return {
    type: SET_TIME_BETWEEN_UPDATES,
    payload: timeBetweenUpdates,
  };
};

type SetPhotoCollageSpecPayload = string;
type SetPhotoCollageSpecAction = PhotoCollageModelAction<SetPhotoCollageSpecPayload>;

export const setPhotoCollageSpec = (
  photoCollageSpec: string,
): SetPhotoCollageSpecAction => {
  return {
    type: SET_PHOTO_COLLAGE_SPEC,
    payload: photoCollageSpec,
  };
};

export type SetActivePopulatedPhotoCollagePayload = PhotoInCollageSpec[];
type SetActivePopulatedCollageAction = PhotoCollageModelAction<SetActivePopulatedPhotoCollagePayload>;

export const setActivePopulatedPhotoCollage = (
  photosInCollage: PhotoInCollageSpec[],
): SetActivePopulatedCollageAction => {
  return {
    type: SET_ACTIVE_POPULATED_PHOTO_COLLAGE,
    payload: photosInCollage,
  };
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState: PhotoPlayer = {
  playbackActive: false,
  timeBetweenUpdates: 5,
  photoCollageSpec: '',
  photosInCollage: [],
};

export const photoPlayerReducer = (
  state: PhotoPlayer = initialState,
  // action: Action & PhotoCollageModelBaseAction<SetTimeBetweenUpdatesPayload> & PhotoCollageModelBaseAction<SetPhotoCollageSpecPayload>,
  action: Action & SetTimeBetweenUpdatesAction & SetPhotoCollageSpecAction & SetActivePopulatedCollageAction,
): PhotoPlayer => {
  switch (action.type) {
    case START_PHOTO_PLAYBACK: {
      return {
        ...state,
        playbackActive: true,
      };
    }
    case STOP_PHOTO_PLAYBACK: {
      return {
        ...state,
        playbackActive: false,
      };
    }
    case SET_TIME_BETWEEN_UPDATES: {
      return {
        ...state,
        timeBetweenUpdates: action.payload,
      };
    }
    case SET_PHOTO_COLLAGE_SPEC: {
      return {
        ...state,
        photoCollageSpec: action.payload,
      };
    }
    case SET_ACTIVE_POPULATED_PHOTO_COLLAGE: {
      return {
        ...state,
        photosInCollage: cloneDeep(action.payload),
      };
    }
    default:
      return state;
  }
};
