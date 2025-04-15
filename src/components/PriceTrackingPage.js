// src/components/PriceTrackingPage.js
import React from "react";
import { Link, useParams } from "react-router-dom";

const PriceTrackingPage = () => {
  let { id } = useParams();

  return (
    <div>
      <h2>Price Tracking for Item {id}</h2>
      <p>Price change history details can be inserted here.</p>
      <Link to={`/item/${id}`}>
        <button>Back to Item Detail</button>
      </Link>
    </div>
  );
};

export default PriceTrackingPage;