import { useState, useRef, useEffect } from "react";
import MessageInput from "../components/MessageInput";
import { Message } from "../components/Message";
import "../style/chat.css";

import Profile from "../components/Profile"

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (content) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum dolorum recusandae optio commodi. Quos quisquam reprehenderit inventore autem natus modi labore corporis doloremque. Perferendis, sapiente eius et quibusdam sunt dolor.: "${content}"`,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };


  const [submitt, setSubmitt] = useState(false)
  return (
    <>
      <Profile
        setSubmitt={setSubmitt}
      />
      {submitt &&
        <div className="chat-container">
          <header className="chat-header">
            <h1 className="chat-title">Chat Application</h1>
          </header>

          <main className="chat-main">
            <div className="chat-box">
              <div className="chat-messages">
                {messages.map((message) => (
                  <Message key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </div>
              <MessageInput onSendMessage={handleSendMessage} />
            </div>
          </main>
        </div>
      }

    </>
  );
}
