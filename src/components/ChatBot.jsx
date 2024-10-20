import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatBot = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [selectedScheme, setSelectedScheme] = useState('');
    const [schemes, setSchemes] = useState([]);

    // Fetch schemes when component mounts
    useEffect(() => {
        async function fetchSchemes() {
            try {
                const response = await axios.get('http://localhost:5000/api/schemes');
                setSchemes(response.data);
            } catch (error) {
                console.error('Error fetching schemes:', error);
            }
        }

        fetchSchemes();
    }, []);

    const handleSend = async () => {
        if (!message.trim()) return;

        const newMessage = { text: message, sender: 'user' };
        setChatHistory([...chatHistory, newMessage]);

        try {
            const response = await axios.post('http://localhost:5000/api/chat/ask', {
                query: message,
                schemeId: selectedScheme
            });

            const botMessage = { text: response.data.answer, sender: 'bot' };
            setChatHistory(prevHistory => [...prevHistory, botMessage]);
        } catch (error) {
            console.error('Error fetching response:', error);
            const botMessage = { text: 'An error occurred while fetching the response.', sender: 'bot' };
            setChatHistory(prevHistory => [...prevHistory, botMessage]);
        }

        setMessage('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    const handleSchemeChange = (e) => {
        setSelectedScheme(e.target.value);
        setChatHistory([]); // Clear chat history when a new scheme is selected
    };

    // Auto-scroll to the bottom of chat history
    useEffect(() => {
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Scheme selection dropdown */}
            <div className="flex justify-end p-4 bg-white shadow-md">
                <select
                    className="border border-gray-300 rounded-md p-2"
                    value={selectedScheme}
                    onChange={handleSchemeChange}
                >
                    <option value="">Select Scheme</option>
                    {schemes.map((scheme) => (
                        <option key={scheme.id} value={scheme.id}>
                            {scheme.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 chat-container">
                {chatHistory.map((chat, index) => (
                    <div
                        key={index}
                        className={`p-2 my-2 rounded-lg ${
                            chat.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-green-100 self-start'
                        }`}
                    >
                        {chat.text}
                    </div>
                ))}
            </div>

            {/* Input Box */}
            <div className="sticky bottom-0 bg-white p-4 shadow-md">
                <div className="flex items-center">
                    <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-md p-2 mr-2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                    />
                    <button
                        className="bg-blue-500 text-white rounded-md px-4 py-2"
                        onClick={handleSend}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
