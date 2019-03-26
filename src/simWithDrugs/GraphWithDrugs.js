import React from 'react';
import Plot from 'react-plotly.js';
import { simulationWithDrugs, sim } from './simWithDrugs';
import makePatientWithDrugs from '../patients/patientWithDrugs';
import makeResistentVirusArray from '../viruses/resistentVirus';

const GraphWithDrugs = ({ drugTime, layout }) => {
  const makePlot = arr => (
    {
      x: Array.from(Array(arr.length).keys()),
      y: arr,
      mode: 'lines',
    }
  );
  const makeData = arrays => (
    arrays.map(
      array => makePlot(array)
    )
  )
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
      data={ makeData(resultArrays) }
      layout={ layout }
    />
  );
};

export default GraphWithDrugs;