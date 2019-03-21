import React from 'react';
import Plot from 'react-plotly.js';

const LineChart = ({ array, layout }) => {
  const makeData = arr => (
    [{
      x: Array.from(Array(arr.length).keys()),
      y: arr,
      mode: 'lines',
    }]
  );
  
  return (
    <Plot
      data={ makeData(array) }
      layout={ layout }
    />
  );
};

export default LineChart;