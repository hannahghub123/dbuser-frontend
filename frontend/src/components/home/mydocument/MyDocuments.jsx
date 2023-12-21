import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const MyDocuments = () => {
    const [ws, setWs] = useState(null);

    useEffect(() => {
        try {
            const socket = new W3CWebSocket(`ws://127.0.0.1:8000/ws/documents/`);
            console.log(socket,"////////////http://127.0.0.1:8000/");
            socket.onopen = () => {
                console.log('WebSocket connected');
            };
    
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                // Handle real-time updates received from the server
                console.log('Received:', data);
            };
    
            socket.onclose = () => {
                console.log('WebSocket closed');
            };
    
            setWs(socket);
        } catch (error) {
            console.error('Error creating WebSocket:', error);
        }
    }, []);
     // Empty dependency array ensures the effect runs once after the initial render
  

    const sendWebSocketMessage = (message) => {
        // Send a message to the WebSocket server
        ws.send(JSON.stringify({ message }));
    };

    return (
        <div>
            <h1>My Documents</h1>
            {/* Your document display logic goes here */}
            <button onClick={() => sendWebSocketMessage('Hello from client')}>
                Send WebSocket Message
            </button>
        </div>
    );
};

export default MyDocuments;
