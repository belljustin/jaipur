import React from 'react';
import PropTypes from 'prop-types'

const Button = ({ onClick, name, disabled }) => (
  <button type="button" onClick={() => onClick()} disabled={disabled}>
    {name}
  </button>
)

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

export default Button;
