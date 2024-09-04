// import of express httpserver socket.io
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// initialisation

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: '*', //adjust according to the port
        methods: ['GET', 'POST'],
    }
})

// definitions 

let rooms = {}; // To keep track of rooms and the players in them

// socket connection

io.on('connection',(socket)=>{
    console.log('A user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    //joingame code 

    let roomId = null; //roomid initialization

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
})

//server port

server.listen(8080,()=>{
    console.log('Listning on port 8080');
})