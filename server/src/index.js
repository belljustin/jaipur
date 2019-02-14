const http = require('http');

import Deck from './Deck';

const PATH = '/jaipur';
const MARKET_SIZE = 5;
const INIT_HAND_SIZE = 5;

var games = new Map();

class Game {
  constructor(id) {
    this.id = id;
    this.turn = 0;
    this.deck = new Deck();
    this.market = this.deck.deal(MARKET_SIZE);
    this.hands = [
      this.deck.deal(INIT_HAND_SIZE),
      this.deck.deal(INIT_HAND_SIZE),
    ];
    this.tokenTypes = ['red','gold','silver','pink','green','brown'];
    this.tokens = [
      [5, 5, 5, 7, 7],
      [5, 5, 5, 6, 6],
      [5, 5, 5, 5, 5],
      [1, 1, 2, 2, 3, 3, 5],
      [1, 1, 2, 2, 3, 3, 5],
      [1, 1, 1, 1, 1, 2, 3, 4]
    ];
    this.scores = [];
  }

  getPlayerState(playerId) {
    const i = this.scores.findIndex(s => s.id === playerId);
    return {
      gameId: this.id,
      market: this.market,
			hand: this.hands[i],
      tokens: this.tokens,
      score: this.scores[i].value,
      yourTurn: this.turn % 2 === i,
    };
  }

  addPlayer(playerId) {
    this.scores.push({
      id: playerId,
      value: 0
    });
    return this.getPlayerState(playerId);
  }

  setPlayerPoints(playerId, points) {
    const i = this.scores.findIndex(s => s.id === playerId);
    this.scores[i].value = points;
  }
}

const server = http.createServer();
const io = require('socket.io')(server, {
  path: PATH,
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
})

server.listen(3001);
console.log('Started websocket server on', server.address(), PATH);

io.on('connection', function(socket) {
  console.log('client connected');
  socket.emit('LIST_GAMES', {
    games: Array.from(games.keys())
  })

  socket.on('LIST_GAMES', () => {
    socket.emit('LIST_GAMES', {
      games: Array.from(games.keys())
    })
  })

  socket.on('JOIN', (id) => {
    socket.join(id);
    joinGame(socket, id);
  })

  socket.on('END_TURN', (data) => {
    endTurn(io, socket.id, data.gameId, data.market, data.tokens, data.points);
  })
})

function addGame(id) {
  game = new Game(id);
  games.set(id, game);
  io.emit('LIST_GAMES', {
    games: Array.from(games.keys())
  })
  return game;
}


function joinGame(socket, id) {
  let playerState = {};

  let game = games.get(id);
  if (game === undefined) {
    game = addGame(id);
    playerState = game.addPlayer(socket.id);
    console.log('Player 1 started game ' + id)
  } else {
    playerState = game.addPlayer(socket.id);
    console.log('Player 2 joined game ' + id)
  }
	
  socket.emit('START_GAME', playerState)
}

function endTurn(io, playerId, id, market, tokens, points) {
  let game = games.get(id);

  game.tokens = tokens;
  const n = MARKET_SIZE - market.length;
  if (n > 0) {
    game.market = market.concat(game.deck.deal(n))
  }
  game.turn++;
  game.setPlayerPoints(playerId, points);

  for (score of game.scores) {
    playerState = game.getPlayerState(score.id)
    io.to(`${score.id}`).emit('UPDATE_GAME', playerState); 
  }
}
