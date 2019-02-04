import React, { Component } from 'react';
import './App.css';
import { makeCard } from './components/Card.js';
import Market from './components/Market.js';

const uuid = require('uuid/v4');

class App extends Component {

  constructor(props) {
    super(props);
    this.id = uuid();

    this.state = { 
      market: new Array(0),
      hand: new Array(0),
      yourTurn: false,
    }
  }

  componentDidMount() {
    this.props.socketClient
      .register('startGame', (msg) => this.handleStartGame(msg))
      .register('turnEnd', (msg) => this.handleTurnEnd(msg)) 

    this.props.socketClient
      .startGame(this.id, this.props.gameId);
  }

  // Socket-client handlers
  handleStartGame(msg) {
    this.setState({
      market: msg.market,
      hand: msg.hand,
      yourTurn: this.id === msg.currentPlayerId,
    });
  }

  handleTurnEnd(msg) {
      this.setState((state, props) => {
        return {
          ...state,
          market: msg.market,
          yourTurn: this.id === msg.currentPlayerId, 
        };
      });
  }

  endTurn() {
    this.props.socketClient.endTurn(this.props.gameId, this.state);
  }

  handleMarketClick(i) {
    this.setState((state, props) => {
      const market = state.market.slice();
      market[i] = {
        name: market[i].name,
        selected: !market[i].selected
      };
    
      return {
        ...state,
        market: market
      };
    });
  }

  handleHandClick(i) {
    this.setState((state, props) => {
      const hand = state.hand.slice();
      hand[i] = {
        ...hand[i],
        selected: !hand[i].selected
      };
    
      return {
        ...state,
        hand: hand 
      };
    });
  }

  handleTakeCards() {
    this.setState((state, props) => {
      const market = state.market
        .filter(c => !c.selected)

      const newCards = state.market
        .filter(c => c.selected)
        .map(c => makeCard(c.name))
      const hand = state.hand.concat(newCards);

      return {
        ...state,
        market: market,
        hand: hand,
      }
    }, this.endTurn);
  }

  handleSellCards() {
    this.setState((state, props) => {
      const hand = state.hand
        .filter(c => !c.selected)

      return {
        ...state,
        hand: hand,
      }
    }, this.endTurn);
  }

  handleTradeCards() {
    this.setState((state, props) => {
      const newHandCards = state.market
        .filter(c => c.selected)
        .map(c => makeCard(c.name));
      const hand = state.hand
        .filter(c => !c.selected)
        .concat(newHandCards);

      const newMarketCards = state.hand
        .filter(c => c.selected)
        .map(c => makeCard(c.name));
      const market = state.market
        .filter(c => !c.selected)
        .concat(newMarketCards);

      return {
        ...state,
        hand: hand,
        market: market,
      }
    }, this.endTurn);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Market
            market={this.state.market}
            handleCardClick={(i) => this.handleMarketClick(i)}/>
          <button
            onClick={() => this.handleTakeCards()}
            disabled={this.state.yourTurn}>
              take
          </button>
          <button
            onClick={() => this.handleSellCards()}
            disabled={this.state.yourTurn}>
              sell
          </button>
          <button
            onClick={() => this.handleTradeCards()}
            disabled={this.state.yourTurn}>
              trade
          </button>
          <Market
            market={this.state.hand}
            handleCardClick={(i) => this.handleHandClick(i)}/>
        </header>
      </div>
    );
  }
}

export default App;
