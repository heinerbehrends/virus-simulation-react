import React from 'react';
import { List } from 'immutable';
import LineChart from './LineChart';
import makeSimpleVirus from './viruses';
import makePatient from './patients';

const maxPop = 1000;
const makeZeroBasedArray = length => Array.from(Array(length).keys());
const simulation = patientObj => (
  List([...Array(300)])
    .map(() => {
      patientObj.update();
      return patientObj.getVirusCount();
    })
);

const sim = simulation(
  makePatient(Array(10).fill(makeSimpleVirus()), maxPop)
).toArray();

const data = [
  {
    x: makeZeroBasedArray(sim.length),
    y: sim,
    mode: 'lines',
  }
];

const layout = { width: 320, height: 240, title: 'A Fancy Plot' };

const App = () => {
  return (
    <LineChart data={ data } layout={ layout } />
  )
};

export default App;
