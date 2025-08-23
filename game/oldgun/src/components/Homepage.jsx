// src/components/HomePage.jsx
import React , {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');


const HomePage = () => {

   // Set up the connection and other socket listeners on component mount
   useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Listen for room join confirmation
    socket.on('joinedRoom', ({ roomId, playerId }) => {
      console.log(`Joined room: ${roomId} as ${playerId}`);
      // Redirect to waiting page with room info
      navigate(`/waiting/${roomId}`);
    });

    // Listen for game start event
    socket.on('startGame', (roomId) => {
      console.log(`Game started in room: ${roomId}`);
      // Redirect to the playground
      navigate(`/playground/${roomId}`);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off('connect');
    };
  }, []);

  const navigate = useNavigate();
  
  const handleJoinGame = () => {

    console.log("inside handel join")

    // Emit join game event
    socket.emit('joinGame');

  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Game</h1>
      <button
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        onClick={handleJoinGame}
      >
        Start Game
      </button>
    </div>
  );
};

export default HomePage;
