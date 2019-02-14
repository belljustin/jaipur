import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
 

const uuid = require('uuid/v4');

export class Lobby extends React.Component {
  render() {
    return (
      <div>
        <Link to={"/games/" + uuid()}>New Game</Link>
        <ul>
          {this.props.games.map((id, index) => (
            <li key={index}>
              <Link key={index} to={"/games/" + id}>{id}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  componentWillMount() {
    this.props.listGames();
  }
}


Lobby.propTypes = {
  gameIds: PropTypes.arrayOf(PropTypes.string).isRequired
}
