import http from 'http';

import Deck from './Deck';
import Game from './Game';

const PATH = '/';
var games = new Map();

const server = http.createServer();
const io = require('socket.io')(server, {
  path: PATH,
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
})

server.listen(3030);
console.log('Starting websocket server on', server.address(), PATH);

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
      const msg = "Player " + socket.id + ' joined the game';
      logMessage(io, id, msg);
    };
  })

  socket.on('SELL_CARDS', (data) => {
    let game = games.get(data.gameId);
    const sale = game.sellCards(socket.id, data.selectedCards);
    updatePlayers(io, game);
    logSale(io, socket.id, data.gameId, sale.name, sale.num);
  });

  socket.on('TAKE_CARDS', (data) => {
    let game = games.get(data.gameId);
    const trade = game.tradeCards(socket.id,
      data.selectedMarket,
      data.selectedHand);
    updatePlayers(io, game);
    logTrade(io, socket.id, data.gameId, trade.taken, trade.given);
  });
})

function logSale(io, playerId, gameId, name, num) {
  const msg = 'Player ' + playerId + ' sold ' + num + ' ' + name;
  console.log(msg);
  logMessage(io, gameId, msg);
}

function logTrade(io, playerId, gameId, taken, given) {
  let msg = 'Player ' + playerId + ' ';
  if (given.length === 0 && taken.length === 1) {
    msg += 'took a ' + taken[0];
  } else if (given.length === 0) {
    msg += 'took all the acorns';
  } else {
    msg += 'traded ' + given.join(",") + ' for ' + taken.join(","); 
  }
  console.log(msg);
  logMessage(io, gameId, msg);
}

function logMessage(io, gameId, msg) {
  io.to(gameId).emit('LOG', {
    msg 
  });
}

function generateClientState(game, playerId) {
  const player = game.getPlayer(playerId);
  const yourTurn = game.isPlayerTurn(playerId);
  const gameOver = game.isGameOver();

  return {
    // game state
    gameId: game.id,
    tokens: game.tokens,
    yourTurn: yourTurn,
    gameOver: gameOver,
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

