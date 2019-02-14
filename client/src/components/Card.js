import React from 'react';
import PropTypes from 'prop-types'

const Card = ({ onClick, name, selected }) => (
  <div 
    onClick={onClick}
    style={{
      textDecoration: selected ? 'line-through' : 'none'
    }}
  >
    {name}
  </div>
)

Card.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired
}

export default Card;
