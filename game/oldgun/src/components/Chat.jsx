import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const inputRef = useRef();
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const generateUserId = () => {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  };


  const [userId, setUserId] = useState(generateUserId());

  useEffect(() => {
    socketRef.current = io('http://localhost:8080');

    socketRef.current.on('connect', () => {
      console.log('Connected to server');
    });

    socketRef.current.on('message', (data) => {
      console.log(`Message from server: ${data.message}`);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    socketRef.current.emit('message', { userId, message: inputValue });
    inputRef.current.value = '';
  };

  return (
    <>
      <ul id="messages">
        {messages.map((msg, index) => (
          <li
            key={index}
            style={{
              textAlign: msg.userId === userId ? 'right' : 'left',
              backgroundColor: msg.userId === userId ? '#e0f7fa' : '#f1f1f1',
              margin: '10px 0',
              padding: '10px',
              borderRadius: '10px',
              maxWidth: '60%',
              alignSelf: msg.userId === userId ? 'flex-end' : 'flex-start'
            }}
          >
            {msg.message}
          </li>
        ))}
      </ul>
      <form id="form" onSubmit={handleSubmit}>
        <input id="input" ref={inputRef} /><button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Chat;
