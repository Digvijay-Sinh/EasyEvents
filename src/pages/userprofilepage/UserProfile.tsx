import React from "react";

const UserProfile: React.FC = () => {
  return (
    <div>
      <img src="profile-image.jpg" alt="Profile Image" />
      <h1>User Profile</h1>
      <p>Name: John Doe</p>
      <p>Email: johndoe@example.com</p>
      <p>Location: New York, USA</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default UserProfile;
