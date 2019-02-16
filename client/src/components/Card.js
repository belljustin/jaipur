import React from 'react';
import PropTypes from 'prop-types'

import broccoli from './resources/001-broccoli.png';
import bellpepper from './resources/005-bell-pepper.png';
import carrot from './resources/008-carrot.png';
import apple from './resources/027-apple.png';
import banana from './resources/031-banana.png';
import grape from './resources/033-grape.png';
import acorn from './resources/037-acorn.png';

const Card = ({ onClick, name, selected }) => (
  <div 
    onClick={onClick}
    className="cardGroup__card"
    style={{
      textDecoration: selected ? 'line-through' : 'none'
    }}
  >
    <img alt={name} src={getImg(name)} style={getStyle(selected)}/>
  </div>
)

const getStyle = (selected) => {
  if (selected) {
    return {
      width: '50px',
    }
  } else {
    return {
      width: '50px',
      filter: 'grayscale(1)',
    }
  }
}

const getImg = (name) => {
  switch (name) {
    case 'broccoli':
      return broccoli;
    case 'bellpepper':
      return bellpepper;
    case 'carrot':
      return carrot;
    case 'apple':
      return apple;
    case 'banana':
      return banana;
    case 'grape':
      return grape;
    case 'acorn':
      return acorn;
    default:
      return 'not found';
  }
}

Card.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired
}

export default Card;
