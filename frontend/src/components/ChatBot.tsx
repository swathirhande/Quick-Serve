import React, { useState } from 'react';
import chatbotIcon from '../assets/chatbot1.png';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isMinimized, setIsMinimized] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const hardcodedResponses: { [key: string]: string } = {
    'How do I place an order?': 'To place an order, please login, search for a restaurant or city, select items from the menu, and click Go to checkout.',
    'How can I update my address?': 'To update your address, login and go to User Profile to edit your address and click Submit.',
    'How do I contact customer support?': 'You can contact customer support through the Help section or call us at (123) 456-7890.',
  };
  
  const handleHardcodedClick = (question: string) => {
    setMessages([...messages, `User: ${question}`, `Bot: ${hardcodedResponses[question]}`]);
  };

  const handleToggle = () => {
    console.log(isOpen);
    setIsMinimized(!isMinimized);
    if (isMinimized) setIsOpen(true);
  };

  const handleUserInput = async () => {
    setMessages([...messages, `User: ${userInput}`]);
    console.log("The question sent to backend is:",JSON.stringify({ question: userInput }));
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: userInput }),
    });
    const data = await response.json();
    setMessages([...messages, `User: ${userInput}`, `Bot: ${data.answer}`]);
    setUserInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleUserInput();
    }
  };

    return (
        <div>
          {isMinimized ? (
            <div
              onClick={handleToggle}
              className="fixed bottom-4 right-4 flex items-center justify-center bg-orange-500 text-white rounded-md p-3 cursor-pointer shadow-lg"
            >
              <img src={chatbotIcon} alt="ChatBot Icon" className="w-6 h-6 mr-2" />
              <span>ChatBot</span>
            </div>
          ) : (
            <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80">
              <h3 className="text-center font-bold text-xl mb-3">Chat with us</h3>
              
              <div className="space-y-2 mb-3">
                <button
                  onClick={() => handleHardcodedClick('How do I place an order?')}
                  className="btn w-full p-1 border-2 border-orange-500 bg-orange-500 text-white rounded-md hover:bg-orange-500 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  
                >
                  How do I place an order?
                </button>
                <button
                  onClick={() => handleHardcodedClick('How can I update my address?')}
                  className="btn w-full p-1 border-2 border-orange-500 bg-orange-500 text-white rounded-md hover:bg-orange-500 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  How can I update my address?
                </button>
                <button
                  onClick={() => handleHardcodedClick('How do I contact customer support?')}
                  className="btn w-full p-1 border-2 border-orange-500 bg-orange-500 text-white rounded-md hover:bg-orange-500 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  How do I contact customer support?
                </button>
              </div>
              <div className="mb-2 space-y-1 max-h-60 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div key={index} className="text-sm">{msg}</div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="w-full p-2 border rounded-l-md"
                  placeholder="Ask a question..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleUserInput}
                  className="bg-orange-500 text-white p-2 rounded-r-md"
                >
                  Send
                </button>
              </div>
              <button
                onClick={handleToggle}
                className="absolute top-2 right-2 text-lg font-bold text-red-500"
              >
                &times;
              </button>
            </div>
          )}
        </div>
      );
    };
    

export default ChatBot;
