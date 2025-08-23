import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Waiting = () => {

    const {roomId} = useParams();
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
