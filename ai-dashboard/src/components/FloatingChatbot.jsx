import React, { useState } from 'react';
import '../App.css';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newChat = [...chatHistory, { from: 'user', text: message }];
    setChatHistory(newChat);
    setMessage('');
    setIsLoading(true);

    try {
        const res = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
          });
      const data = await res.json();
      const botMessages = data.response || ["Sorry, I didn't understand that."];

      const updatedChat = [
        ...newChat,
        ...botMessages.map(text => ({ from: 'bot', text }))
      ];
      setChatHistory(updatedChat);
    } catch (error) {
      console.error('Error:', error);
      setChatHistory([
        ...newChat,
        { from: 'bot', text: 'Oops! Something went wrong. Please try again.' }
      ]);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="floating-chatbot-wrapper">
      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <div>
              <span className="dot-icon"></span> <strong>Ask Ms. Mentor</strong>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chatbot-body">
            <div className="chatbot-intro">
              Got a challenge on your plate? Ask Ms. Mentor — your wise, witty guide to real-world
              solutions, tailored for women who get things done.
            </div>

            <div className="chatbot-response">
              {chatHistory.map((chat, idx) => (
                <div key={idx} className={`chat-message ${chat.from}`}>
                  {chat.text}
                </div>
              ))}
              {isLoading && <div className="chat-message bot">Typing...</div>}
            </div>
          </div>

          <div className="chatbot-footer">
            <input
              type="text"
              placeholder="Type your question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="send-button" onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}

      <button className="chatbot-toggle-button" onClick={() => setIsOpen(true)}>
        💬 Ask Ms. Mentor
      </button>
    </div>
  );
};

export default FloatingChatbot;