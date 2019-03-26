import { curry, map } from 'ramda';
import { makeSimpleVirus, doesReproduce } from './simpleVirus'

const isResistentAgainst = (drug, resistences) => resistences[drug];

export const isResistent = curry((drugs, { resistences }) => {
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
  

export function mutateResistences({ resistences, muteProb }) {
  const mutateResistence = resistence => (
    Math.random() < muteProb
    ? !resistence
    : resistence
  );
  return makeResistentVirus(
    map(mutateResistence, resistences)
  )
}

function withResistences (simpleVirus, resistences, muteProb = 0.005) {
  return Object.freeze({
    ...simpleVirus,
    resistences,
    muteProb
  });
};

export const makeResistentVirus = resistences => (
  withResistences(makeSimpleVirus(), resistences)
);

const makeResistentVirusArray = (length, resistences) => Array(length).fill(makeResistentVirus(resistences));

export default makeResistentVirusArray;