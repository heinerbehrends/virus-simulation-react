import React from 'react';
import Histogram from './Histogram';
import makeResistentVirusArray from './viruses/resistentVirus';
import makePatientWithDrugs from './patients/patientWithDrugs';
import makeHistoSimArray from './simulations/histoSims';
import SimpleGraph from './simpleSim/SimpleGraph';
import GraphWithDrugs from './simWithDrugs/GraphWithDrugs';

// console.time('histo')
// makeHistoSimArray({
//   patient: makePatientWithDrugs({
//     initialViruses: makeResistentVirusArray(
//       100, 
//       { guttagonol: false, grimpex: false },
//     ),
//     maxPop: 1000,
//   }),
//   repetitions: 100,
//   drugTime: 150,
// }).toArray()
// console.timeEnd('histo')

const layout = { 
  width: 320, 
  height: 240, 
  title: 'Simple Virus Population Simulation' 
};

const App = () => (
  <>
    <SimpleGraph
      startCount={100}
      repetitions={300}
      maxPop={1000}
      layout={ layout } 
    />
    <GraphWithDrugs 
      drugTime={100}
      layout={ { ...layout, title: 'Virus Population with drug and resistence' } } 
    />
    <Histogram
      array={
        makeHistoSimArray({
          patient: makePatientWithDrugs({
            initialViruses: makeResistentVirusArray(
              100, 
              { guttagonol: false, grimpex: false },
            ),
            maxPop: 1000,
          }),
          repetitions: 100,
          drugTime: 150,
        }).toArray()
      }
      layout={ { ...layout, title: 'Histogram of virus population' } } 
    />
  </>
);

export default App;
