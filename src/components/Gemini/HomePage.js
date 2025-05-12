// components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/fakeUserService";
import itemData from "../data/itemData.json";
import "./HomePage.css"; // Import the CSS file

const HomePage = () => {
  const user = getCurrentUser();

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to Our Shop, {user ? user.username : "Guest"}!</h1>
        <p className="tagline">Discover amazing products just for you.</p>
      </header>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {itemData.map((item) => (
            <div className="product-card" key={item.id}>
              <div className="product-image-container">
                <img
                  src={`https://picsum.photos/id/${item.id}/300/200`}
                  alt={item.title}
                  className="product-photo"
                />
              </div>
              <Link
                to={`/item/${item.id}`}
                state={{ title: item.title, price: item.price }}
                className="product-title"
              >
                {item.title}
              </Link>
              <div className="product-details">
                <span className="product-price">${item.price.toFixed(2)}</span>
                <button className="add-to-cart-button">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="call-to-action">
        <h2>Ready to explore?</h2>
        <p>Browse our latest collections and find something special.</p>
        <Link to="/products" className="browse-button">
          Browse All Products
        </Link>
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 My E-commerce Shop. All rights reserved.</p>
        {user && <Link to="/settings">User Settings</Link>}
      </footer>
    </div>
  );
};

export default HomePage;