import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import simulationWithDrugs from './simWithDrugs';
import { layout, makePlot } from '../simpleSim/SimpleGraph';
// import makePatientWithDrugs from '../patients/patientWithDrugs';
// import makeResistentVirusArray from '../viruses/resistentVirus';

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
  drugTime: PropTypes.number.isRequired,
  maxPop: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default GraphWithDrugs;
