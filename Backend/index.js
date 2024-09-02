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

// socket connection

io.on('connection',(socket)=>{
    console.log("Test Connection Established");
})

//server port

server.listen(8080,()=>{
    console.log('Listning on port 8080');
})