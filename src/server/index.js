const Deck = require('./Deck.js');

const server = require('http').createServer();
const path = '/test';

const marketSize = 5;
const initHandSize = 5;

const io = require('socket.io')(server, {
  path: '/test',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

class Game {
  constructor(id) {
    this.id = id;
    this.turn = 0;
    this.deck = new Deck();
    this.market = this.deck.deal(marketSize);
    this.players = new Array(0);
  }

  nextTurn(playerState) {
    if (playerState.market.length < marketSize) {
      const n = marketSize - playerState.market.length;
      this.market = playerState.market
        .concat(this.deck.deal(n));
    } else {
      this.market = playerState.market;
    }

    this.getCurrentPlayer().hand = playerState.hand;
    this.turn = this.turn + 1;

    return {
      market: this.market,
      currentPlayerId: this.getCurrentPlayer().id, 
    }
  }

  addPlayer(id) {
    if (this.players.length >= 2) {
      throw Error("too many players");
    }

    let hand = this.deck.deal(initHandSize);
    this.players.push({
      id: id,
      hand: hand,
    });

    return this.getPlayerState(id);
  }

  getPlayerState(id) {
    let currentPlayerId = this.getCurrentPlayer().id;
    let player = this.players.find(p => p.id === id);
    return {
      market: this.market,
      hand: player.hand,
      currentPlayerId: currentPlayerId,
    };
  }

  getCurrentPlayer() {
    const i = this.turn % 2;
    return this.players[i];
  }
}

var Games = new Map();

server.listen(3001);
console.log('Started websocket server on', server.address(), path);

io.on('connection', function(socket) {
  console.log('client connected');

  socket.on('disconnect', (reason) => {
    console.log("client disconnected");
  });

  socket.on('startGame', (msg) => {
    console.log('recieved startGame msg from ' + msg.playerId);
    game = Games.get(msg.gameId);
    if (game === undefined) {
      game = new Game(msg.gameId);
    }

    let state = undefined;
    try {
      state = game.addPlayer(msg.playerId);
    } catch (error) {
      console.log(error.message);
      return;
    }
    socket.join(msg.gameId);
    Games.set(msg.gameId, game);

    socket.emit('startGame', state);
  })

  socket.on('endTurn', (msg) => {
    console.log('received endTurn msg');
    game = Games.get(msg.gameId);
    if (game === undefined) {
      throw Error("Game " + msg.gameId + " does not exist");
    }

    gameUpdate = game.nextTurn(msg.playerState);
    io.to(msg.gameId).emit('turnEnd', gameUpdate);
  });
});
