import { X } from "lucide-react"; // Import close icon
import { useState, useEffect } from "react";
import "../style/profile.css";
import { uploadProfile } from "../api/api";

export function ProfileModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => {
        document.querySelector(".modal-overlay").classList.add("show");
      }, 10);
    } else {
      document.querySelector(".modal-overlay")?.classList.remove("show");
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await uploadProfile(name, image);
      alert("Profile updated successfully!");
      onClose();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Profile</h2>
          <X className="close-icon" onClick={onClose} />
        </div>
        <p>Manage your profile settings here.</p>
        <div className="profile-form">
          <div className="image-upload">
            <label htmlFor="file-upload" className="upload-button">
              Upload Image
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
            {preview && <img src={preview} alt="Profile Preview" className="profile-image" />}
          </div>
          <input
            type="text"
            className="name-input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
