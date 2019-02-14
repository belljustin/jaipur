import { 
  START_GAME,
} from '../actions'

import {
  UPDATE_GAME,
} from '../actions/websockets'

export const initialState = {
  gameId: null,
  tokenTypes: ['red', 'gold', 'silver', 'pink', 'green', 'brown'],
  tokens: new Array(6).fill([]),
  yourTurn: false,
  points: 0,
}

export function game(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  switch (action.type) {
    case START_GAME:
      return Object.assign({}, state, {
        gameId: action.gameId,

        tokens: action.tokens,
        yourTurn: action.yourTurn
      });
    case UPDATE_GAME:
      return Object.assign({}, state, {
        tokens: action.tokens,
        yourTurn: action.yourTurn,
        points: action.score
      })
    default:
      return state
  }
}
