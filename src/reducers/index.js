import { 
  SELECT_HAND_CARD, 
  SELECT_MARKET_CARD,
} from '../actions'

import {
  START_GAME,
  LIST_GAMES,
  SELL_CARDS,
  TAKE_CARDS,
  UPDATE_GAME,
} from '../actions/websockets'

const initialState = {
  games: [],
  gameId: null,
  market: [],
  hand: [],
  yourTurn: false
}

// Card Type
// {
//    name:     string,
//    selected: boolean
// }

function jaipur(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  switch (action.type) {
    case START_GAME:
      return Object.assign({}, state,{
        gameId: action.gameId,
        market: action.market,
        hand: action.hand,
        yourTurn: action.yourTurn
      });
    case LIST_GAMES:
      return Object.assign({}, state, {
        games: action.games
      })
    case UPDATE_GAME:
      return Object.assign({}, state, {
        market: action.market,
        yourTurn: !state.yourTurn
      })
    case SELECT_HAND_CARD:
      return Object.assign({}, state, {
        hand: selectCard(state.hand, action.index)
      })
    case SELECT_MARKET_CARD:
      return Object.assign({}, state, {
        market: selectCard(state.market, action.index)
      })
    case TAKE_CARDS:
      return Object.assign({}, state,
        takeCards(state.market, state.hand))
    case SELL_CARDS:
      return Object.assign({}, state, sellCards(state.hand))
    default:
      return state
  }
}

function update(market, hand, yourTurn) {
  return {
    market: market.map(c => makeCard(c.name, false)),
    hand: hand.map(c => makeCard(c.name, false)),
    yourTurn: yourTurn
  };
}

function selectCard(cards, index) {
  return cards.map((c, i) => {
    const selected = (i === index ? !c.selected : c.selected);
    return makeCard(c.name, selected);
  });
}

function takeCards(market, hand) {
  const _market = split(market, (m) => m.selected);
  const _hand = split(hand, (h) => h.selected);
  return {
    market: _market.unsplit.concat(_hand.split),
    hand: _hand.unsplit.concat(_market.split),
  }
}

function sellCards(hand) {
  return {
    hand: hand.filter((h) => !h.selected) 
  }
}

// Returns an object, res, where all items of the collection that
// fulfill the splitter are placed in the res.split array. The other 
// items are placed in the res.unsplit array.
function split(collection, splitter) {
  return collection.reduce((acc, e) => {
    if (splitter(e)) {
      return {
        ...acc,
        'split': [...acc.split, e]
      }
    } else {
      return {
        ...acc,
        'unsplit': [...acc.unsplit, e]
      }
    }
  }, {'unsplit': [], 'split': []});
}

function makeCard(name, selected) {
  return {name, selected}
}

export default jaipur;
