import React from "react";
import { useParams } from "react-router-dom";
import PriceChart from "./PriceChart";
import "./PriceTrackingPage.css";

// Sample monthly price data for items
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
    { month: "Jul", price: 99 },
    { month: "Aug", price: 105 },
    { month: "Sep", price: 102 },
    { month: "Oct", price: 97 },
    { month: "Nov", price: 103 },
    { month: "Dec", price: 98 }
  ],
  item3: [
    { month: "Jan", price: 129 },
    { month: "Feb", price: 125 },
    { month: "Mar", price: 123 },
    { month: "Apr", price: 130 },
    { month: "May", price: 127 },
    { month: "Jun", price: 126 },
    { month: "Jul", price: 99 },
    { month: "Aug", price: 105 },
    { month: "Sep", price: 102 },
    { month: "Oct", price: 97 },
    { month: "Nov", price: 103 },
    { month: "Dec", price: 98 }
  ]
};

const PriceTrackingPage = () => {
  const { id } = useParams();
  const priceData = mockPriceData[`item${id}`] || [];

  return (
    <main className="price-tracking-container">
      <header className="tracking-header">
        <h1>📈 Price Tracking for Item {id}</h1>
        <p>View trends and monthly price changes with visual insight.</p>
      </header>

      <section className="chart-wrapper">
        <PriceChart data={priceData.map(({ month, price }) => ({ date: month, price }))} />
      </section>

      <section className="price-table-section">
        <h2 className="table-heading">Monthly Price Overview</h2>
        <table className="price-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {priceData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.month}</td>
                <td>${entry.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default PriceTrackingPage;
