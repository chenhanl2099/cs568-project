import React, { useState, useEffect } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Bell, 
  DollarSign,
  Calendar,
  List,
  BarChart2,
  Settings
} from "lucide-react";

// CSS styles for the component
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 16px",
    fontFamily: "Arial, sans-serif",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    gap: "24px",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  sidebar: {
    flex: "1",
    maxWidth: "350px",
  },
  mainContent: {
    flex: "2",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    padding: "16px",
    marginBottom: "24px",
    border: "1px solid #e0e0e0",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "8px",
  },
  subheading: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "12px",
  },
  smallHeading: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
  },
  text: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "8px",
    lineHeight: "1.5",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px",
    marginBottom: "24px",
  },
  statCard: {
    padding: "12px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  iconWithText: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    transition: "background-color 0.2s",
  },
  buttonGroup: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  activeButton: {
    backgroundColor: "#3b82f6",
    color: "white",
  },
  inactiveButton: {
    backgroundColor: "#e5e7eb",
    color: "#4b5563",
  },
  badge: {
    padding: "4px 12px",
    borderRadius: "16px",
    display: "inline-flex",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "500",
    marginRight: "8px",
    marginBottom: "8px",
  },
  blueBadge: {
    backgroundColor: "#e1f0ff",
    color: "#0069d9",
    border: "1px solid #b8daff",
  },
  greenBadge: {
    backgroundColor: "#e3f9e5",
    color: "#198754",
    border: "1px solid #c3e6cb",
  },
  redBadge: {
    backgroundColor: "#ffebee",
    color: "#d32f2f",
    border: "1px solid #f5c2c7",
  },
  purpleBadge: {
    backgroundColor: "#f3e5f5",
    color: "#6f42c1",
    border: "1px solid #d8b5e3",
  },
  alertBox: {
    backgroundColor: "#e6f7ff",
    borderRadius: "4px",
    padding: "12px",
    border: "1px solid #91caff",
    marginTop: "12px",
    fontSize: "14px",
    color: "#0055b3",
  },
  formGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    color: "#555",
    marginBottom: "4px",
  },
  input: {
    width: "100%", 
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
  },
  inputPrepend: {
    backgroundColor: "#f0f0f0",
    padding: "8px 12px",
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px",
    border: "1px solid #ccc",
    borderRight: "none",
  },
  inputRounded: {
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
    textAlign: "left",
  },
  tableHeaderCell: {
    padding: "12px 16px", 
    fontSize: "14px",
    color: "#4b5563",
    fontWeight: "600",
  },
  tableRow: {
    borderBottom: "1px solid #e5e7eb",
  },
  tableRowAlt: {
    backgroundColor: "#f9fafb",
  },
  tableCell: {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#333",
  },
  productImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "4px",
    marginBottom: "12px",
  },
  ratingStars: {
    display: "flex",
    marginRight: "8px",
  },
  star: {
    fontSize: "18px",
  },
  starFilled: {
    color: "#ffc107",
  },
  starEmpty: {
    color: "#e0e0e0",
  },
  priceInfoRow: {
    display: "flex", 
    justifyContent: "space-between",
    fontSize: "14px",
    margin: "8px 0",
  },
  greenText: {
    color: "#10b981",
  },
  redText: {
    color: "#ef4444",
  },
  blueText: {
    color: "#3b82f6",
  },
  grayText: {
    color: "#6b7280",
  },
  divider: {
    borderTop: "1px solid #e5e7eb",
    margin: "16px 0",
  },
  chartControlsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    flexWrap: "wrap",
    gap: "12px",
  },
  toggleContainer: {
    display: "inline-flex",
    backgroundColor: "#f3f4f6",
    borderRadius: "4px",
    padding: "4px",
  },
  toggleButton: {
    padding: "8px 12px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "14px",
  },
  select: {
    padding: "6px 8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    fontSize: "14px",
  },
  tooltipBox: {
    backgroundColor: "white",
    padding: "16px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
    borderRadius: "4px",
    border: "1px solid #e0e0e0",
    minWidth: "150px",
  },
  tooltipTitle: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: "4px",
  },
  tooltipPrice: {
    color: "#3b82f6",
    fontWeight: "500",
    marginBottom: "8px",
  },
  tooltipDivider: {
    borderTop: "1px solid #e5e7eb",
    margin: "8px 0",
  },
  tooltipDetail: {
    fontSize: "12px",
    margin: "4px 0",
  },
  responsiveContainer: {
    width: "100%",
    height: "400px",
  },
  // Media query simulation - we'll apply these with JavaScript conditionally
  mobileStyles: {
    flexRow: {
      flexDirection: "column",
    },
    sidebar: {
      maxWidth: "100%",
    },
    grid: {
      gridTemplateColumns: "repeat(2, 1fr)",
    }
  }
};

