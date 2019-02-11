import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Market from '../containers/Market.js';
import Hand from '../containers/Hand.js';
import Take from '../containers/Take.js';
import Sell from '../containers/Sell.js';
import { joinGame } from '../actions/websockets';

class Component extends React.Component {
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
    joinGame(gameId);
  }
}

Component.propTypes = {
  gameId: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    gameId: ownProps.match.params.id,
  }
}

const Jaipur = connect(
  mapStateToProps,
  null
)(Component)

export default Jaipur 
