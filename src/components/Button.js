import React from 'react';
import PropTypes from 'prop-types'

const Button = ({ onClick, name }) => (
  <button type="button" onClick={() => onClick()}>
    {name}
  </button>
)

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default Button;
