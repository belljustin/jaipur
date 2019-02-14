import Deck from './Deck';

const MARKET_SIZE = 5;
const INIT_HAND_SIZE = 5;

const tokenType = ['red', 'gold', 'silver', 'pink', 'green', 'brown'];
const initialTokens = [
  [5, 5, 5, 7, 7],
  [5, 5, 5, 6, 6],
  [5, 5, 5, 5, 5],
  [1, 1, 2, 2, 3, 3, 5],
  [1, 1, 2, 2, 3, 3, 5],
  [1, 1, 1, 1, 1, 2, 3, 4]
];

class Player {
  constructor(id, hand) {
    this.id = id;
    this.hand = hand;
    this.points = 0;
  }

  sellCards(selectedCards) {
    for (i of selectedCards) {
      this.hand.splice(i, 1);
    }
  }

  tradeCards(selectedCards, takenCards) {
    let givenCards = []
    selectedMarket.forEach(i => {
      givenCards.push(this.market[i]);
      this.hand.splice(i, 1);
    })

    takenCards.forEach(c => {
      this.hand.push(c);
    })

    return givenCards;
  }
}

class Game {
  constructor(id) {
    this.id = id;
    this.tokens = initialTokens;
    this.deck = new Deck();
    // TODO: put specials here
    this.market = this.deck.deal(MARKET_SIZE);
    this.turn = 0;
    this.players = [];
  }

  addPlayer(playerId) {
    if (this.players.length >= 2) {
      return -1;
    }

    let hand = this.deck.deal(INIT_HAND_SIZE);
    this.players.push(
      new Player(playerId, hand)
    )
    return this.players.length;
  }

  sellCards(playerId, selectedCards) {
    let player = this.getPlayer(playerId);
    player.sellCards(selectedCards);

    const i = selectedCards.values().next();
    const name = this.player.hand[i];

    const j = tokenType.find(t => t === name);
    let purchasedTokens = this.tokens[j].slice(-selectedCards.length);
    this.tokens[j] = this.tokens[j].slice(0, -selectedCards.length);
  }

  tradeCards(playerId, selectedMarket, selectedHand) {
    let takenCards = []
    selectedMarket.forEach(i => {
      takenCards.push(this.market[i]);
      this.market.splice(i, 1);
    })

    let player = this.getPlayer(playerId);
    const givenCards = player.tradeCards(selectedHand, takenCards);
    givenCards.forEach(c => {
      this.market.push(c);
    })
  }

  getPlayer(playerId) {
    return this.players.find(p =>  p.id === playerId);
  }

  isPlayerTurn(playerId) {
    const i = this.players.findIndex(p => p.id === playerId);
    return (this.turn % 2 === i);
  }
}

export default Game;
