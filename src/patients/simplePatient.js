import { List, Map } from 'immutable';
import { curry, pipe, filter, concat } from 'ramda';
import { doesReproduce, doesSurvive } from '../viruses/simpleVirus';

export const getVirusCount = patient => patient.get('viruses').size;

export const filterReproduce = (
  popDensity => filter(doesReproduce(popDensity)
));
export const createOffspring = curry(
  (popDensity, viruses) => concat(
    filterReproduce(popDensity)(viruses)
  )
);
export const filterSurvive = filter(doesSurvive);

const simpleNextGen = patient => {
  const viruses = patient.get('viruses');
  return pipe(
    filterSurvive,
    createOffspring(viruses.size / patient.get('maxPop'))(viruses)
  )(viruses)
};

export function updateSimpleViruses(patient) {
  return patient.set('viruses', simpleNextGen(patient))
};

function makePatient(viruses, maxPop = 1000) {
  return Map({
    maxPop,
    viruses: List(viruses),
  });
};

export default makePatient;