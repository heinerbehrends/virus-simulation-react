import React from 'react';
import { List }from 'immutable';
import { repeat, mapAccum } from 'ramda';
import LineChart from './LineChart';
import makeVirusArray, { makeResistentVirusArray } from './viruses';
import makePatient, { makePatientWithDrugs } from './patients';
import simulation from './simulations';

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

const sim = patient => {
  return [
    patient.updateViruses(),
    patient.getVirusCount(),
  ]
}

function runSimulation({
  func, patient, repetitions
}) {
  return mapAccum(
    func,
    patient,
    repeat(null, repetitions)
  )
}


function simulationWithDrugs({
  func,
  patient,
  repetitions,
}) {
  const [newPatient, firstArray] = runSimulation({
    func,
    patient,
    repetitions: repetitions / 2,
  });
  
  newPatient.addDrug('guttagonol')
  
  return firstArray.concat(
    runSimulation({
      func,
      patient: newPatient,
      repetitions: repetitions / 2,
    })[1]
  )
  }

const layout = { 
  width: 320, 
  height: 240, 
  title: 'Simple Virus Population Simulation' 
};

const App = () => (
  <>
    <LineChart 
      array={
        simulation({
          Patient: makePatient(makeVirusArray(100)),
          iterations: 300,
        })    
      } 
      layout={ layout } 
    />
    <LineChart 
      array= { 
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
