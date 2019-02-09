const http = require('http');

const Deck = require('./Deck.js');

const PATH = '/test';
const MARKET_SIZE = 5;
const INIT_HAND_SIZE = 5;

class Game {
  constructor(id) {
    this.id = id;
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
  
  let game = new Game(1);
  socket.emit('START_GAME', {
    market: game.market,
    hand: game.hands[0],
    yourTurn: true
  })
})
