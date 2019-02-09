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
      this.dispatch(action);
    })
  }

  emitAction(actionCreator) {
    return (...args) => {
      const result = actionCreator.apply(this, args)
      this.socket.emit(result.type, {
        ...result
      })
      return result
    }
  }
}

export default SocketClient;
