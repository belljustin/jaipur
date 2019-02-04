import React, { Component } from 'react';
import './Market.css';
import Card from './Card.js';

class Market extends Component {
  render() {
    const cards = renderCards(
      this.props.market,
      this.props.handleCardClick);
    return (
      <div>
        <div className="market">{cards}</div>
      </div>
    );
  }
}

function renderCard(card, handleCardClick, key) {
  return (
    <Card 
      name={card.name}
      selected={card.selected}
      onClick={() => handleCardClick(key)}
      key={key}
    />
  )
}

function renderCards(market, handleCardClick) {
  return market
    .map((c, i) => renderCard(c, handleCardClick, i));
}

export default Market;
