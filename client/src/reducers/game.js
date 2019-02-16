import {
  UPDATE_GAME,
  LOG
} from '../actions/websockets'

export const initialState = {
  gameId: null,
  tokenTypes: [
    'broccoli',
    'bellpepper',
    'carrot',
    'apple',
    'banana',
    'grape'],
  tokens: new Array(6).fill([]),
  yourTurn: false,
  gameOver: false,
  logs: [],
  points: 0,
}

export function game(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  switch (action.type) {
    case UPDATE_GAME:
      return Object.assign({}, state, {
        gameId: action.gameId,
        tokens: action.tokens,
        yourTurn: action.yourTurn,
        gameOver: action.gameOver,
        points: action.points
      })
    case LOG:
      const logs = new Array(action.msg)
        .concat(state.logs.slice(0, 5))
      return Object.assign({}, state, {logs});
    default:
      return state
  }
}
