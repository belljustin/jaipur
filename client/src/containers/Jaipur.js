import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import Market from '../containers/Market';
import Hand from '../containers/Hand';
import Take from '../containers/Take';
import Sell from '../containers/Sell';
import Tokens from '../containers/Tokens';
import { joinGame } from '../actions/websockets';

import './Jaipur.css';

class Component extends React.Component {
  render() {
    return (
      <div className="containers flex-container">
        <div id="game-container">
          <h3>Points: { this.props.points }</h3>
          <Tokens />
        </div>
        <div id="cards-container" className="cards-container">
          <Market name="Market"/>
          <Hand name="Hand"/>
          <Take />
          <Sell />
        </div>
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
