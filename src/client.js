import io from 'socket.io-client';

import {
  START_GAME,
  startGame,
  LIST_GAMES,
  listGames,
  UPDATE_GAME,
  updateGame,
} from './actions';

class SocketClient {
  constructor(url, path, dispatch) {
    this.socket = io(url, {
      path: path 
    })
    this.dispatch = dispatch

    this.socket.on(START_GAME, (data) => {
      dispatch(startGame(data.market, data.hand, data.yourTurn));
    })

    this.socket.on(LIST_GAMES, (data) => {
      dispatch(listGames(data.games));
    })

    this.socket.on(UPDATE_GAME, (data) => {
      dispatch(updateGame(data.market));
    })
  }

  joinGame(id) {
    this.socket.emit('JOIN', id);
  }

  listGames() {
    this.socket.emit(LIST_GAMES);
  }

  endTurn(hand, market) {
    this.socket.emit('END_TURN', {
      hand,
      market
    });
  }
}

export default SocketClient;
