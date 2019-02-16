import React from 'react';
import './Market.css';
import Card from './Card.js';

import PropTypes from 'prop-types';

const CardList = ({ name, cards, selectedCards, onCardClick }) => (
  <div class="nes-container with-title">
    <h2 class="title">{name}</h2>
    {cards.map((card, index) => (
      <Card 
        key={index}
        name={card}
        selected={selectedCards.has(index)}
        onClick={() => onCardClick(index)}
      />
    ))}
  </div>
)

CardList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCards: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired
}

export default CardList
