import React from 'react';
import Plot from 'react-plotly.js';

export const layout = { 
  title: 'Simple Virus Population Simulation',
  autosize: true,
};

export const makePlot = arr => (
  {
    x: Array.from(Array(arr.length).keys()),
    y: arr,
    mode: 'lines',
  }
);

const SimpleGraph = ({ simData }) => (
  <Plot
    data={[makePlot(simData)]}
    layout={ layout }
    useResizeHandler
    style={{width: "100%"}}
    yaxis={{styleanchor: "x"}}
  />
);

export default SimpleGraph;