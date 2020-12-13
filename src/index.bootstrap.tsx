import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { /*BsUiModelAction,*/ bsUiModelReducer } from './model';
// import { BsUiModelState } from './type';
import { PhotoCollage } from './component';
import './asset/bootstrap.css';
import 'normalize.css/normalize.css';
import 'flexboxgrid/dist/flexboxgrid.min.css';
import reportWebVitals from './reportWebVitals';
import { readConfig } from './config';
import { init } from './controller';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// readConfig('/storage/sd/config.env');
readConfig('/Users/tedshaffer/Documents/Projects/photoCollage/src/config/config.env');

const store = createStore(bsUiModelReducer, composeWithDevTools(applyMiddleware(thunk)));

store.dispatch(init());

ReactDOM.render(
  <Provider store={store}>
    <PhotoCollage />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
