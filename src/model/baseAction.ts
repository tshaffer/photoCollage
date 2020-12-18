/** @module Model:base */

import {
  Action,
  Dispatch,
  ActionCreator,
} from 'redux';
import { PhotoCollageModelState } from '../type';

// -----------------------------------------------------------------------
// Actions
// -----------------------------------------------------------------------

/** @internal */
/** @private */
export type BsUiModelDispatch = Dispatch<any>;

/** @internal */
/** @private */
export interface PhotoCollageModelBaseAction<T> extends Action {
  type: string;   // override Any - must be a string
  payload: T;
  error?: boolean;
  meta?: {};
}

/** @internal */
/** @private */
export interface BsUiModelBaseAction extends Action {
  type: string;   // override Any - must be a string
  payload: {};
  error?: boolean;
  meta?: {};
}

/** @internal */
/** @private */
export interface BsUiModelAction<T> extends BsUiModelBaseAction {
  payload: T;     // override payload with specific parameter type
}

/** @internal */
/** @private */
export type BsUiModelActionCreator<T> = ActionCreator<BsUiModelAction<T>>;

/** @internal */
/** @private */
export type BsUiModelThunkAction<T> = (
  dispatch: BsUiModelDispatch,
  getState: () => PhotoCollageModelState,
  extraArgument: undefined,
) => T;

/** @internal */
/** @private */
export interface BsUiModelBatchAction extends Action {
  type: string;
  payload: BsUiModelBaseAction[];
}

/** @internal */
/** @private */
export interface RehydrateBsUiModelParams {
  newPhotoCollageModelState: PhotoCollageModelState;
}
