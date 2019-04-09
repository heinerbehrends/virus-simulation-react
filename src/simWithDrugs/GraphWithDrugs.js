import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { layout, makePlot } from '../simpleSim/SimpleGraph';

const GraphWithDrugs = ({ resultArrays, title }) => {
  function makeData(arrays) {
    return arrays.map(
      array => makePlot(array),
    );
  }

  return (
    <Plot
      data={makeData(resultArrays)}
      layout={{ ...layout, title }}
      useResizeHandler
      style={{ width: '100%' }}
      yaxis={{ styleanchor: 'x' }}
    />
  );
};

GraphWithDrugs.propTypes = {
  resultArrays: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
};

export default GraphWithDrugs;
