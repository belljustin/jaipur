import {START_GAME} from '../actions';
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
    case START_GAME:
      return Object.assign({}, state, {
        hand: action.hand,
        market: action.market
      });
    case UPDATE_GAME:
      return Object.assign({}, state, {
        hand: action.hand,
        handSelected: [],
        market: action.market,
        marketSelected: []
      })
    case SELECT_HAND_CARD:
      return Object.assign({}, state, {
        handSelected: selectCard(state.handSelected, action.index)
      })
    case SELECT_MARKET_CARD:
      return Object.assign({}, state, {
        marketSelected: selectCard(state.market, action.index)
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
