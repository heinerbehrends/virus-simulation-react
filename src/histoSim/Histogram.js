import React from 'react';
import Plot from 'react-plotly.js';
import makeHistoSimArray from './histoSims';
import { layout } from '../simpleSim/SimpleGraph';
import makePatientWithDrugs from '../patients/patientWithDrugs';
import makeResistentVirusArray from '../viruses/resistentVirus';

const Histogram = ({ drugTime, title }) => {
  const histoResult = makeHistoSimArray({
    patient: makePatientWithDrugs({
      initialViruses: makeResistentVirusArray(
        100, 
        { guttagonol: false, grimpex: false },
      ),
      maxPop: 1000,
    }),
    repetitions: 100,
    drugTime,
  }).toArray()

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
      data={ makeData(histoResult) }
      layout={ { ...layout, title } }
    />
  )
}

export default Histogram;