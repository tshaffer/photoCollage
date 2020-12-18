/** @module Model:base */

import {
  Reducer,
  combineReducers
} from 'redux';
import { isNil } from 'lodash';
import { PhotoCollageModelState } from '../type';
import {
  BSUIMODEL_BATCH,
  BsUiModelBaseAction,
  BsUiModelBatchAction,
} from './baseAction';
import { photoCollageAttributesReducer } from './photoCollageAttributes';
import { photoCollageReducer } from './photoCollage';
import { photoCollageSpecsReducer } from './photoCollageSpecs';
import { photoCollectionReducer } from './photoCollection';
import { photoPlayerReducer } from './photoPlayer';

// -----------------------------------------------------------------------
// Defaults
// -----------------------------------------------------------------------

// none

// -----------------------------------------------------------------------
// Reducers
// -----------------------------------------------------------------------

export type BsUiReducer = Reducer<PhotoCollageModelState>;
const enableBatching = (
  reduce: (state: PhotoCollageModelState, action: BsUiModelBaseAction | BsUiModelBatchAction) => PhotoCollageModelState,
): BsUiReducer => {
  return function batchingReducer(
    state: PhotoCollageModelState,
    action: BsUiModelBaseAction | BsUiModelBatchAction,
  ): PhotoCollageModelState {
    switch (action.type) {
      case BSUIMODEL_BATCH:
        return (action as BsUiModelBatchAction).payload.reduce(batchingReducer, state);
      default:
        return reduce(state, action);
    }
  };
};

export const bsUiModelReducer: BsUiReducer = enableBatching(combineReducers<PhotoCollageModelState>({
  photoCollage: photoCollageReducer,
  photoCollageAttributes: photoCollageAttributesReducer,
  photoCollageSpecs: photoCollageSpecsReducer,
  photoCollection: photoCollectionReducer,
  photoPlayer: photoPlayerReducer,
}));

// -----------------------------------------------------------------------
// Validators
// -----------------------------------------------------------------------

export const isValidPhotoCollageModelState = (state: any): boolean => {
  return !isNil(state);
  // TEDTODO - add remaining properties
  // && state.hasOwnProperty('template') && isValidTemplateState(state.template);
};

export const isValidPhotoCollageModelStateShallow = (state: any): boolean => {
  return !isNil(state);
  // TEDTODO - add remaining properties
  // && state.hasOwnProperty('template');
};