// src/components/PriceTrackingPage.js
import React from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import styled from 'styled-components';
import { theme } from '../theme'; // Assume we have a theme file for consistent styling

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h2 {
    font-size: 2rem;
    color: ${theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${theme.colors.textSecondary};
  }
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  height: 400px;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid ${theme.colors.border};
  }

  th {
    background-color: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
    font-weight: 600;
  }

  tr:hover {
    background-color: ${theme.colors.hover};
  }

  @media (max-width: 768px) {
    th, td {
      padding: 0.75rem;
    font-size: 0.9rem;
    display: block;
      width: 100%;
      box-sizing: border-box;
    }

    tr {
      margin-bottom: 1rem;
      display: block;
      border: 1px solid ${theme.colors.border};
      border-radius: 8px;
    }
  }
`;

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

  // Calculate price change statistics
  const currentPrice = priceData.length > 0 ? priceData[priceData.length - 1].price : 0;
  const lowestPrice = Math.min(...priceData.map(item => item.price));
  const highestPrice = Math.max(...priceData.map(item => item.price));

  return (
    <Container>
      <Header>
        <h2>Price History for Product #{id}</h2>
        <p>Track price fluctuations and identify the best time to buy</p>
      </Header>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={priceData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: theme.colors.textSecondary }}
            />
            <YAxis 
              unit="$" 
              tick={{ fill: theme.colors.textSecondary }}
            />
            <Tooltip 
              contentStyle={{
                background: theme.colors.background,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '8px'
              }}
              formatter={(value) => [`$${value}`, 'Price']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke={theme.colors.primary}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: theme.colors.primaryDark, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <DataTable>
        <thead>
          <tr>
            <th>Month</th>
            <th>Price</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {priceData.map((entry, index) => {
            const previousPrice = index > 0 ? priceData[index - 1].price : null;
            const priceChange = previousPrice !== null ? entry.price - previousPrice : null;
            
            return (
              <tr key={index}>
                <td>{entry.month}</td>
                <td>${entry.price.toFixed(2)}</td>
                <td style={{ 
                  color: priceChange > 0 ? theme.colors.error : 
                        priceChange < 0 ? theme.colors.success : 
                        theme.colors.textSecondary 
                }}>
                  {priceChange !== null ? 
                    `${priceChange > 0 ? '+' : ''}${priceChange.toFixed(2)}` : 
                    '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </DataTable>

      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginTop: '2rem',
        flexWrap: 'wrap'
      }}>
        <StatCard 
          title="Current Price" 
          value={`$${currentPrice.toFixed(2)}`} 
          color={theme.colors.primary}
        />
        <StatCard 
          title="Lowest Price" 
          value={`$${lowestPrice.toFixed(2)}`} 
          color={theme.colors.success}
        />
        <StatCard 
          title="Highest Price" 
          value={`$${highestPrice.toFixed(2)}`} 
          color={theme.colors.error}
        />
      </div>
    </Container>
  );
};

const StatCard = ({ title, value, color }) => (
  <div style={{
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    flex: '1',
    minWidth: '200px'
  }}>
    <h3 style={{ 
      color: theme.colors.textSecondary,
      fontSize: '0.9rem',
      marginBottom: '0.5rem'
    }}>{title}</h3>
    <p style={{ 
      color: color,
      fontSize: '1.5rem',
      fontWeight: '600',
      margin: 0
    }}>{value}</p>
  </div>
);

export default PriceTrackingPage;