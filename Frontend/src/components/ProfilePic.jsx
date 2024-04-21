/*
  * File: 
    *ProfilePic.jsx

  * Description: 
    * This component displays the user's profile picture.
    * The user can click on the profile picture to change it.
    * The user can only change the profile picture when editing their profile.
    * The new profile picture is stored in sessionStorage.
*/
import React from 'react';

function ProfilePicChange({ profilePic, onProfilePicChange, isEditing}) {
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result;
      onProfilePicChange(imageDataUrl); // Pass the image data URL to the parent component
      // Store the image data URL in sessionStorage
      sessionStorage.setItem('profilePic', imageDataUrl);
    };
    reader.readAsDataURL(file);
  };

  const style= {
        cursor: isEditing ? 'pointer' : 'auto',
        border: isEditing ? '3px solid #007bff' : 'none' // Apply border when editing
      }

  return (
    <div className="profile-pic-change">
      <label htmlFor="profilePicInput">
        <img className="settings-profilePic" src={profilePic} alt="placeholder" style={style} />
        <input
          id="profilePicInput"
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          style={{ display: 'none', cursor: 'pointer'}}
          disabled={!isEditing}
        />
      </label>
    </div>
  );
}

export default ProfilePicChange;
