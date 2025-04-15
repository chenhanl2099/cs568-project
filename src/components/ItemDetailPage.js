// src/components/ItemDetailPage.js
import React from "react";
import { Link, useParams } from "react-router-dom";

const ItemDetailPage = () => {
  let { id } = useParams();

  return (
    <div>
      <h2>Item Detail for Item {id}</h2>
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