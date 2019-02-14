import React from 'react';
import './Market.css';
import Card from './Card.js';

import PropTypes from 'prop-types';

const CardList = ({ cards, selectedCards, onCardClick }) => (
  <ul>
    {cards.map((card, index) => (
      <Card 
        key={index}
        name={card}
        selected={selectedCards.has(index)}
        onClick={() => onCardClick(index)}
      />
    ))}
  </ul>
)

CardList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCards: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired
}

export default CardList
