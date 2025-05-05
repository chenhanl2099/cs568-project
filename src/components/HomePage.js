// src/components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/fakeUserService";

const HomePage = () => {
  const user = getCurrentUser();
  const dummyItems = [
    { id: 1, title: "Wireless Headphones" },
    { id: 2, title: "Smartphone Case" },
    { id: 3, title: "Portable Charger" },
    { id: 4, title: "Running Shoes" },
    { id: 5, title: "Smart Watch" },
    { id: 6, title: "Laptop Backpack" }
  ];

  return (
    <div className="home-page">
      <h2>Welcome {user ? user.username : "Guest"}</h2>
      <h3>Featured Products</h3>
      <div className="products-grid">
        {dummyItems.map(item => (
          <div className="product-card" key={item.id}>
            <div className="product-image">
              <img 
                src={`https://picsum.photos/id/${item.id}/200`} 
                alt={item.title}
                className="product-photo"
              />
            </div>
            <Link
              to={`/item/${item.id}`}
              state={{ title: item.title }}
              className="product-title"
            >
              {item.title}
            </Link>
          </div>
        ))}
      </div>
      <Link to="/settings">User Settings</Link>
    </div>
  );
};

export default HomePage;