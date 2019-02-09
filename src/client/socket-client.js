import io from 'socket.io-client';

class SocketClient {
  constructor(url, path) {
    this.socket = io(url, {
      path: path 
    });
  }

  endTurn(gameId, playerState) {
    this.socket.emit('endTurn', {
      gameId: gameId,
      playerState: playerState,
    }) 
  }

  startGame(playerId, gameId) {
    this.socket.emit('startGame', {
      playerId: playerId,
      gameId: gameId,
    });
  }

  register(event, handler) {
    this.socket.on(event, handler);
    return this;
  }
}

export default SocketClient;
