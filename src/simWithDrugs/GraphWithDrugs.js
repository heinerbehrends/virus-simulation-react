import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import simulationWithDrugs from './simWithDrugs';
import { layout, makePlot } from '../simpleSim/SimpleGraph';
// import makePatientWithDrugs from '../patients/patientWithDrugs';
// import makeResistentVirusArray from '../viruses/resistentVirus';

const GraphWithDrugs = ({ maxPop, drugTime, title }) => {
  function makeData(arrays) {
    return arrays.map(
      array => makePlot(array),
    );
  }
  const resultArrays = simulationWithDrugs({
    drugTime,
    virusCount: 100,
    resistences: { guttagonol: false },
    drugs: [],
    maxPop,
  });

  return (
    <Plot
      data={makeData(resultArrays)}
      layout={{ ...layout, title }}
    />
  );
};

GraphWithDrugs.propTypes = {
  drugTime: PropTypes.number.isRequired,
  maxPop: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default GraphWithDrugs;
