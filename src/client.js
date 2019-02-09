import io from 'socket.io-client';

import {
  START_GAME,
  startGame,
  LIST_GAMES,
  listGames,
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
  }

  joinGame(id) {
    this.socket.emit('JOIN', id);
  }

  listGames() {
    this.socket.emit(LIST_GAMES);
  }
}

export default SocketClient;
