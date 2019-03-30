import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { simulationWithDrugs, sim } from './simWithDrugs';
import { layout, makePlot } from '../simpleSim/SimpleGraph';
import makePatientWithDrugs from '../patients/patientWithDrugs';
import makeResistentVirusArray from '../viruses/resistentVirus';

const GraphWithDrugs = ({ drugTime, title }) => {
  function makeData(arrays) {
    return arrays.map(
      array => makePlot(array),
    );
  }
  const resultArrays = simulationWithDrugs({
    func: sim,
    patient: makePatientWithDrugs({
      initialViruses: makeResistentVirusArray(
        100,
        { guttagonol: false, grimpex: false },
      ),
      maxPop: 1000,
    }),
    drugTime,
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
  title: PropTypes.string.isRequired,
};

export default GraphWithDrugs;
