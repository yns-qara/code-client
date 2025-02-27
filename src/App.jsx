import { useState } from "react";
import Navbar from "../components/Navbar";
import { ProfileModal } from "../components/ProfileModal";
import MessageInput from "../components/MessageInput";
import { Message } from "../components/Message";
import { sendMessageToChatbot } from "../api/api";
import "../style/chat.css";

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await sendMessageToChatbot(content);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: response.reply || "I'm sorry, I didn't understand that.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), content: "Failed to get a response. Please try again.", sender: "bot", timestamp: new Date() }
      ]);
    }
  };

  return (
    <div className="chat-container">
      <Navbar onOpenProfile={() => setIsProfileOpen(true)} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      <main className="chat-main">
        <div className="chat-box">
          <div className="chat-messages">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </main>
    </div>
  );
}
