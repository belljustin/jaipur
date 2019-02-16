import Deck from './Deck';

const MARKET_SIZE = 5;
const INIT_HAND_SIZE = 5;

const tokenType = ['broccoli', 'bellpepper', 'carrot', 'apple', 'banana', 'grape'];
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
    for (let i of selectedCards) {
      this.hand.splice(i, 1);
    }
  }

  tradeCards(selectedHand, takenCards) {
    let givenCards = []
    selectedHand.forEach(i => {
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

    const i = selectedCards.values().next().value;
    const name = player.hand[i];

    const j = tokenType.findIndex(t => t === name);
    let purchasedTokens = this.tokens[j].slice(-selectedCards.size);

    player.sellCards(selectedCards);
    this.tokens[j] = this.tokens[j].slice(0, -selectedCards.size);

    this.turn++;
  }

  tradeCards(playerId, selectedMarket, selectedHand) {
    let takenCards = []
    const _market = Object.assign({}, this.market);
    selectedMarket.forEach(i => {
      takenCards.push(_market[i]);
      this.market.splice(i, 1);
    })

    let player = this.getPlayer(playerId);
    const givenCards = player.tradeCards(selectedHand, takenCards);
    givenCards.forEach(c => {
      this.market.push(c);
    })

    const n = MARKET_SIZE - this.market.length
    this.market = this.market.concat(this.deck.deal(n));
    console.log(this.market);

    this.turn++;
  }

  getPlayer(playerId) {
    return this.players.find(p =>  p.id === playerId);
  }

  isPlayerTurn(playerId) {
    const i = this.players.findIndex(p => p.id === playerId);
    return (this.turn % 2 === i);
  }

  isGameOver() {
    if (this.deck.size()) {
      return true;
    }

    numEmptyTokens = this.tokens.reduce((acc, t) => {
      acc += (t.length === 0) ? 1 : 0;
    })
    if (numEmptyTokens >= 3) {
      return true;
    }

    return false;
  }
}

export default Game;
