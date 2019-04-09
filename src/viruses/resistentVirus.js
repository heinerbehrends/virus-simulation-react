import { map } from 'ramda';
import { makeSimpleVirus } from './simpleVirus';

function withResistences(
  { doesSurvive, doesReproduce },
  initialResistences,
  muteProb = 0.005,
) {
  const resistences = initialResistences;
  const isResistentAgainst = drug => resistences[drug];

  function mutateResistences() {
    const mutateResistence = resistence => (
      Math.random() < muteProb
        ? !resistence
        : resistence
    );
    return withResistences(
      makeSimpleVirus(),
      map(mutateResistence, resistences),
    );
  }

  const isResistent = drugs => (
    drugs.length
      ? drugs.reduce(
        (bool, drug) => (bool ? isResistentAgainst(drug) : false),
        true,
      )
      : true
  );

  return Object.freeze({
    doesSurvive,
    doesReproduce,
    isResistentAgainst,
    mutateResistences,
    isResistent,
  });
}

export const makeResistentVirus = resistences => (
  withResistences(makeSimpleVirus(), resistences)
);

const makeResistentVirusArray = (
  ({ virusCount, resistences }) => Array(virusCount).fill(makeResistentVirus(resistences))
);

export default makeResistentVirusArray;
