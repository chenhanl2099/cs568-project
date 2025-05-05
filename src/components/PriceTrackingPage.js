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

// Mock product images
const productImages = {
  item1: "/api/placeholder/400/320",
  item2: "/api/placeholder/400/320",
  item3: "/api/placeholder/400/320"
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
      <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
        <p className="font-bold text-gray-800">{label}</p>
        <p className="text-blue-500 font-medium">
          Price: ${payload[0].value.toFixed(2)}
        </p>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-gray-600 text-sm">Market Average: ${currentData.avg.toFixed(2)}</p>
          <p className="text-green-600 text-sm">Min: ${currentData.min.toFixed(2)}</p>
          <p className="text-red-600 text-sm">Max: ${currentData.max.toFixed(2)}</p>
        </div>
      </div>
    );
  }
  return null;
};

// Custom price badge component
const PriceBadge = ({ type, price }) => {
  const styles = {
    current: "bg-blue-100 text-blue-800 border-blue-200",
    lowest: "bg-green-100 text-green-800 border-green-200",
    highest: "bg-red-100 text-red-800 border-red-200",
    msrp: "bg-purple-100 text-purple-800 border-purple-200",
  };
  
  return (
    <div className={`px-3 py-1 rounded-full border ${styles[type]} inline-flex items-center`}>
      <DollarSign className="w-4 h-4 mr-1" />
      <span className="font-medium">{price}</span>
    </div>
  );
};

// Price notification component
const PriceAlertForm = ({ currentPrice }) => {
  const [targetPrice, setTargetPrice] = useState(currentPrice - 5);
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center mb-3">
        <Bell className="text-blue-500 w-5 h-5 mr-2" />
        <h3 className="font-medium text-gray-800">Price Alert</h3>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Notify me when price drops below:</label>
        <div className="flex items-center">
          <span className="bg-gray-100 p-2 rounded-l-md border border-gray-300">$</span>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded-r-md flex-grow"
          />
        </div>
      </div>
      
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 flex items-center justify-center">
        <Bell className="w-4 h-4 mr-2" />
        Set Alert
      </button>
    </div>
  );
};

