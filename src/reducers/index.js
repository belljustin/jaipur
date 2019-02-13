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
  tokenTypes: ['red', 'gold', 'silver', 'pink', 'green', 'brown'],
  tokens: new Array(6).fill([]),
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
      return Object.assign({}, state, {
        gameId: action.gameId,
        market: action.market,
        hand: action.hand,
        tokens: action.tokens,
        yourTurn: action.yourTurn
      });
    case LIST_GAMES:
      return Object.assign({}, state, {
        games: action.games
      })
    case UPDATE_GAME:
      console.log(action);
      return Object.assign({}, state, {
        market: action.market,
        tokens: action.tokens,
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
      return Object.assign({}, state, sellCards(state.hand, state.tokenTypes, state.tokens))
    default:
      return state
  }
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

function sellCards(hand, tokenTypes, tokens) {
  const _hand = split(hand, h => h.selected)
  const name = _hand.split[0].name
  const i = tokenTypes.indexOf(name);

  const tokensTaken = tokens[i].slice(-_hand.split.length);
  const addedPoints = tokensTake.reduce((acc, t) => acc + t);

  const tokensLeft = tokens[i].slice(0, -_hand.split.length);
  const newTokens = tokens.map((t, idx) => idx === i ? tokensLeft : t);
  return {
    hand: _hand.unsplit,
    tokens: newTokens
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
