import { curry, map } from 'ramda';
import { makeSimpleVirus, doesReproduce } from './simpleVirus'

const isResistentAgainst = (drug, resistences) => resistences[drug];

export const isResistent = curry((drugs, patientWithDrugs) => {
  const resistences = patientWithDrugs.get('resistences');
  if (drugs.length) {
    return drugs.reduce(
      (bool, drug) => bool ? isResistentAgainst(drug, resistences) : false,
      true,
    )
  }
  return true;
});

export const doesReproduceWithDrugs = curry(
  (popDensity, drugs, patientWithDrugs) => {
  return doesReproduce(popDensity, patientWithDrugs)
    && isResistent(drugs, patientWithDrugs);
});
  

export function mutateResistences(patientWithDrugs) {
  const mutateResistence = resistence => (
    Math.random() < patientWithDrugs.get('muteProb')
    ? !resistence
    : resistence
  );
  return patientWithDrugs.set(
    'resistences',
    map(mutateResistence, patientWithDrugs.get('resistences'))
  )
}

function withResistences(simpleVirus, resistences, muteProb = 0.005) {
  return simpleVirus.set('resistences', resistences).set('muteProb', muteProb)
};

export const makeResistentVirus = resistences => (
  withResistences(makeSimpleVirus(), resistences)
);

const makeResistentVirusArray = (length, resistences) => Array(length).fill(makeResistentVirus(resistences));

export default makeResistentVirusArray;