import React from 'react';
import Market from './containers/Market.js';
import Hand from './containers/Hand.js';
import Take from './containers/Take.js';
import Sell from './containers/Sell.js';

const uuid = require('uuid/v4');

const App = () => (
  <div>
    <h2>Market</h2>
    <Market />
    <h2>Hand</h2>
    <Hand />
    <Take />
    <Sell />
    <h2>Tokens</h2>
  </div>
)

export default App
