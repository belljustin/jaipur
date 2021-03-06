import io from 'socket.io-client';

const uri = process.env.REACT_APP_SOCKET_URI;
const path = process.env.REACT_APP_SOCKET_PATH;

const socket = io(uri, {
  path: path,
})

export const JOIN = 'JOIN';
export const LIST_GAMES = 'LIST_GAMES';
export const UPDATE_GAME = 'UPDATE_GAME';
export const LOG = 'LOG';

export const SELL_CARDS = 'SELL_CARDS';
export const TAKE_CARDS = 'TAKE_CARDS';

const messageTypes = [
  LIST_GAMES,
  UPDATE_GAME,
  LOG
];

export const init = (store) => {
  messageTypes.forEach(type => socket.on(type, (payload) => {
    console.log(type);
    store.dispatch({type, ...payload})
  }));
};

export const emit = (type, payload) => socket.emit(type, payload);

export function listGames() {
  emit(LIST_GAMES, {});
}

export function joinGame(id) {
  emit(JOIN, id);
}

export function sellCards(gameId, selectedCards) {
  const msg = {
    gameId,
    selectedCards: Array.from(selectedCards.values())
  }
  emit(SELL_CARDS, msg);
}

export function takeCards(gameId, selectedHand, selectedMarket) {
  const msg = {
    gameId,
    selectedHand: Array.from(selectedHand.values()),
    selectedMarket: Array.from(selectedMarket.values())
  }
  emit(TAKE_CARDS, msg)
}
