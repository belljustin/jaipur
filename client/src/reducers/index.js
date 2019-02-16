import {initialState as gameState, game} from './game';
import {initialState as cardState, cards} from './cards';
import {LIST_GAMES} from '../actions/websockets';

const initialState = {
  games: [],
  game: gameState,
  cards: cardState
}

function reducer(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }

  if (action.type === LIST_GAMES) {
    return Object.assign(state, {
      games: action.games
    })
  }

  return {
    games: state.games,
    game: game(state.game, action),
    cards: cards(state.cards, action)
  }
}

export default reducer;
