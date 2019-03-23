import { map } from 'ramda';
import { Map } from 'immutable';

const makeSimpleVirus = (birthProb = 0.1, clearProb = 0.05) => {
  function doesReproduce(popDensity) {
    return Math.random() < birthProb * (1 - popDensity);
  };
  function doesSurvive() {
    return Math.random() > clearProb;
  };
  
  return Map({
    birthProb,
    clearProb,
    doesSurvive,
    doesReproduce,
    })
} ;

function withResistences (virusMap, initialResistences, muteProb = 0.005) {
  const resistences = initialResistences;
  const doesSurvive = virusMap.get('doesSurvive');
  const doesReproduce = virusMap.get('doesReproduce');


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

  return Map({
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

const makeVirusArray = length => Array(length).fill(makeSimpleVirus());

export const makeResistentVirusArray = ({length, resistences}) => Array(length).fill(makeResistentVirus(resistences));


export default makeVirusArray;