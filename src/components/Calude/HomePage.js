import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/fakeUserService";
import itemData from "../data/itemData.json";
import { Search, ShoppingCart, Heart, Menu, User, X } from "lucide-react";
import "./HomePage.css"; // Updated import path to match the file location

const HomePage = () => {
  const user = getCurrentUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(itemData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // Categories derived from item data
  const categories = ["All", ...new Set(itemData.map(item => item.category || "Uncategorized"))];

  // Filter and sort items based on search query, category, and sort order
  useEffect(() => {
    let results = [...itemData];
    
    // Apply search filter
    if (searchQuery) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All") {
      results = results.filter(item => item.category === selectedCategory);
    }
    
    // Apply sorting
    switch (sortOrder) {
      case "price-asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        results.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Keep original order
        break;
    }
    
    setFilteredItems(results);
  }, [searchQuery, selectedCategory, sortOrder]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <Link to="/" className="logo">ShopEase</Link>
          </div>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-button" aria-label="Search">
              <Search size={20} />
            </button>
          </div>
          
          <nav className="desktop-nav">
            <Link to="/cart" className="nav-link">
              <ShoppingCart size={20} />
              <span>Cart</span>
            </Link>
            <Link to="/wishlist" className="nav-link">
              <Heart size={20} />
              <span>Wishlist</span>
            </Link>
            <Link to={user ? "/settings" : "/login"} className="nav-link">
              <User size={20} />
              <span>{user ? user.username : "Login"}</span>
            </Link>
          </nav>
          
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/cart" className="mobile-nav-link" onClick={toggleMenu}>
            <ShoppingCart size={20} />
            <span>Cart</span>
          </Link>
          <Link to="/wishlist" className="mobile-nav-link" onClick={toggleMenu}>
            <Heart size={20} />
            <span>Wishlist</span>
          </Link>
          <Link to={user ? "/settings" : "/login"} className="mobile-nav-link" onClick={toggleMenu}>
            <User size={20} />
            <span>{user ? user.username : "Login"}</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ShopEase</h1>
          <p>Discover amazing products with the best deals</p>
          <Link to="/featured" className="cta-button">Shop Now</Link>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        {/* Welcome Message */}
        <section className="welcome-section">
          <h2 className="welcome-message">
            Welcome back, {user ? user.username : "Guest"}!
          </h2>
        </section>

        {/* Filter Controls */}
        <section className="filter-section">
          <div className="category-filter">
            <label htmlFor="category-select">Category:</label>
            <select 
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="sort-filter">
            <label htmlFor="sort-select">Sort by:</label>
            <select 
              id="sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="filter-select"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </section>

        {/* Products Grid */}
        <section className="featured-products">
          <h2 className="section-title">Featured Products</h2>
          
          {filteredItems.length === 0 ? (
            <div className="no-results">
              <p>No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredItems.map(item => (
                <div className="product-card" key={item.id}>
                  <div className="product-image-container">
                    <img
                      src={`https://picsum.photos/id/${item.id}/200`}
                      alt={item.title}
                      className="product-image"
                    />
                    <div className="product-overlay">
                      <button className="quick-action-btn wishlist-btn" aria-label="Add to wishlist">
                        <Heart size={20} />
                      </button>
                      <button className="quick-action-btn cart-btn" aria-label="Add to cart">
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <Link
                      to={`/item/${item.id}`}
                      state={{ title: item.title, price: item.price }}
                      className="product-title"
                    >
                      {item.title}
                    </Link>
                    {item.category && <p className="product-category">{item.category}</p>}
                    <div className="product-price">${item.price.toFixed(2)}</div>
                    
                    {item.rating && (
                      <div className="product-rating">
                        {Array(5).fill().map((_, i) => (
                          <span key={i} className={`star ${i < Math.round(item.rating) ? 'filled' : ''}`}>★</span>
                        ))}
                        <span className="rating-count">({item.reviews || 0})</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        
        {/* Features Section */}
        <section className="features-section">
          <div className="feature">
            <div className="feature-icon">🚚</div>
            <h3>Free Shipping</h3>
            <p>On orders over $50</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>30-day return policy</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>100% secure checkout</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💬</div>
            <h3>24/7 Support</h3>
            <p>We're here to help</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>ShopEase</h3>
            <p>Your one-stop shop for all your needs.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/settings">User Settings</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Categories</h3>
            <ul>
              {categories.slice(1).map(category => (
                <li key={category}>
                  <Link to={`/category/${category.toLowerCase()}`}>{category}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="Twitter">TW</a>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Pinterest">PIN</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;