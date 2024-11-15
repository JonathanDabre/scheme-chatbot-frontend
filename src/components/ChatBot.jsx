import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiSendPlaneFill } from "react-icons/ri";
import { FiChevronDown } from 'react-icons/fi';

const ChatBot = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [selectedScheme, setSelectedScheme] = useState('');
    const [schemes, setSchemes] = useState([]);
    const [features, setFeatures] = useState([]);

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
        async function fetchFeatures(){
            try{
                const response = await axios.get('http://localhost:5000/api/features')
                setFeatures(response.data);
                console.log(features);
            }
            catch(error){
                console.log('Error Fetching features:', error);
            }
        }

        fetchSchemes();
        fetchFeatures();
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
        <div className="relative flex flex-col xl:h-[87vh] bg-gray-100  ">
            {/* Scheme selection dropdown */}
            <div className="absolute left-0 top-0 w-full flex justify-start bg-white p-4">
                <div className="relative">
                    <select
                        className="appearance-none bg-[#151B2F] text-white rounded-lg focus:outline-none px-4 py-2 font-semibold text-sm"
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
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <FiChevronDown className="text-white" />
                    </div>
                </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 pt-14 chat-container bg-white ">
                {chatHistory.map((chat, index) => (
                    <div
                        key={index}
                        className={`p-2 my-2 flex  text-sm rounded-lg ${
                            chat.sender === 'user' ? ' justify-end text-end ' : ' justify-start w-[95%] text-start'
                        }`}
                    >
                        <div className={`px-5 py-4 rounded-lg  ${chat.sender === 'user' ? 'bg-[#E6F2FE] w-fit':'bg-[#F0F4F9]'}`}>
                            {chat.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Box */}
            <div className="sticky bottom-0 bg-white p-4 ">
                <div className="flex items-center">
                    <input
                        type="text"
                        className="flex-1 bg-[#F4F4F4] border focus:outline-none border-gray-300 rounded-full py-[11px] text-sm px-4 mr-2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                    />
                    <button
                        className="bg-gradient-to-b from-[#014CD3] to-[#256FEF] text-white text-xl rounded-full px-3 py-3"
                        onClick={handleSend}
                    >
                        <RiSendPlaneFill />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
