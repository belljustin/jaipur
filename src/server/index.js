const http = require('http');

const Deck = require('./Deck.js');

const PATH = '/test';
const MARKET_SIZE = 5;
const INIT_HAND_SIZE = 5;

var games = new Map();

class Game {
  constructor() {
    this.turn = 0;
    this.deck = new Deck();
    this.market = this.deck.deal(MARKET_SIZE);
    this.hands = [
      this.deck.deal(INIT_HAND_SIZE),
      this.deck.deal(INIT_HAND_SIZE)
    ];
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
})

function addGame(id) {
  game = new Game();
  games.set(id, game);
  io.emit('LIST_GAMES', {
    games: Array.from(games.keys())
  })
  return game;
}


function joinGame(socket, id) {
  let playerState = {}

  let game = games.get(id);
  if (game === undefined) {
    game = addGame(id);
    playerState = {
      market: game.market,
      hand: game.hands[0],
      yourTurn: true
    }
    console.log('Player 1 started game ' + id)
  } else {
    playerState = {
      market: game.market,
      hand: game.hands[1],
      yourTurn: (game.turn % 2 === 1)
    }

    console.log('Player 2 joined game ' + id)
  }

  socket.emit('START_GAME', playerState)
}
