import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/fakeUserService";
import itemData from "../data/itemData.json";
import { motion } from "framer-motion";

const HomePage = () => {
  const user = getCurrentUser();

  return (
    <div style={styles.pageWrapper}>
      {/* Hero Banner */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome {user ? user.username : "Guest"}!</h1>
        <p style={styles.heroSubtitle}>Find your favorite deals and save big!</p>
        <input
          type="text"
          placeholder="Search for products..."
          style={styles.searchBar}
        />
      </div>

      {/* Section Title */}
      <h2 style={styles.sectionTitle}>Featured Products</h2>

      {/* Product Grid */}
      <div style={styles.grid}>
        {itemData.map((item) => (
          <motion.div
            key={item.id}
            style={styles.card}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={`https://picsum.photos/id/${item.id}/400`}
              alt={item.title}
              style={styles.image}
            />
            <div style={styles.cardBody}>
              <Link
                to={`/item/${item.id}`}
                state={{ title: item.title, price: item.price }}
                style={styles.titleLink}
              >
                {item.title}
              </Link>
              <div className="product-price">
                <div className="product-price">
                  ${typeof item.price === "number" ? item.price.toFixed(2) : "0.00"}
                </div>
              </div>
              <button style={styles.addToCartBtn}>Add to Cart</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Link */}
      <div style={styles.footer}>
        <Link to="/settings" style={styles.settingsLink}>
          Manage Account Settings
        </Link>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    fontFamily: "Segoe UI, sans-serif",
    padding: "2rem",
    backgroundColor: "#f9f9f9",
  },
  hero: {
    textAlign: "center",
    padding: "2.5rem 1rem",
    backgroundColor: "#fff",
    borderRadius: "12px",
    marginBottom: "2rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  heroTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: "0 0 0.5rem",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "1rem",
  },
  searchBar: {
    padding: "0.75rem 1rem",
    width: "80%",
    maxWidth: "500px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  sectionTitle: {
    fontSize: "1.75rem",
    margin: "1.5rem 0",
    fontWeight: "600",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "0.3s",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },
  cardBody: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    flexGrow: 1,
  },
  titleLink: {
    fontSize: "1.1rem",
    fontWeight: "600",
    textDecoration: "none",
    color: "#333",
  },
  price: {
    color: "#27ae60",
    fontWeight: "600",
    fontSize: "1rem",
  },
  addToCartBtn: {
    marginTop: "auto",
    padding: "0.5rem",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "0.95rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  footer: {
    marginTop: "3rem",
    textAlign: "center",
  },
  settingsLink: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "1rem",
  },
};

export default HomePage;
