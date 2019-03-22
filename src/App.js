import React from 'react';
import LineChart from './LineChart';
import Histogram from './Histogram';
import makeVirusArray, { makeResistentVirusArray } from './viruses';
import makePatient, { makePatientWithDrugs } from './patients';
import runSimulation, { simulationWithDrugs, simpleSim, sim } from './simulations/lineChartSims';
import makeHistoSimArray from './simulations/histoSims';

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
          patient: makePatientWithDrugs({
            initialViruses: makeResistentVirusArray(
              100, 
              { guttagonol: false, grimpex: false },
            ),
            maxPop: 1000,
          }),
          repetitions: 300,
        })
       }
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
          repetitions: 50,
          drugTime: 150,
        }).toArray()
      }
      layout={ { ...layout, title: 'Histogram of virus population' } } 
    />
  </>
);

export default App;
