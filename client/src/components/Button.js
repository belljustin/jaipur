import React from 'react';
import PropTypes from 'prop-types'

const Button = ({ onClick, name, disabled }) => (
  <button 
    className={getClass(disabled)}
    type="button"
    onClick={() => onClick()}
    disabled={disabled}>
      {name}
  </button>
)

const getClass = (disabled) => {
  if (disabled) {
    return "nes-btn is-disabled";
  } else {
    return "nes-btn is-primary";
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

export default Button;
