import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import "../style/MessageInput.css"; // We'll define this below


const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset height to auto to recalculate
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = `${scrollHeight}px`; // Adjust height based on content
        }
    }, [message]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);
        try {
            // Mock API call
            await new Promise((resolve) => setTimeout(resolve, 500));
            onSendMessage(message);
        } catch (error) {
            console.error("Error sending message", error);
        } finally {
            setLoading(false);
            setMessage("");
            if (textareaRef.current) {
                textareaRef.current.style.height = "40px"; // Reset height after sending
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="message-input">
            <div className="input-container">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Type your message..."
                    className="message-textarea"
                    rows={1}
                />
                {isFocused && (
                    <div className="hint">Press Enter to send, Shift+Enter for new line</div>
                )}
            </div>

            <button
                type="submit"
                className={`send-button ${!message.trim() || loading ? "disabled" : ""}`}
                disabled={!message.trim() || loading}
            >
                {loading ? (
                    <div className="loader"></div>
                ) : (
                    <Send className="send-icon" />
                )}
            </button>
        </form>
    );
};

export default MessageInput;