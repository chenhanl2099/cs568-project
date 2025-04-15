// src/components/UserSettingsPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../utils/fakeUserService";

const UserSettingsPage = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div>
      <h2>User Settings</h2>
      {user && (
        <>
          <p>Username: {user.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default UserSettingsPage;