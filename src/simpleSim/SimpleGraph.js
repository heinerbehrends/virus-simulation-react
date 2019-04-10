import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

export const layout = {
  title: 'Simple Virus Population Simulation',
  height: 400,
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
    layout={layout}
    useResizeHandler
    style={{ maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}
  />
);

SimpleGraph.propTypes = {
  simData: PropTypes.arrayOf(PropTypes.numbers).isRequired,
};

export default SimpleGraph;
