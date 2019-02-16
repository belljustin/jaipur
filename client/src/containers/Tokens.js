import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

const Component = ({ tokenTypes, tokens }) => (
  <table className="nes-table is-bordered is-centered">
  <thead>
    <tr>
      <td>Tokens</td>
    </tr>
  </thead>
  <tbody>
    {tokenTypes.map((type, index) => (
      <tr key={index}>
        <td>{type}</td>
        <td>{tokens[index].join(" ")}</td>
      </tr>
    ))}
  </tbody>
  </table>
)

Component.propTypes = {
  tokenTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  tokens: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ).isRequired
}

const mapStateToProps = (state) => {
  return {
    tokenTypes: state.game.tokenTypes,
    tokens: state.game.tokens
  }
}

const Tokens = connect(
  mapStateToProps,
  null
)(Component)

export default Tokens
