import React from 'react';
import PropTypes from 'prop-types';

import Market from '../containers/Market.js';
import Hand from '../containers/Hand.js';
import Take from '../containers/Take.js';
import Sell from '../containers/Sell.js';


export class Jaipur extends React.Component {
  render() {
    return (
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
  }

  componentWillMount() {
    const gameId = this.props.gameId;
    this.props.joinGame(gameId);
  }
}

Jaipur.propTypes = {
  gameId: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired, 
}

export default Jaipur 
