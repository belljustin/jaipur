import {initialState as gameState, game} from './game';
import {initialState as cardState, cards} from './cards';

const initialState = {
  games: [],
  game: gameState,
  cards: cardState
}

function reducer(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }

  return {
    games: [],
    game: game(state.game, action),
    cards: cards(state.cards, action)
  }
}

export default reducer;
