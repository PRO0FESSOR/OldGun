import React , {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import socket from '../socket';

//homepage initialised
const Homepage = () => {

  useEffect(() => {

    // to check connection is established
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Clean up the socket connection on component unmount
    return () => {
      // socket.disconnect();
      socket.off('connect');
    };
  }, []);


  //use of navigate
  const navigate = useNavigate(); 

  // function to navigate to waiting area
    const handleJoinGame = () => {
        console.log("inside handel join")
        socket.emit('joinGame');
        navigate('/waiting');
      }

  return (
    // basic component with a button
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Game</h1>
      <button
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
        onClick={handleJoinGame}
      >
        Start Game
      </button>
    </div>
  )
}

export default Homepage