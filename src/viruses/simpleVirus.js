import { curry } from 'ramda';
import { Map } from 'immutable';

export const doesReproduce = curry(
  (popDensity, virus) => {
  return Math.random() < virus.get('birthProb') * (1 - popDensity);
});

export function doesSurvive(virus) {
  return Math.random() > virus.get('clearProb');
};

export const makeSimpleVirus = (birthProb = 0.1, clearProb = 0.05) => {
  return Map({
    birthProb,
    clearProb,
  })
} ;

const makeVirusArray = length => Array(length).fill(makeSimpleVirus());

export default makeVirusArray;