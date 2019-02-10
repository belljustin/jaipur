export const SELECT_MARKET_CARD = 'SELECT_MARKET_CARD'
export const SELECT_HAND_CARD = 'SELECT_HAND_CARD'
export const TAKE_CARDS = 'TAKE_CARDS'
export const SELL_CARDS = 'SELL_CARDS'

export function selectMarketCard(i) {
  return {
    type: SELECT_MARKET_CARD,
    index: i
  }
}

export function selectHandCard(i) {
  return {
    type: SELECT_HAND_CARD,
    index: i
  }
}

export function takeCards() {
  return {
    type: TAKE_CARDS
  }
}

export function sellCards() {
  return {
    type: SELL_CARDS 
  }
}

export function sellCardsCreator(dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(sellCards());
    resolve();
  })
}

export const START_GAME = 'START_GAME'
export const LIST_GAMES = 'LIST_GAMES'
export const UPDATE_GAME = 'UPDATE_GAME'

export function startGame(market, hand, yourTurn) {
  return {
    type: START_GAME,
    market,
    hand,
    yourTurn
  }
}

export function listGames(games) {
  return {
    type: LIST_GAMES,
    games
  }
}

export function updateGame(market) {
  return {
    type: UPDATE_GAME,
    market
  }
}
