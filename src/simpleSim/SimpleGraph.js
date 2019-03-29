import React from 'react';
import Plot from 'react-plotly.js';
import simpleSim, { runSimulation } from './simpleSim';
import makePatient from '../patients/simplePatient';
import makeVirusArray from '../viruses/simpleVirus';

export const layout = { 
  title: 'Simple Virus Population Simulation',
  autosize: true,
};

export const makePlot = arr => (
  {
    x: Array.from(Array(arr.length).keys()),
    y: arr,
    mode: 'lines',
  }
);

const SimpleGraph = ({ simData }) => (
  <Plot
    data={[makePlot(simData)]}
    layout={ layout }
    useResizeHandler
    style={{width: "100%"}}
    yaxis={{styleanchor: "x"}}
  />
);

// const SimpleGraph = (
//   {
//     startCount, 
//     repetitions, 
//     maxPop, 
//     birthProb, 
//     clearProb,
//   }
// ) => {
//   const [ , simData] = runSimulation({
//     func: simpleSim,
//     patient: makePatient(makeVirusArray({
//       length: startCount,
//       birthProb, 
//       clearProb,
//     }), maxPop),
//     repetitions,
//   });

//   return (
//     <Plot
//       data={ [makePlot(simData)] }
//       layout={ layout }
//       useResizeHandler
//       style={{width: "100%"}}
//       yaxis={{styleanchor: "x"}}
//     />
//   );
// };

export default SimpleGraph;