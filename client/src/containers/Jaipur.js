import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Market from '../containers/Market';
import Hand from '../containers/Hand';
import Take from '../containers/Take';
import Sell from '../containers/Sell';
import Tokens from '../containers/Tokens';
import { joinGame } from '../actions/websockets';

class Component extends React.Component {
  render() {
    return (
      <div>
        <h2>Points: { this.props.points }</h2>
        <h2>Market</h2>
        <Market />
        <h2>Hand</h2>
        <Hand />
        <Take />
        <Sell />
        <h2>Tokens</h2>
        <Tokens />
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
  points: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    gameId: ownProps.match.params.id,
    points: state.game.points
  }
}

const Jaipur = connect(
  mapStateToProps,
  null
)(Component)

export default Jaipur 
