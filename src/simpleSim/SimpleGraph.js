import React from 'react';
import Plot from 'react-plotly.js';

export const makePlot = arr => (
  [{
    x: Array.from(Array(arr.length).keys()),
    y: arr,
    mode: 'lines',
  }]
);

const SimpleGraph = ({ array, layout }) => {
  return (
    <Plot
      data={ makePlot(array[1]) }
      layout={ layout }
    />
  );
};

export default SimpleGraph;