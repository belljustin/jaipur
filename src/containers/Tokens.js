import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

const Component = ({ tokenTypes, tokens }) => (
  <ul>
    {tokenTypes.map((type, index) => (
      <li key={index}><b>{type}</b> {tokens[index].join(", ")} </li>
    ))}
  </ul>
)

Component.propTypes = {
  tokenTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  tokens: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ).isRequired
}

const mapStateToProps = (state) => {
  return {
    tokenTypes: state.tokenTypes,
    tokens: state.tokens
  }
}

const Tokens = connect(
  mapStateToProps,
  null
)(Component)

export default Tokens
