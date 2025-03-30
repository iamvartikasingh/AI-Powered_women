import React, { useState } from 'react';
import '../App.css';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

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
            <p className="chatbot-intro">
              Got a challenge on your plate? Ask Ms. Mentor — your wise, witty guide to real-world
              solutions, tailored for women who get things done.
            </p>
            <div className="chatbot-response">
              How can Ms. Mentor help you today?
            </div>
          </div>

          <div className="chatbot-footer">
            <input
              type="text"
              placeholder="Type your question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="send-button">➤</button>
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