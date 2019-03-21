import React from 'react';
import { List }from 'immutable';
import { curry, pipe } from 'ramda';
import LineChart from './LineChart';
import Histogram from './Histogram';
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

const repeatVirusUpdate = curry(
  (iterations, patient) => (
    List([...Array(iterations)]).reduce(
      acc => acc.updateViruses(),
      patient
    )
  )
);
const addDrug = curry(
  (drug, patient) => patient.addDrug(drug)
);

const histoSim = drugTime => pipe(
  repeatVirusUpdate(drugTime),
  addDrug('guttagonol'),
  repeatVirusUpdate(150),
)
const makeHistoSimArray = ({repetitions, drugTime}) => (
  List([...Array(repetitions)]).map(
    () => histoSim(drugTime)(Patient).getVirusCount()
  )
)

console.log(makeHistoSimArray({repetitions: 50, drugTime: 50}).toArray())

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
    <Histogram
      array={
        makeHistoSimArray({repetitions: 50, drugTime: 150}).toArray()
      }
      layout={ { ...layout, title: 'Histogram of virus population' } } 
    />
  </>
);

export default App;
