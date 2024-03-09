import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://localhost:8000/ws/chat/room1/');

function ChatSection() {
 const [message, setMessage] = useState('');
 const [messages, setMessages] = useState([]);

 useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      setMessages(messages => [...messages, message.data]);
    };
 }, []);

 const sendMessage = () => {
    client.send(JSON.stringify({
      'message': message
    }));
    setMessage('');
 };

 return (
    <div className="App">
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
 );
}

export default ChatSection;
