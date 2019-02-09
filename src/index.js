import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import * as serviceWorker from './serviceWorker';

import App from './App';
import jaipur from './reducers'
import SocketClient from './client'

const store = createStore(jaipur);
const socketClient = new SocketClient(
  'localhost:3001',
  '/test',
  store.dispatch
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
