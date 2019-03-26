import { List } from 'immutable';
import { curry, pipe, filter, concat } from 'ramda';
import { doesReproduce, doesSurvive } from '../viruses/simpleVirus';

export const getVirusCount = ({ viruses }) => viruses.size;

export const filterReproduce = (
  popDensity => filter(doesReproduce(popDensity)
));
export const createOffspring = curry(
  (popDensity, viruses) => concat(
    filterReproduce(popDensity)(viruses)
  )
);
export const filterSurvive = filter(doesSurvive);

const simpleNextGen = ({ viruses, maxPop }) => (
  pipe(
    filterSurvive,
    createOffspring(viruses.size / maxPop)(viruses)
  )(viruses)
);

export function updateSimpleViruses(patient) {
  return makePatient(
    simpleNextGen(patient)
  )
};

function makePatient(viruses, maxPop = 1000) {
  return Object.freeze({
    maxPop,
    viruses: List(viruses),
  });
};

export default makePatient;