const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust based on your React app's port
    methods: ['GET', 'POST'],
  },
});

let flag = 0;
let rooms = {}; // To keep track of rooms and the players in them
let NumberOfPlayers = 3;

io.on('connection', (socket) => {
  
  if(flag===0){
    socket.playerId = "player1";
    flag=1;
  }
  else{
    socket.playerId = "player2";
    flag = 0;
  }

  console.log('A user connected');
  console.log(socket.playerId);

  socket.emit('assignPlayerId', socket.playerId);
  socket.emit('numberofplayers',NumberOfPlayers );



  //joingame code 

  let roomId = null;


  socket.on('joinGame',()=>{

    console.log("inside joingame");

    //find an existing room with less than 2 players 
    for(let id in rooms){
      if(rooms[id].length < 2){
        roomId = id;
        break;
      }
    }

    //if no room found, create a new one
    if(!roomId){
      roomId = `room_${socket.id}`;
      console.log(roomId);
      rooms[roomId] = [];
    }

    //join the room
    socket.join(roomId);
    rooms[roomId].push(socket.id);

    console.log(`Player joined room: ${roomId}`);

    // Notify the client of the room they joined
    socket.emit('joinedRoom', { roomId, playerId: `player${rooms[roomId].length}` });

    // If the room is full, notify the players to start the game
    if (rooms[roomId].length === 2) {
      io.in(roomId).emit('startGame', roomId);
    }

     // Handle player disconnection
     socket.on('disconnect', () => {
      console.log(`Player disconnected from room: ${roomId}`);
      rooms[roomId] = rooms[roomId].filter(id => id !== socket.id);
      if (rooms[roomId].length === 0) {
        delete rooms[roomId];
      }

  })

});


  socket.on('playerMove', (data) => {
    console.log('Received playerMove:', data);
    socket.broadcast.emit('playerMove', data);
  });



  // Handle player disconnection
  // socket.on('disconnect', () => {
  //     console.log(`Player disconnected from room: ${roomId}`);
  //   rooms[roomId] = rooms[roomId].filter(id => id !== socket.id);
  //   if (rooms[roomId].length === 0) {
  //     delete rooms[roomId];
  //   }
  
});

server.listen(8080, () => {
  console.log('Listening on port 8080');
});
