import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/fakeUserService";
import itemData from "../data/itemData.json";

const HomePage = () => {
  const user = getCurrentUser();

  return (
    <div className="home-page">
      <h2>Welcome {user ? user.username : "Guest"}</h2>
      <h3>Featured Products</h3>
      <div className="products-grid">
        {itemData.map(item => (
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
              state={{ title: item.title, price: item.price }}
              className="product-title"
            >
              {item.title}
            </Link>
            <div className="product-price">
              ${typeof item.price === "number" ? item.price.toFixed(2) : "0.00"}
            </div>
          </div>
        ))}
      </div>
      <Link to="/settings">User Settings</Link>
    </div>
  );
};

export default HomePage;