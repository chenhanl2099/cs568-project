// src/components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/fakeUserService";

const HomePage = () => {
  const user = getCurrentUser();
  const dummyItems = [
    { id: 1, title: "Wireless Headphones", price: 59.99 },
    { id: 2, title: "Smartphone Case", price: 19.99 },
    { id: 3, title: "Portable Charger", price: 29.99 },
    { id: 4, title: "Running Shoes", price: 79.99 },
    { id: 5, title: "Smart Watch", price: 199.99 },
    { id: 6, title: "Laptop Backpack", price: 39.99 }
  ];

  const styles = {
    homePage: {
      padding: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    productsGrid: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      padding: "2rem 0",
      gap: "2rem",
    },
    productCard: {
      flex: "0 0 300px",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
    },
    productImage: {
      width: "100%",
      height: "220px",
      borderRadius: "8px",
      marginBottom: "1rem",
      overflow: "hidden",
    },
    productPhoto: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    productTitle: {
      color: "#2c3e50",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "1.1rem",
      textAlign: "center",
      marginTop: "auto",
      padding: "0 0.5rem",
    },
    productPrice: {
      color: "#2c3e50",
      fontSize: "1rem",
      fontWeight: "bold",
      textAlign: "center",
      margin: "0.5rem 0 0",
    },
  };

  return (
    <div style={styles.homePage}>
      <h2>Welcome {user ? user.username : "Guest"}</h2>
      <h3>Featured Products</h3>
      <div style={styles.productsGrid}>
        {dummyItems.map(item => (
          <div className="product-card" key={item.id} style={styles.productCard}>
            <div style={styles.productImage}>
              <img
                src={`https://picsum.photos/id/${item.id}/200`}
                alt={item.title}
                style={styles.productPhoto}
              />
            </div>
            <Link to={`/item/${item.id}`} style={styles.productTitle}>
              {item.title}
            </Link>
            <p style={styles.productPrice}>${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <Link to="/settings">User Settings</Link>
    </div>
  );
};

export default HomePage;