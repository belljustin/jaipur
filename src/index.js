import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

import Root from './Root'
import jaipur from './reducers'

import { init as websocketInit, emit} from './actions/websockets'

const middleware = [
  thunkMiddleware.withExtraArgument({emit})
];

const store = createStore(
  jaipur,
  applyMiddleware(
    ...middleware
  )
);
websocketInit(store);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
