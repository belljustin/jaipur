import io from 'socket.io-client';

const uri = 'localhost:3001';
const path = '/jaipur';

const socket = io(uri, {
  path: path
})

export const START_GAME = 'START_GAME';
export const LIST_GAMES = 'LIST_GAMES';
export const UPDATE_GAME = 'UPDATE_GAME';

export const SELL_CARDS = 'SELL_CARDS';
export const TAKE_CARDS = 'TAKE_CARDS';
export const END_TURN = 'END_TURN';
export const JOIN = 'JOIN';

const messageTypes = [
  START_GAME,
  LIST_GAMES,
  UPDATE_GAME
];

export const init = (store) => {
  messageTypes.forEach(type => socket.on(type, (payload) =>
    store.dispatch({type, ...payload})
  ));
};

export const emit = (type, payload) => socket.emit(type, payload);

export function listGames() {
  emit(LIST_GAMES, {});
}

export function joinGame(id) {
  emit(JOIN, id);
}

export function sellCards() {
  return (dispatch, getState, {emit}) => {
    new Promise((resolve, reject) => {
      dispatch({
        type: SELL_CARDS
      });
      resolve();
    }).then(() => endTurn(getState().gameId, getState().market));
  };
}

export function takeCards() {
  return (dispatch, getState, {emit}) => {
    new Promise((resolve, reject) => {
      dispatch({
        type: TAKE_CARDS
      });
      resolve();
    }).then(() => endTurn(getState().gameId, getState().market));
  };
}

function endTurn(id, market) {
  emit(END_TURN, {
    id,
    market
  });
}
