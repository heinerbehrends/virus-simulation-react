import React from 'react';
import Plot from 'react-plotly.js';
import simpleSim, { runSimulation } from './simpleSim';
import makePatient from '../patients/simplePatient';
import makeVirusArray from '../viruses/simpleVirus';

export const layout = { 
  width: 320, 
  height: 240, 
  title: 'Simple Virus Population Simulation' 
};

export const makePlot = arr => (
  {
    x: Array.from(Array(arr.length).keys()),
    y: arr,
    mode: 'lines',
  }
);

const SimpleGraph = ({ startCount, repetitions, maxPop }) => {
  const [ , simData] = runSimulation({
    func: simpleSim,
    patient: makePatient(makeVirusArray(startCount), maxPop),
    repetitions: repetitions,
  });

  return (
    <Plot
      data={ [makePlot(simData)] }
      layout={ layout }
    />
  );
};

export default SimpleGraph;