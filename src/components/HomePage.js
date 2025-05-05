// components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/fakeUserService";
import "./HomePage.css"; // Import modular stylesheet

const dummyItems = [
  { id: 1, title: "Wireless Headphones" },
  { id: 2, title: "Smartphone Case" },
  { id: 3, title: "Portable Charger" },
  { id: 4, title: "Running Shoes" },
  { id: 5, title: "Smart Watch" },
  { id: 6, title: "Laptop Backpack" }
];

const HomePage = () => {
  const user = getCurrentUser();

  return (
    <main className="home-container">
      <header className="welcome-banner">
        <h1>Welcome, {user ? user.username : "Guest"}!</h1>
        <p className="subheading">Check out our featured products</p>
      </header>

      <section className="product-grid">
        {dummyItems.map((item) => (
          <div className="product-card" key={item.id} tabIndex={0}>
            <div className="product-image-wrapper">
              <img
                src={`https://picsum.photos/id/${item.id}/300/200`}
                alt={item.title}
                className="product-image"
              />
            </div>
            <Link
              to={`/item/${item.id}`}
              state={{ title: item.title }}
              className="product-title"
              aria-label={`View details for ${item.title}`}
            >
              {item.title}
            </Link>
          </div>
        ))}
      </section>

      <footer className="footer">
        <Link to="/settings" className="settings-link">
          Go to User Settings
        </Link>
      </footer>
    </main>
  );
};

export default HomePage;
