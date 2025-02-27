import axios from "axios";

const BASE_URL = "https://your-api.com";

const api = axios.create({
  baseURL: BASE_URL, // Change this to your actual API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Upload profile
export const uploadProfile = async (name, image) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);

  try {
    const response = await api.post("/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error uploading profile";
  }
};

// Send message
export const sendMessageToChatbot = async (message) => {
  try {
    const response = await api.post("/messages/send", { content: message });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error sending message";
  }
};

// Get all messages
export const fetchMessages = async () => {
  try {
    const response = await api.get("/messages");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching messages";
  }
};
