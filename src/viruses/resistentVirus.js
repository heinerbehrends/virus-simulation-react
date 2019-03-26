import { map } from 'ramda';
import { makeSimpleVirus } from './simpleVirus';

function withResistences ({ doesSurvive, doesReproduce }, initialResistences, muteProb = 0.005) {
  let resistences = initialResistences;
  const isResistentAgainst = drug => resistences[drug];

  function mutateResistences() {
    const mutateResistence = resistence => (
      Math.random() < muteProb
      ? !resistence
      : resistence
    );
    return makeResistentVirus(
      map(mutateResistence, resistences)
    )
  }

  const isResistent = drugs => {
    if (drugs.length) {
      return drugs.reduce(
        (bool, drug) => bool ? isResistentAgainst(drug) : false,
        true,
      )
    }
    return true;
  };  

  return Object.freeze({
    doesSurvive,
    doesReproduce,
    isResistentAgainst,
    mutateResistences,
    isResistent,
  });
};

export const makeResistentVirus = resistences => (
  withResistences(makeSimpleVirus(), resistences)
);

const makeResistentVirusArray = (length, resistences) => Array(length).fill(makeResistentVirus(resistences));

export default makeResistentVirusArray;