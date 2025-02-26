import React, { useState } from 'react';
import axios from 'axios';
import '../style/profile.css';  // Assuming you have a Profile.css file for styling

const Profile = ({ setSubmitt }) => {  // Expecting setSubmitt here
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);  // Set the uploaded image as the state
      };
      reader.readAsDataURL(file);  // Convert the image file to a base64 string
    }
  };

  const handleSubmit = async () => {
    if (!name || !image) {
      setError('Please provide both a name and a profile image');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // const response = await axios.post('/api/profile', {
      //   name,
      //   image,
      // });

      // if (response.status === 200) {
      //   setSubmitt(true);  // Set the submitted status to true after successful submission
      //   setLoading(false);
      // }
      setSubmitt(true);  // Set the submitted status to true after successful submission
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError('There was an error submitting your profile. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Your Profile</h1>
      </div>

      <div className="profile-content">
        <div className="profile-image-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
          {image && <img src={image} alt="Profile" className="profile-image" />}
        </div>

        <div className="profile-name-input">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="profile-name-field"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="profile-submit">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Submitting...' : 'Submit Profile'}
          </button>
        </div>
      </div>
    </div>

  );
};

export default Profile;
