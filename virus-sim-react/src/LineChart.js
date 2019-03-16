import React from 'react';
import Plot from 'react-plotly.js';


const LineChart = ({ data, layout }) => (
  <Plot
    data={ data }
    layout={ layout }
  />
);

export default LineChart;