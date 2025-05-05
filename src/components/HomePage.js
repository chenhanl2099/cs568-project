import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/fakeUserService";

const HomePage = () => {
  const user = getCurrentUser();
  const dummyItems = [
    { id: 1, title: "Wireless Headphones", price: 79.99 },
    { id: 2, title: "Smartphone Case", price: 19.99 },
    { id: 3, title: "Portable Charger", price: 29.99 },
    { id: 4, title: "Running Shoes", price: 89.99 },
    { id: 5, title: "Smart Watch", price: 199.99 },
    { id: 6, title: "Laptop Backpack", price: 49.99 }
  ];

  return (
    <div className="home-page">
      <h2>Welcome {user ? user.username : "Guest"}</h2>
      <h3>Featured Products</h3>
      <div className="products-grid">
        {dummyItems.map(item => (
          <div className="product-card" key={item.id}>
            <div className="product-image">
              < img 
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
            <div className="product-price">${item.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
      <Link to="/settings">User Settings</Link>
    </div>
  );
};

export default HomePage;