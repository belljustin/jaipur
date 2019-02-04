import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SocketClient from './socket-client';
import App from './App';
import * as serviceWorker from './serviceWorker';

var urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('game')

const socketClient = new SocketClient('http://localhost:3001', '/test');
ReactDOM.render(<App gameId={gameId} socketClient={socketClient}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
