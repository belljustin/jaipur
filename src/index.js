import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import * as serviceWorker from './serviceWorker';

import Root from './Root'
import jaipur from './reducers'

const store = createStore(jaipur);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
