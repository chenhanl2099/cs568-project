// src/components/ItemDetailPage.js
import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";

const ItemDetailPage = () => {
  let { id } = useParams();
  const location = useLocation();
  const title = location.state?.title || "Unknown Item";

  return (
    <div>
      <h2>{title}</h2>
      <p>Image placeholder: [Insert image here]</p>
      <p>Item details go here.</p>
      <Link to={`/track/${id}`}>
        <button>Track Price Change</button>
      </Link>
      <br />
      <Link to="/home">Back to Home</Link>
    </div>
  );
};

export default ItemDetailPage;