/** @module Model:base */

import {
  Reducer,
  combineReducers
} from 'redux';
import { isNil } from 'lodash';
import { BsUiModelState } from '../type';
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

export type BsUiReducer = Reducer<BsUiModelState>;
const enableBatching = (
    reduce: (state: BsUiModelState, action: BsUiModelBaseAction | BsUiModelBatchAction) => BsUiModelState,
): BsUiReducer => {
  return function batchingReducer(
    state: BsUiModelState,
    action: BsUiModelBaseAction | BsUiModelBatchAction,
  ): BsUiModelState {
    switch (action.type) {
      case BSUIMODEL_BATCH:
        return (action as BsUiModelBatchAction).payload.reduce(batchingReducer, state);
      default:
        return reduce(state, action);
    }
  };
};

export const bsUiModelReducer: BsUiReducer = enableBatching(combineReducers<BsUiModelState>({
  photoCollage: photoCollageReducer,
  photoCollageAttributes: photoCollageAttributesReducer,
  photoCollageSpecs: photoCollageSpecsReducer,
  photoCollection: photoCollectionReducer,
  photoPlayer: photoPlayerReducer,
}));

// -----------------------------------------------------------------------
// Validators
// -----------------------------------------------------------------------

export const isValidBsUiModelState = (state: any): boolean => {
  return !isNil(state);
  // TEDTODO - add remaining properties
    // && state.hasOwnProperty('template') && isValidTemplateState(state.template);
};

export const isValidBsUiModelStateShallow = (state: any): boolean => {
  return !isNil(state);
  // TEDTODO - add remaining properties
  // && state.hasOwnProperty('template');
};