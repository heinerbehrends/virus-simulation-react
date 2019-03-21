import React from 'react';
import { List }from 'immutable';
import LineChart from './LineChart';
import makeVirusArray, { makeResistentVirusArray } from './viruses';
import makePatient, { makePatientWithDrugs } from './patients';
import runSimulation, { simulationWithDrugs, simpleSim, sim } from './simulations';

const initialViruses = List(
  makeResistentVirusArray(
    100, 
    { guttagonol: false, grimpex: false },
  )
);

const Patient = makePatientWithDrugs({
  initialViruses,
  maxPop: 1000,
});

const layout = { 
  width: 320, 
  height: 240, 
  title: 'Simple Virus Population Simulation' 
};

const App = () => (
  <>
    <LineChart 
      arrays={
        runSimulation({
          func: simpleSim,
          patient: makePatient(makeVirusArray(100)),
          repetitions: 300,
        })
      } 
      layout={ layout } 
    />
    <LineChart 
      arrays= {
        simulationWithDrugs({
          func: sim,
          patient: Patient,
          repetitions: 300,
        })
       }
      layout={ { ...layout, title: 'Virus Population with drug and resistence' } } 
    />
  </>
);

export default App;
