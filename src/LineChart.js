import React from 'react';
import Plot from 'react-plotly.js';

const LineChart = ({ arrays, layout }) => {
  const makePlot = arr => (
    {
      x: Array.from(Array(arr.length).keys()),
      y: arr,
      mode: 'lines',
    }
  );
  const makeData = arrays => (
    arrays.map(
      array => makePlot(array)
    )
  )
  
  return (
    <Plot
      data={ makeData(arrays) }
      layout={ layout }
    />
  );
};

export default LineChart;