import io from 'socket.io-client';

import {
  START_GAME,
  startGame
} from './actions';

class SocketClient {
  constructor(url, path, dispatch) {
    this.socket = io(url, {
      path: path 
    })
    this.dispatch = dispatch

    this.socket.on(START_GAME, (data) => {
      let action = startGame(data.market, data.hand, data.yourTurn)
      dispatch(action);
    })
  }

  joinGame(id) {
    this.socket.emit('JOIN', id);
  }
}

export default SocketClient;
