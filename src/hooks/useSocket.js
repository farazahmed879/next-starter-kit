import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const useSocket = () => {
    const [message, setMessage] = useState('');
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        // Connect to the socket.io server (Make sure to change the URL to your backend's URL)
        socket = io('http://localhost:8080');

        // Check for connection
        socket.on('connect', () => {
            console.log('Connected to socket server');
            setConnected(true);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
            setConnected(false);
        });

        // Example event listener
        socket.on('chat message', (msg) => {
            setMessage(msg);
        });

        return () => {
            // Clean up socket connection when the component unmounts
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    // Function to send messages to the server
    const sendMessage = (msg) => {
        if (socket && connected) {
            socket.emit('chat message', msg);
        }
    };

    return { message, connected, sendMessage };
};

export default useSocket;
