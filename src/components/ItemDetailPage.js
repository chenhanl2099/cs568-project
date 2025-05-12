import React from "react";
import { Link, useParams } from "react-router-dom";
import itemData from "../data/itemData.json";

const ItemDetailPage = () => {
  const { id } = useParams();
  const item = itemData.find(i => i.id === parseInt(id));

  if (!item) {
    return <div>Item not found.</div>;
  }

  return (
    <div>
      <h2>{item.title}</h2>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${item.price.toFixed(2)}</p>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1em' }}>
        {item.images.map((url, index) => (
          <img key={index} src={url} alt={`Detail ${index}`} width="200" />
        ))}
      </div>
      <p style={{ maxWidth: '600px' }}>{item.description}</p>
      <Link to={`/track/${item.id}`}>
        <button>Track Price Change</button>
      </Link>
      <br />
      <Link to="/home">Back to Home</Link>
    </div>
  );
};

export default ItemDetailPage;