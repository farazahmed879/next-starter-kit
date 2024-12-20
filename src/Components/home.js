"use client"
import { useState } from 'react';
import useSocket from '../hooks/useSocket';

const SocketComponent = () => {
    const [input, setInput] = useState('');
    const { message, connected, sendMessage } = useSocket();

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = () => {
        if (input.trim()) {
            sendMessage(input);
            setInput(''); // Clear the input field
        }
    };

    return (
        <div>
            <h1>Socket.io with Next.js and Node.js</h1>
            <div>
                {connected ? (
                    <p>Connected to the server</p>
                ) : (
                    <p>Not connected</p>
                )}
            </div>
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type a message"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
            <div>
                <h2>Received Message:</h2>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default SocketComponent;