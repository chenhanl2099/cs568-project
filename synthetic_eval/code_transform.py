import json

def escape_multiline_code(source_code: str) -> str:
    """
    Takes a raw multiline source code string and returns a JSON-safe string,
    escaping newlines, quotes, and backslashes.

    Args:
        source_code (str): Multiline source code.

    Returns:
        str: Escaped JSON-compatible string.
    """
    return json.dumps(source_code)

if __name__ == "__main__":
    # Hardcoded multiline source code
    source_code = """
import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import PropTypes from 'prop-types';

/**
 * Reusable price tracking line chart.
 */
const PriceTrackingChart = ({ data }) => {
  if (!data?.length) return <p style={{ textAlign: 'center' }}>No price data available.</p>;

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

PriceTrackingChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PriceTrackingChart;
    """.strip()

    escaped_string = escape_multiline_code(source_code)

    print("\nEscaped JSON string:\n")
    print(escaped_string)
