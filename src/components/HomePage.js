import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/fakeUserService";
import itemData from "../data/itemData.json";
import "./HomePage.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const HomePage = () => {
  const user = getCurrentUser();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const handleFavorite = (itemId) => {
    const newFavorites = new Set(favorites);
    newFavorites.has(itemId) ? newFavorites.delete(itemId) : newFavorites.add(itemId);
    setFavorites(newFavorites);
  };

  return (
    <div className="home-page">
      <nav className="top-nav">
        <Link to="/" className="logo">E-Shop</Link>
        <div className="nav-controls">
          <input type="text" placeholder="Search products..." className="search-bar" />
          <div className="user-actions">
            <Link to="/cart" className="cart-icon">
              <AddShoppingCartIcon />
            </Link>
            <Link to="/settings" className="user-avatar">
              {user ? user.username.charAt(0) : 'G'}
            </Link>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Summer Collection 2024</h1>
          <p>Discover our premium selection at exclusive prices</p>
          <Link to="/price-tracking" className="cta-button">Shop Now →</Link>
        </div>
      </section>

      <main className="main-content">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/price-tracking" className="view-all">View All Products</Link>
        </div>

        <div className="products-grid">
          {itemData.map(item => (
            <article 
              className={`product-card ${hoveredItem === item.id ? 'hovered' : ''}`}
              key={item.id}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button 
                className={`favorite-btn ${favorites.has(item.id) ? 'active' : ''}`}
                onClick={() => handleFavorite(item.id)}
                aria-label="Toggle favorite"
              >
                {favorites.has(item.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </button>

              <Link to={`/item/${item.id}`} className="product-image-link">
                <img
                  src={`https://picsum.photos/id/${item.id}/300`}
                  alt={item.title}
                  className="product-image"
                />
                {hoveredItem === item.id && (
                  <button 
                    className="quick-add-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Added ${item.title} to cart`);
                    }}
                  >
                    <AddShoppingCartIcon /> Quick Add
                  </button>
                )}
              </Link>

              <div className="product-info">
                <h3 className="product-title">
                  <Link to={`/item/${item.id}`}>{item.title}</Link>
                </h3>
                <div className="price-container">
                  <span className="price">${item.price.toFixed(2)}</span>
                  {item.price < 100 && <span className="sale-badge">SALE</span>}
                </div>
                <div className="rating">
                  ★★★★☆ <span className="review-count">(127)</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;