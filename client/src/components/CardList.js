import React from 'react';
import './Market.css';
import Card from './Card.js';

import PropTypes from 'prop-types';

const CardList = ({ cards, onCardClick }) => (
  <ul>
    {cards.map((card, index) => (
      <Card key={index} {...card} onClick={() => onCardClick(index)}/>
    ))}
  </ul>
)

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  onCardClick: PropTypes.func.isRequired
}

export default CardList