// Mock product images
const productImages = {
  item1: "https://via.placeholder.com/400x320",
  item2: "https://via.placeholder.com/400x320",
  item3: "https://via.placeholder.com/400x320"
};

// Mock product info
const productInfo = {
  item1: {
    name: "Premium Wireless Headphones",
    brand: "AudioTech",
    rating: 4.5,
    reviews: 128,
    msrp: 129.99,
    lowestPrice: 97,
    highestPrice: 105
  },
  item2: {
    name: "Smart Fitness Tracker",
    brand: "TechFit",
    rating: 4.3,
    reviews: 96,
    msrp: 149.99,
    lowestPrice: 97,
    highestPrice: 130
  },
  item3: {
    name: "Wireless Charging Pad",
    brand: "PowerPlus",
    rating: 4.0,
    reviews: 75,
    msrp: 139.99,
    lowestPrice: 97,
    highestPrice: 129
  }
};

// Enhanced mock price data with additional metrics
const mockPriceData = {
  item1: [
    { month: "Jan", price: 99, avg: 101, min: 95, max: 105 },
    { month: "Feb", price: 105, avg: 102, min: 97, max: 107 },
    { month: "Mar", price: 102, avg: 103, min: 98, max: 108 },
    { month: "Apr", price: 97, avg: 99, min: 95, max: 104 },
    { month: "May", price: 103, avg: 101, min: 97, max: 106 },
    { month: "Jun", price: 98, avg: 100, min: 96, max: 105 },
    { month: "Jul", price: 99, avg: 101, min: 97, max: 106 },
    { month: "Aug", price: 105, avg: 103, min: 99, max: 108 },
    { month: "Sep", price: 102, avg: 103, min: 98, max: 109 },
    { month: "Oct", price: 97, avg: 100, min: 95, max: 105 },
    { month: "Nov", price: 103, avg: 102, min: 97, max: 107 },
    { month: "Dec", price: 98, avg: 100, min: 94, max: 104 }
  ],
  item2: [
    { month: "Jan", price: 129, avg: 125, min: 120, max: 130 },
    { month: "Feb", price: 125, avg: 126, min: 122, max: 131 },
    { month: "Mar", price: 123, avg: 125, min: 120, max: 129 },
    { month: "Apr", price: 130, avg: 127, min: 123, max: 132 },
    { month: "May", price: 127, avg: 126, min: 121, max: 130 },
    { month: "Jun", price: 126, avg: 124, min: 118, max: 128 },
    { month: "Jul", price: 99, avg: 110, min: 97, max: 120 },
    { month: "Aug", price: 105, avg: 103, min: 99, max: 108 },
    { month: "Sep", price: 102, avg: 103, min: 98, max: 109 },
    { month: "Oct", price: 97, avg: 100, min: 95, max: 105 },
    { month: "Nov", price: 103, avg: 102, min: 97, max: 107 },
    { month: "Dec", price: 98, avg: 100, min: 94, max: 104 }
  ],
  item3: [
    { month: "Jan", price: 129, avg: 125, min: 120, max: 130 },
    { month: "Feb", price: 125, avg: 126, min: 122, max: 131 },
    { month: "Mar", price: 123, avg: 125, min: 120, max: 129 },
    { month: "Apr", price: 130, avg: 127, min: 123, max: 132 },
    { month: "May", price: 127, avg: 126, min: 121, max: 130 },
    { month: "Jun", price: 126, avg: 124, min: 118, max: 128 },
    { month: "Jul", price: 99, avg: 110, min: 97, max: 120 },
    { month: "Aug", price: 105, avg: 103, min: 99, max: 108 },
    { month: "Sep", price: 102, avg: 103, min: 98, max: 109 },
    { month: "Oct", price: 97, avg: 100, min: 95, max: 105 },
    { month: "Nov", price: 103, avg: 102, min: 97, max: 107 },
    { month: "Dec", price: 98, avg: 100, min: 94, max: 104 }
  ]
};

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const currentData = payload[0].payload;
    
    return (
      <div style={styles.tooltipBox}>
        <p style={styles.tooltipTitle}>{label}</p>
        <p style={styles.tooltipPrice}>
          Price: ${payload[0].value.toFixed(2)}
        </p>
        <div style={styles.tooltipDivider}></div>
        <p style={{...styles.tooltipDetail, color: '#6b7280'}}>Market Average: ${currentData.avg.toFixed(2)}</p>
        <p style={{...styles.tooltipDetail, color: '#10b981'}}>Min: ${currentData.min.toFixed(2)}</p>
        <p style={{...styles.tooltipDetail, color: '#ef4444'}}>Max: ${currentData.max.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

// Custom price badge component
const PriceBadge = ({ type, price }) => {
  let badgeStyle;
  
  switch(type) {
    case 'current':
      badgeStyle = {...styles.badge, ...styles.blueBadge};
      break;
    case 'lowest':
      badgeStyle = {...styles.badge, ...styles.greenBadge};
      break;
    case 'highest':
      badgeStyle = {...styles.badge, ...styles.redBadge};
      break;
    case 'msrp':
      badgeStyle = {...styles.badge, ...styles.purpleBadge};
      break;
    default:
      badgeStyle = {...styles.badge, ...styles.blueBadge};
  }
  
  return (
    <div style={badgeStyle}>
      <DollarSign size={16} style={{marginRight: '4px'}} />
      <span>{price}</span>
    </div>
  );
};

// Price notification component
const PriceAlertForm = ({ currentPrice }) => {
  const [targetPrice, setTargetPrice] = useState(currentPrice - 5);
  
  return (
    <div style={{...styles.card, backgroundColor: "#f9fafb"}}>
      <div style={styles.iconWithText}>
        <Bell size={18} color="#3b82f6" />
        <h3 style={styles.smallHeading}>Price Alert</h3>
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Notify me when price drops below:</label>
        <div style={styles.inputGroup}>
          <span style={styles.inputPrepend}>$</span>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(Number(e.target.value))}
            style={{...styles.input, ...styles.inputRounded}}
          />
        </div>
      </div>
      
      <button style={{...styles.button, ...styles.primaryButton, width: "100%"}}>
        <div style={styles.iconWithText}>
          <Bell size={16} />
          <span>Set Alert</span>
        </div>
      </button>
    </div>
  );
};

// Chart control panel component
const ChartControls = ({ viewMode, setViewMode, timeRange, setTimeRange }) => {
  return (
    <div style={styles.chartControlsContainer}>
      <div style={styles.toggleContainer}>
        <button
          onClick={() => setViewMode('line')}
          style={{
            ...styles.toggleButton,
            ...(viewMode === 'line' ? styles.activeButton : styles.inactiveButton)
          }}
        >
          <TrendingUp size={16} />
          <span>Line</span>
        </button>
        <button
          onClick={() => setViewMode('bar')}
          style={{
            ...styles.toggleButton,
            ...(viewMode === 'bar' ? styles.activeButton : styles.inactiveButton)
          }}
        >
          <BarChart2 size={16} />
          <span>Detail</span>
        </button>
      </div>
      
      <div style={styles.iconWithText}>
        <span style={styles.grayText}>Time Range:</span>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          style={styles.select}
        >
          <option value="3">3 Months</option>
          <option value="6">6 Months</option>
          <option value="12">1 Year</option>
        </select>
      </div>
    </div>
  );
};

// Product detail sidebar component
const ProductSidebar = ({ productData, currentPrice }) => {
  // Create star rating display
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span 
          key={i} 
          style={{
            ...styles.star, 
            ...(i < Math.floor(productData.rating) ? styles.starFilled : styles.starEmpty)
          }}
        >
          ★
        </span>
      );
    }
    return <div style={styles.ratingStars}>{stars}</div>;
  };

  return (
    <div style={styles.card}>
      <div>
        <img 
          src={productImages[`item${productData.id}`]} 
          alt={productData.name} 
          style={styles.productImage}
        />
        <h2 style={styles.subheading}>{productData.name}</h2>
        <p style={styles.grayText}>{productData.brand}</p>
        
        <div style={{...styles.iconWithText, marginTop: "8px", marginBottom: "12px"}}>
          {renderStars()}
          <span style={styles.grayText}>({productData.reviews} reviews)</span>
        </div>
      </div>
      
      <div style={styles.divider}></div>
      
      <div>
        <div style={{display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px"}}>
          <PriceBadge type="current" price={`$${currentPrice}`} />
          <PriceBadge type="msrp" price={`$${productData.msrp}`} />
        </div>
        
        <div style={styles.priceInfoRow}>
          <div style={{...styles.iconWithText, ...styles.greenText}}>
            <TrendingDown size={16} />
            <span>Lowest: ${productData.lowestPrice}</span>
          </div>
          <div style={{...styles.iconWithText, ...styles.redText}}>
            <TrendingUp size={16} />
            <span>Highest: ${productData.highestPrice}</span>
          </div>
        </div>
        
        <div style={styles.alertBox}>
          <div style={{...styles.iconWithText, alignItems: "flex-start"}}>
            <AlertCircle size={18} color="#3b82f6" style={{marginTop: "2px"}} />
            <p style={styles.blueText}>
              Price is <strong>{currentPrice === productData.lowestPrice ? 'at the lowest' : 
              (currentPrice < productData.msrp ? `${Math.round((1 - currentPrice/productData.msrp) * 100)}% below MSRP` : 
              'at MSRP')}</strong>. Good time to buy!
            </p>
          </div>
        </div>
      </div>
      
      <div style={styles.divider}></div>
      
      <PriceAlertForm currentPrice={currentPrice} />
    </div>
  );
};

// Price statistics component
const PriceStats = ({ priceData }) => {
  // Calculate statistics
  const prices = priceData.map(item => item.price);
  const average = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const current = prices[prices.length - 1];
  
  // Calculate percent change from previous month
  const previousPrice = prices.length > 1 ? prices[prices.length - 2] : current;
  const percentChange = ((current - previousPrice) / previousPrice) * 100;
  
  const stats = [
    { label: "Current", value: `$${current}`, 
      icon: <DollarSign size={18} color="#3b82f6" /> },
    { label: "Average", value: `$${average.toFixed(2)}`, 
      icon: <Settings size={18} color="#6b7280" /> },
    { label: "Lowest", value: `$${min}`, 
      icon: <TrendingDown size={18} color="#10b981" /> },
    { label: "Highest", value: `$${max}`, 
      icon: <TrendingUp size={18} color="#ef4444" /> },
  ];

  return (
    <div style={styles.grid}>
      {stats.map((stat, index) => (
        <div key={index} style={styles.statCard}>
          <div style={styles.iconWithText}>
            {stat.icon}
            <span style={styles.grayText}>{stat.label}</span>
          </div>
          <div style={{fontSize: "20px", fontWeight: "600", color: "#333"}}>{stat.value}</div>
          
          {stat.label === "Current" && (
            <div style={{
              fontSize: "12px", 
              marginTop: "4px", 
              color: percentChange > 0 ? "#ef4444" : "#10b981"
            }}>
              {percentChange.toFixed(1)}% {percentChange > 0 ? '↑' : '↓'} from last month
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Table view component
const PriceTable = ({ priceData }) => {
  return (
    <div style={styles.card}>
      <div style={{overflowX: "auto"}}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>Month</th>
              <th style={styles.tableHeaderCell}>Price ($)</th>
              <th style={styles.tableHeaderCell}>Avg. Market Price ($)</th>
              <th style={styles.tableHeaderCell}>Min ($)</th>
              <th style={styles.tableHeaderCell}>Max ($)</th>
            </tr>
          </thead>
          <tbody>
            {priceData.map((entry, index) => (
              <tr key={index} style={{
                ...styles.tableRow,
                ...(index % 2 === 0 ? {} : styles.tableRowAlt)
              }}>
                <td style={styles.tableCell}>{entry.month}</td>
                <td style={{...styles.tableCell, color: "#3b82f6", fontWeight: "500"}}>${entry.price}</td>
                <td style={styles.tableCell}>${entry.avg}</td>
                <td style={{...styles.tableCell, color: "#10b981"}}>${entry.min}</td>
                <td style={{...styles.tableCell, color: "#ef4444"}}>${entry.max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PriceTrackingPage = ({ id = "1" }) => {
  // Default to item1 if no ID is provided
  const itemId = `item${id}`;
  const priceData = mockPriceData[itemId] || [];
  
  // State for view preferences
  const [viewMode, setViewMode] = useState('line');
  const [timeRange, setTimeRange] = useState('12');
  const [dataView, setDataView] = useState('chart');
  const [isMobile, setIsMobile] = useState(false);
  
  // Check window size for responsive design
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Filter data based on time range
  const filteredData = priceData.slice(-parseInt(timeRange));
  
  // Get current price (most recent)
  const currentPrice = priceData.length > 0 ? priceData[priceData.length - 1].price : 0;
  
  // Get product information
  const product = { ...productInfo[itemId], id };

  // Calculate the average price line data
  const avgPrice = filteredData.reduce((sum, item) => sum + item.price, 0) / filteredData.length;
  
  // Define the chart colors
  const chartColors = {
    price: "#3b82f6", // blue
    average: "#9ca3af", // gray
    min: "#10b981", // green
    max: "#ef4444"  // red
  };

  return (
    <div style={styles.container}>
      <div style={{
        ...styles.flexRow,
        ...(isMobile ? styles.mobileStyles.flexRow : {})
      }}>
        {/* Product information sidebar */}
        <div style={{
          ...styles.sidebar,
          ...(isMobile ? styles.mobileStyles.sidebar : {})
        }}>
          <ProductSidebar productData={product} currentPrice={currentPrice} />
        </div>
        
        {/* Main content area */}
        <div style={styles.mainContent}>
          <div style={{marginBottom: "24px"}}>
            <h1 style={styles.heading}>
              Price History: {product.name}
            </h1>
            <p style={styles.text}>
              Track price changes over time and set alerts for the best time to buy.
            </p>
          </div>
          
          {/* Price statistics section */}
          <PriceStats priceData={filteredData} />
          
          {/* Chart/Table toggle */}
          <div style={{
            ...styles.toggleContainer,
            display: "inline-flex",
            marginBottom: "16px"
          }}>
            <button
              onClick={() => setDataView('chart')}
              style={{
                ...styles.toggleButton,
                ...(dataView === 'chart' ? styles.activeButton : styles.inactiveButton)
              }}
            >
              <BarChart2 size={16} />
              <span>Chart</span>
            </button>
            <button
              onClick={() => setDataView('table')}
              style={{
                ...styles.toggleButton,
                ...(dataView === 'table' ? styles.activeButton : styles.inactiveButton)
              }}
            >
              <List size={16} />
              <span>Table</span>
            </button>
          </div>
          
          {/* Chart controls */}
          {dataView === 'chart' && (
            <ChartControls 
              viewMode={viewMode} 
              setViewMode={setViewMode} 
              timeRange={timeRange} 
              setTimeRange={setTimeRange} 
            />
          )}
          
          {/* Price data visualization */}
          {dataView === 'chart' ? (
            <div style={styles.card}>
              <div style={styles.responsiveContainer}>
              <ResponsiveContainer width="100%" height={400}>
                  {viewMode === 'line' ? (
                    <LineChart data={filteredData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <ReferenceLine y={avgPrice} label="Avg" stroke={chartColors.average} strokeDasharray="3 3" />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke={chartColors.price} 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                        activeDot={{ r: 6 }} 
                        name="Product Price" 
                      />
                    </LineChart>
                  ) : (
                    <LineChart data={filteredData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke={chartColors.price} 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                        activeDot={{ r: 6 }} 
                        name="Product Price" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="avg" 
                        stroke={chartColors.average} 
                        strokeDasharray="3 3" 
                        name="Market Average" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="min" 
                        stroke={chartColors.min} 
                        name="Lowest Price" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="max" 
                        stroke={chartColors.max} 
                        name="Highest Price" 
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <PriceTable priceData={filteredData} />
          )}
          
          {/* Recommendations section */}
          <div style={styles.card}>
            <h3 style={styles.subheading}>Price Analysis & Recommendations</h3>
            <p style={styles.text}>
              Based on historical pricing data, this product is currently {
                currentPrice <= product.lowestPrice ? (
                  <span style={styles.greenText}>at its lowest price point</span>
                ) : currentPrice >= product.highestPrice ? (
                  <span style={styles.redText}>at its highest price point</span>
                ) : (
                  <span>priced at <strong>${currentPrice}</strong>, which is {
                    currentPrice < avgPrice ? (
                      <span style={styles.greenText}>${(avgPrice - currentPrice).toFixed(2)} below</span>
                    ) : (
                      <span style={styles.redText}>${(currentPrice - avgPrice).toFixed(2)} above</span>
                    )
                  } the average market price of <strong>${avgPrice.toFixed(2)}</strong></span>
                )
              }.
            </p>
            
            <div style={styles.divider}></div>
            
            <div style={styles.iconWithText}>
              <Calendar size={18} color="#3b82f6" />
              <h4 style={styles.smallHeading}>Best Time to Buy</h4>
            </div>
            <p style={styles.text}>
              Historically, prices for this product tend to be lowest during {
                priceData.reduce((lowest, current, index) => 
                  current.price < priceData[lowest].price ? index : lowest, 0
                ) % 12 < 3 ? "Q1 (January-March)" : 
                priceData.reduce((lowest, current, index) => 
                  current.price < priceData[lowest].price ? index : lowest, 0
                ) % 12 < 6 ? "Q2 (April-June)" : 
                priceData.reduce((lowest, current, index) => 
                  current.price < priceData[lowest].price ? index : lowest, 0
                ) % 12 < 9 ? "Q3 (July-September)" : "Q4 (October-December)"
              }. 
              {currentPrice <= (avgPrice * 0.95) ? (
                <span style={styles.greenText}> Current price is a good deal compared to typical market prices.</span>
              ) : currentPrice >= (avgPrice * 1.05) ? (
                <span style={styles.redText}> You might want to wait for a price drop.</span>
              ) : (
                <span> Current price is close to the average market price.</span>
              )}
            </p>
          </div>
          
          {/* Similar products section */}
          <div style={styles.card}>
            <h3 style={styles.subheading}>Similar Products</h3>
            <div style={{
              ...styles.grid,
              ...(isMobile ? styles.mobileStyles.grid : {})
            }}>
              {Object.keys(productInfo)
                .filter(key => key !== itemId)
                .map((key, index) => {
                  const similarProduct = productInfo[key];
                  const similarProductPrice = mockPriceData[key][mockPriceData[key].length - 1].price;
                  
                  return (
                    <div key={index} style={{padding: "8px"}}>
                      <img 
                        src={productImages[key]} 
                        alt={similarProduct.name} 
                        style={{...styles.productImage, height: "120px"}}
                      />
                      <h4 style={{fontSize: "14px", fontWeight: "600"}}>{similarProduct.name}</h4>
                      <div style={{
                        display: "flex", 
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "4px"
                      }}>
                        <span style={{...styles.blueText, fontWeight: "600"}}>${similarProductPrice}</span>
                        <button style={{...styles.button, ...styles.primaryButton, padding: "4px 8px", fontSize: "12px"}}>
                          View
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceTrackingPage;