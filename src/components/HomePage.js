// src/components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/fakeUserService";

const HomePage = () => {
  const user = getCurrentUser();
  const dummyItems = [
    { id: 1, title: "Item 1" },
    { id: 2, title: "Item 2" },
    { id: 3, title: "Item 3" }
  ];

  return (
    <div>
      <h2>Welcome {user ? user.username : "Guest"}</h2>
      <h3>Items</h3>
      <ul>
        {dummyItems.map(item => (
          <li key={item.id}>
            <Link to={`/item/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/settings">User Settings</Link>
    </div>
  );
};

export default HomePage;