import {
  START_GAME
} from './index'

export function startGame(market, hand, yourTurn) {
  return {
    type: START_GAME,
    market,
    hand
  }
}

export const SELECT_MARKET_CARD = 'SELECT_MARKET_CARD'
export function selectMarketCard(i) {
  return {
    type: SELECT_MARKET_CARD,
    index: i
  }
}

export const SELECT_HAND_CARD = 'SELECT_HAND_CARD'
export function selectHandCard(i) {
  return {
    type: SELECT_HAND_CARD,
    index: i
  }
}

