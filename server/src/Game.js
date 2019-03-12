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
const initialHiddenTokens = [
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [4, 4, 5, 5, 6, 6],
  [8, 8, 9, 10, 10]
];

class Player {
  constructor(id, hand) {
    this.id = id;
    this.hand = hand;
    this.points = 0;
  }

  sellCards(selectedCards) {
    for (let i of selectedCards.sort().reverse()) {
      this.hand.splice(i, 1);
    }
  }

  tradeCards(selectedHand, takenCards) {
    let givenCards = []
    selectedHand.sort().reverse().forEach(i => {
      givenCards.push(this.hand[i]);
      this.hand.splice(i, 1);
    })

    takenCards.forEach(c => {
      this.hand.push(c);
    })

    return givenCards;
  }

  addPoints(points) {
    this.points += points;
  }
}

class Game {
  constructor(id) {
    this.id = id;
    this.tokens = Object.assign({}, initialTokens);
    this.hiddenTokens = Object.assign({}, initialHiddenTokens);
    this.deck = new Deck();
    // TODO: put specials here
    this.market = this.deck.deal(MARKET_SIZE);
    this.turn = 0;
    this.players = [];
  }

  addPlayer(playerId) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id === playerId) {
        return i + 1;
      }
    }
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

    const i = selectedCards[0];
    const name = player.hand[i];

    const j = tokenType.findIndex(t => t === name);
    const purchasedTokens = this.tokens[j]
      .slice(-selectedCards.length);
    const hiddenTokens = this.getHiddenTokens(selectedCards.length);
    const tokens = purchasedTokens.concat(hiddenTokens);

    player.sellCards(selectedCards);
    player.addPoints(tokens.reduce((acc, t) => acc += t));
    this.tokens[j] = this.tokens[j].slice(0, -selectedCards.length);

    this.turn++;

    return {
      name,
      num: selectedCards.length
    }
  }

  tradeCards(playerId, selectedMarket, selectedHand) {
    let takenCards = []
    const _market = Object.assign({}, this.market);
    selectedMarket.sort().reverse().forEach(i => {
      takenCards.push(_market[i]);
      this.market.splice(i, 1);
    })

    let player = this.getPlayer(playerId);
    const givenCards = player.tradeCards(selectedHand, takenCards);
    givenCards.forEach(c => {
      this.market.push(c);
    })

    const n = MARKET_SIZE - this.market.length
    if (n > 0) {
      this.market = this.market.concat(this.deck.deal(n));
    }
    this.turn++;

    return {
      taken: takenCards,
      given: givenCards 
    }
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

    let numEmptyTokens = this.tokens.reduce((acc, t) => {
      acc += (t.length === 0) ? 1 : 0;
    })
    if (numEmptyTokens >= 3) {
      return true;
    }
    return false;
  }

  getHiddenTokens(n) {
    let value = undefined;
    if (n > 5) {
      value = this.hiddenTokens[2].pop();
    } else if (n === 4) {
      value = this.hiddenTokens[1].pop();
    } else if (n === 3) {
      value = this.hiddenTokens[0].pop();
    }
    if (value === undefined) {
      return 0; 
    }
    return value;
  }
}

export default Game;
