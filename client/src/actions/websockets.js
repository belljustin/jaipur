import io from 'socket.io-client';

const uri = 'localhost:3001';
const path = '/jaipur';

const socket = io(uri, {
  path: path
})

export const JOIN = 'JOIN';
export const LIST_GAMES = 'LIST_GAMES';
export const UPDATE_GAME = 'UPDATE_GAME';

export const SELL_CARDS = 'SELL_CARDS';
export const TAKE_CARDS = 'TAKE_CARDS';

const messageTypes = [
  LIST_GAMES,
  UPDATE_GAME
];

export const init = (store) => {
  messageTypes.forEach(type => socket.on(type, (payload) => {
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

export function sellCards(selectedCards) {
  emit(SELL_CARDS, selectedCards);
}

export function takeCards(selectedHand, selectedMarket) {
  emit(TAKE_CARDS, {
    selectedHand,
    selectedMarket
  })
}
