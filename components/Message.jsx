import { useState, useEffect, useRef } from "react";
import { Avatar } from "./Avatar";
import "../style/message.css";

export function Message({ message, isNew }) {
    const isUser = message.sender === "user";
    const [displayedText, setDisplayedText] = useState(isNew ? "" : message.content);
    const animatedMessages = useRef(new Set()); // Tracks animated messages

    // the animation is not working as it should be but it is smooth none the less
    useEffect(() => {
        if (!isNew || animatedMessages.current.has(message.id)) return; // Skip animation if not new

        animatedMessages.current.add(message.id);
        setDisplayedText(""); // Start with an empty message

        let index = 0;
        const typingSpeed = 5000; // Change this value to adjust speed (lower = faster)

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

// Helper function to format timestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
