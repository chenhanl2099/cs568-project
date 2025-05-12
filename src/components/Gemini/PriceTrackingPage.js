// src/components/PriceTrackingPage.js
import React from "react";
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const pageContainerStyle = {
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
};

const titleStyle = {
  color: '#333',
  fontSize: '1.8em',
  marginBottom: '15px',
};

const chartContainerStyle = {
  width: '90%',
  maxWidth: '800px',
  height: '400px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: '#fff',
};

const noDataMessageStyle = {
  color: '#777',
  fontStyle: 'italic',
};

const mockPriceData = {
  item1: [
    { month: "Jan", price: 99 },
    { month: "Feb", price: 105 },
    { month: "Mar", price: 102 },
    { month: "Apr", price: 97 },
    { month: "May", price: 103 },
    { month: "Jun", price: 98 },
    { month: "Jul", price: 99 },
    { month: "Aug", price: 105 },
    { month: "Sep", price: 102 },
    { month: "Oct", price: 97 },
    { month: "Nov", price: 103 },
    { month: "Dec", price: 98 }
  ],
  item2: [
    { month: "Jan", price: 129 },
    { month: "Feb", price: 125 },
    { month: "Mar", price: 123 },
    { month: "Apr", price: 130 },
    { month: "May", price: 127 },
    { month: "Jun", price: 126 },
    { month: "Jul", price: 132 },
    { month: "Aug", price: 135 },
    { month: "Sep", price: 131 },
    { month: "Oct", price: 128 },
    { month: "Nov", price: 133 },
    { month: "Dec", price: 130 }
  ],
  item3: [
    { month: "Jan", price: 55 },
    { month: "Feb", price: 58 },
    { month: "Mar", price: 60 },
    { month: "Apr", price: 57 },
    { month: "May", price: 62 },
    { month: "Jun", price: 65 },
    { month: "Jul", price: 63 },
    { month: "Aug", price: 60 },
    { month: "Sep", price: 59 },
    { month: "Oct", price: 61 },
    { month: "Nov", price: 64 },
    { month: "Dec", price: 62 }
  ]
};

const PriceTrackingPage = () => {
  const { id } = useParams();
  const priceData = mockPriceData[`item${id}`] || [];

  return (
    <div style={pageContainerStyle}>
      <h2 style={titleStyle}>Price History for Item {id}</h2>
      {priceData.length > 0 ? (
        <div style={chartContainerStyle}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value) => `$${value}`} labelFormatter={(value) => `Month: ${value}`} />
              <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p style={noDataMessageStyle}>No price tracking data available for this item.</p>
      )}
    </div>
  );
};

export default PriceTrackingPage;