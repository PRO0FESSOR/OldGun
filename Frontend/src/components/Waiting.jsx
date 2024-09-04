import React , {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

//import of socket client
import io from 'socket.io-client';

// waiting component initialised
const Waiting = () => {

  //Set up the connection and other socket listeners on component mount
  useEffect(() => {
    const socket = io('http://localhost:8080');

    // to check connection is established
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Emit join game event
    socket.emit('joinGame');

    // events for joining a room 

    // Listen for room join confirmation
    socket.on('joinedRoom', ({ roomId, playerId }) => {
      console.log(`Joined room: ${roomId} as ${playerId}`);
    });

    // Listen for game start event
    socket.on('startGame', (roomId) => {
      console.log(`Game started in room: ${roomId}`);

      setTimeout(() => {
        console.log("game start in 5 seconds");
        // Redirect to the playground
        navigate(`/playground/${roomId}`);
      }, 5000);
      
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const navigate = useNavigate();

  const handleCancel = () => {
    // Logic to handle cancel and return to homepage
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Waiting for another player to join...</h1>
      <button
        className="px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </div>
  )
}

export default Waiting