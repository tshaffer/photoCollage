/** @module Selector:base */

import { PhotoCollageModelState } from '../type';
import { isValidPhotoCollageModelStateShallow } from '../model';
import {
  BsUiError,
  BsUiErrorType,
} from '../utility/BsUiError';

/** @internal */
/** @private */
export const bsUiModelFilterBaseState = (state: any): PhotoCollageModelState => {
  if (state.hasOwnProperty('bsuimodel') && isValidPhotoCollageModelStateShallow(state.bsuimodel)) {
    return state.bsuimodel as PhotoCollageModelState;
  } else if (isValidPhotoCollageModelStateShallow(state)) {
    return state as PhotoCollageModelState;
  } else {
    const exceptionMessage = `state must be of type PhotoCollageModelState or have a field bsuimodel
      of type PhotoCollageModelState. invalid state ${JSON.stringify(state)}`;
    throw new BsUiError(BsUiErrorType.invalidParameters, exceptionMessage);
  }
};

/** @internal */
/** @private */
export const bsUiModelGetBaseState = (state: PhotoCollageModelState): PhotoCollageModelState  => {
  return bsUiModelFilterBaseState(state);
};