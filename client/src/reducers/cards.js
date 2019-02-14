import {SELECT_MARKET_CARD, SELECT_HAND_CARD} from '../actions/cards';
import {UPDATE_GAME} from '../actions/websockets';

export const initialState = {
  hand: [],
  handSelected: new Set(),
  market: [],
  marketSelected: new Set()
};

export function cards(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case UPDATE_GAME:
      return Object.assign({}, state, {
        hand: action.hand,
        handSelected: new Set(),
        market: action.market,
        marketSelected: new Set()
      })
    case SELECT_HAND_CARD:
      return Object.assign({}, state, {
        handSelected: selectCard(state.handSelected, action.index)
      })
    case SELECT_MARKET_CARD:
      return Object.assign({}, state, {
        marketSelected: selectCard(state.marketSelected, action.index)
      })
    default:
      return state;
  }
}

function selectCard(handSelected, index) {
  let _handSelected = new Set(handSelected);
  if (handSelected.has(index)) {
    _handSelected.delete(index);
  } else {
    _handSelected.add(index);
  }
  return _handSelected;
}
