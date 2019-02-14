const http = require('http');

import Deck from './Deck';
import Game from './Game';

const PATH = '/jaipur';
var games = new Map();

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
    if (joinGame(socket, id) === 0) {
      socket.join(id);
    };
  })

  socket.on('SELL_CARDS', (data) => {
    let game = games.get(data.gameId);
    game.sellCards(socket.id, new Set(data.selectedCards));
    updatePlayers(io, game);
  });

  socket.on('TAKE_CARDS', (data) => {
    let game = games.get(data.gameId);
    game.tradeCards(socket.id,
      new Set(data.selectedMarket),
      new Set(data.selectedHand));
    updatePlayers(io, game);
  });
})

function generateClientState(game, playerId) {
  const player = game.getPlayer(playerId);
  const yourTurn = game.isPlayerTurn(playerId);

  return {
    // game state
    gameId: game.id,
    tokens: game.tokens,
    yourTurn: yourTurn,
    points: player.points,

    // card state
    hand: player.hand,
    handSelected: new Set(),
    market: game.market,
    marketSelected: new Set()
  }
}

function joinGame(socket, id) {
  let game = games.get(id);
  if (game === undefined) {
    game = addGame(id);
  }

  const playerNum = game.addPlayer(socket.id);
  if (playerNum === -1) {
    console.log("Too many players");
    return -1;
  }
	
  console.log("Player " + playerNum + " has joined game " + id);
  const clientState = generateClientState(game, socket.id);
  socket.emit('UPDATE_GAME', clientState)
  return 0;
}

function addGame(id) {
  let game = new Game(id);
  games.set(id, game);
  io.emit('LIST_GAMES', {
    games: Array.from(games.keys())
  })
  return game;
}

function updatePlayers(io, game) {
  for (let player of game.players) {
    let clientState = generateClientState(game, player.id);
    io.to(`${player.id}`).emit('UPDATE_GAME', clientState);
  }
}