// Chart control panel component
const ChartControls = ({ viewMode, setViewMode, timeRange, setTimeRange }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-3">
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setViewMode('line')}
          className={`p-2 rounded-l-md ${viewMode === 'line' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          <TrendingUp className="w-5 h-5" />
        </button>
        <button
          onClick={() => setViewMode('bar')}
          className={`p-2 rounded-r-md ${viewMode === 'bar' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          <BarChart2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-gray-600 text-sm">Time Range:</span>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border border-gray-300 rounded-md p-1 text-sm bg-white"
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
  const stars = Array(5).fill(0).map((_, i) => (
    <span key={i} className={`text-lg ${i < Math.floor(productData.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
  ));

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="mb-4">
        <img 
          src={productImages[`item${productData.id}`]} 
          alt={productData.name} 
          className="w-full h-48 object-cover rounded-md mb-3"
        />
        <h2 className="text-xl font-semibold text-gray-800">{productData.name}</h2>
        <p className="text-gray-600">{productData.brand}</p>
        
        <div className="flex items-center mt-2 mb-3">
          <div className="flex mr-2">{stars}</div>
          <span className="text-gray-500 text-sm">({productData.reviews} reviews)</span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-3 mb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          <PriceBadge type="current" price={`$${currentPrice}`} />
          <PriceBadge type="msrp" price={`$${productData.msrp}`} />
        </div>
        
        <div className="flex items-center justify-between text-sm my-2">
          <div className="flex items-center text-green-600">
            <TrendingDown className="w-4 h-4 mr-1" />
            <span>Lowest: ${productData.lowestPrice}</span>
          </div>
          <div className="flex items-center text-red-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>Highest: ${productData.highestPrice}</span>
          </div>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-md border border-blue-100 mt-3 text-sm">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-blue-800">
              Price is <strong>{currentPrice === productData.lowestPrice ? 'at the lowest' : 
              (currentPrice < productData.msrp ? `${Math.round((1 - currentPrice/productData.msrp) * 100)}% below MSRP` : 
              'at MSRP')}</strong>. Good time to buy!
            </p>
          </div>
        </div>
      </div>
      
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
      icon: <DollarSign className="w-5 h-5 text-blue-500" /> },
    { label: "Average", value: `$${average.toFixed(2)}`, 
      icon: <Settings className="w-5 h-5 text-gray-500" /> },
    { label: "Lowest", value: `$${min}`, 
      icon: <TrendingDown className="w-5 h-5 text-green-500" /> },
    { label: "Highest", value: `$${max}`, 
      icon: <TrendingUp className="w-5 h-5 text-red-500" /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center mb-1">
            {stat.icon}
            <span className="text-gray-600 text-sm ml-2">{stat.label}</span>
          </div>
          <div className="text-xl font-semibold text-gray-800">{stat.value}</div>
          
          {stat.label === "Current" && (
            <div className={`text-sm mt-1 ${percentChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Month</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Price ($)</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Avg. Market Price ($)</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Min ($)</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Max ($)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {priceData.map((entry, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-3 text-sm text-gray-800">{entry.month}</td>
                <td className="px-6 py-3 text-sm font-medium text-blue-600">${entry.price}</td>
                <td className="px-6 py-3 text-sm text-gray-600">${entry.avg}</td>
                <td className="px-6 py-3 text-sm text-green-600">${entry.min}</td>
                <td className="px-6 py-3 text-sm text-red-600">${entry.max}</td>
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
    price: "#3b82f6", // blue-500
    average: "#9ca3af", // gray-400
    min: "#10b981", // green-500
    max: "#ef4444"  // red-500
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product information sidebar */}
        <div className="lg:w-1/3 order-2 lg:order-1">
          <ProductSidebar productData={product} currentPrice={currentPrice} />
        </div>
        
        {/* Main content area */}
        <div className="lg:w-2/3 order-1 lg:order-2">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Price History: {product.name}
            </h1>
            <p className="text-gray-600">
              Track price changes over time and set alerts for the best time to buy.
            </p>
          </div>
          
          {/* Price statistics section */}
          <PriceStats priceData={filteredData} />
          
          {/* Chart/Table toggle */}
          <div className="flex items-center mb-4 bg-gray-100 p-1 rounded-md inline-flex">
            <button
              onClick={() => setDataView('chart')}
              className={`py-1 px-3 rounded ${dataView === 'chart' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
            >
              <div className="flex items-center">
                <BarChart2 className="w-4 h-4 mr-1" />
                <span>Chart</span>
              </div>
            </button>
            <button
              onClick={() => setDataView('table')}
              className={`py-1 px-3 rounded ${dataView === 'table' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
            >
              <div className="flex items-center">
                <List className="w-4 h-4 mr-1" />
                <span>Table</span>
              </div>
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
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={filteredData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    domain={['dataMin - 5', 'dataMax + 5']}
                    tick={{ fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="top" 
                    height={36}
                    formatter={(value) => <span className="text-gray-700">{value}</span>}
                  />
                  <ReferenceLine 
                    y={avgPrice} 
                    stroke="#9ca3af" 
                    strokeDasharray="3 3"
                    label={{ 
                      value: `Avg: $${avgPrice.toFixed(2)}`,
                      position: 'insideBottomRight',
                      fill: '#9ca3af',
                      fontSize: 12
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    name="Price" 
                    stroke={chartColors.price}
                    strokeWidth={3}
                    dot={{ fill: chartColors.price, r: 4 }}
                    activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                    animationDuration={1000}
                  />
                  {viewMode !== 'line' && (
                    <>
                      <Line 
                        type="monotone" 
                        dataKey="min" 
                        name="Min Price" 
                        stroke={chartColors.min} 
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="max" 
                        name="Max Price" 
                        stroke={chartColors.max} 
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={false}
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <PriceTable priceData={filteredData} />
          )}
          
          {/* Price insights */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Price Insights</h3>
            <div className="text-gray-700 space-y-3">
              <p>
                <span className="font-medium">Best time to buy:</span> Based on historical data, 
                the best months to purchase this item are typically April and October, when prices 
                drop to their lowest points.
              </p>
              <p>
                <span className="font-medium">Price pattern:</span> This product tends to follow 
                a seasonal pricing pattern, with higher prices during February and August, possibly 
                due to increased demand during these periods.
              </p>
              <p>
                <span className="font-medium">Prediction:</span> Based on current trends, we expect 
                prices to {currentPrice > avgPrice ? 'decrease' : 'increase'} in the coming months. 
                Consider {currentPrice > avgPrice ? 'waiting for a better deal' : 'buying now before prices rise'}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceTrackingPage;