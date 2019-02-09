import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
 

const uuid = require('uuid/v4');

export const Lobby = ({ gameIds }) => (
  <div>
    <Link to={"/games/" + uuid()}>New Game</Link>
    <ul>
      {gameIds.map((id, index) => (
        <Link key={index} to={"/games/" + id}>{id}</Link>
      ))}
    </ul>
  </div>
)

Lobby.propTypes = {
  gameIds: PropTypes.arrayOf(PropTypes.string).isRequired
}
