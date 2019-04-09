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

  const [virusCount, resistentCount] = makeData(resultArrays);

  return (
    <Plot
      data={[
        Object.defineProperty(virusCount, 'name', { value: 'Virus count' }),
        Object.defineProperty(resistentCount, 'name', { value: 'Resistent virus count' }),
      ]}
      layout={{ ...layout, title, showlegend: false }}
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
