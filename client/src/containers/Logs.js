import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Logs.css';

class Component extends React.Component {
  render() {
    return (
      <div className="nes-container with-title">
        <h2 className="title">Log</h2>
        <ul className="nes-list is-disc" id="logs">
          {this.props.logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    )
  }
}

Component.PropTypes = {
  logs: PropTypes.arrayOf(PropTypes.string).isRequired
}

const mapStateToProps = (state) => {
  return {
    logs: state.game.logs
  }
}

const Logs = connect(
  mapStateToProps,
  null
)(Component)

export default Logs
