import { curry } from 'ramda';

export const doesReproduce = curry(
  (popDensity, { birthProb }) => {
  return Math.random() < birthProb * (1 - popDensity);
});

export function doesSurvive({ clearProb }) {
  return Math.random() > clearProb;
};

export const makeSimpleVirus = (birthProb = 0.1, clearProb = 0.05) => {
  return Object.freeze({
    birthProb,
    clearProb,
  })
} ;

const makeVirusArray = length => Array(length).fill(makeSimpleVirus());

export default makeVirusArray;