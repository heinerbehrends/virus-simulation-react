import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { layout } from '../simpleSim/SimpleGraph';

const Histogram = ({ simData, title }) => {
  const makeData = arr => (
    [{
      x: arr,
      type: 'histogram',
      xbins: {
        size: 10,
      },
    }]
  );

  return (
    <Plot
      style={{ maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}
      data={makeData(simData)}
      useResizeHandler
      layout={{ ...layout, title }}
    />
  );
};

Histogram.propTypes = {
  simData: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
};

export default Histogram;
