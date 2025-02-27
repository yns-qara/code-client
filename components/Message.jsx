import { useState, useEffect, useRef } from "react";
import { sendMessageToChatbot } from "../api/api"; // Import API function
import { Avatar } from "./Avatar";
import "../style/message.css";

export function MessageList() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const animatedMessages = useRef(new Set());

    // Send message to chatbot
    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const newMessage = {
            id: Date.now(),
            sender: "user",
            content: inputMessage,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, newMessage]); // Add user message
        setInputMessage("");
        setIsLoading(true);

        try {
            const response = await sendMessageToChatbot(inputMessage);
            const botMessage = {
                id: Date.now() + 1,
                sender: "bot",
                content: response.reply || "No response",
                timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="message-list">
                {messages.map((message) => (
                    <Message key={message.id} message={message} isNew={!animatedMessages.current.has(message.id)} />
                ))}
            </div>

            <div className="message-input">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message..."
                    disabled={isLoading}
                />
                <button onClick={handleSendMessage} disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send"}
                </button>
            </div>
        </div>
    );
}

export function Message({ message, isNew }) {
    const isUser = message.sender === "user";
    const [displayedText, setDisplayedText] = useState(isNew ? "" : message.content);
    const animatedMessages = useRef(new Set());

    useEffect(() => {
        if (!isNew || animatedMessages.current.has(message.id)) return;
        animatedMessages.current.add(message.id);
        setDisplayedText("");

        let index = 0;
        const typingSpeed = 50;

        const interval = setInterval(() => {
            if (index < message.content.length) {
                setDisplayedText((prev) => prev + message.content[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, [message, isNew]);

    return (
        <div className={`message-container ${isUser ? "message-user" : "message-bot"}`}>
            <div className="message-wrapper">
                <Avatar sender={message.sender} />
                <div className="message-content">
                    <div className={`message-bubble ${isUser ? "user-bubble" : "bot-bubble"}`}>
                        <span className="typing-animation">{displayedText}</span>
                    </div>
                    <span className="message-timestamp">{formatTimestamp(message.timestamp)}</span>
                </div>
            </div>
        </div>
    );
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
