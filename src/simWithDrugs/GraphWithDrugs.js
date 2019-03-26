import React from 'react';
import Plot from 'react-plotly.js';
import { simulationWithDrugs, sim } from './simWithDrugs';
import { layout, makePlot } from '../simpleSim/SimpleGraph';
import makePatientWithDrugs from '../patients/patientWithDrugs';
import makeResistentVirusArray from '../viruses/resistentVirus';

const GraphWithDrugs = ({ drugTime, title }) => {
  const makeData = arrays => (
    arrays.map(
      array => makePlot(array)
    )
  );
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

export default GraphWithDrugs;