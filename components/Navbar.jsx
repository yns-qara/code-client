import { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Import profile icon
import "../style/chat.css";

export default function Navbar({ onOpenProfile }) {
  return (
    <nav className="chat-navbar">
      <img src="/robot.ico" alt="Chat-bot" className="w-8 h-8" />
      <button className="profile-button" onClick={onOpenProfile}>
        <FaUserCircle size={28} />
      </button>
    </nav>
  );
}
