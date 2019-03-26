import { curry, filter, map, pipe, concat } from 'ramda';
import makePatient, { createOffspring, filterReproduce, filterSurvive } from './simplePatient';
//import makeVirusArray, { doesSurvive, doesReproduce } from '../viruses/simpleVirus';
import makeResistentVirusArray, { isResistent, mutateResistences } from '../viruses/resistentVirus';

export function addDrug({viruses, maxPop, drugs}, newDrug) {
  return {
    viruses,
    maxPop,
    drugs: [...drugs, newDrug],
  }
};

export const getResistentCount = curry(
  (drug, { viruses }) => filter(isResistent([drug]), viruses).size
);

const filterResistent = drugs => filter(
  isResistent(drugs),
);

const createOffspringWithDrugs = curry(
  (popDensity, drugs, viruses) => concat(
    pipe(
      filterReproduce(popDensity),
      filterResistent(drugs),
      map(mutateResistences),
      )(viruses)
  )
);
const nextGen = ({ viruses, maxPop, drugs }) => (
  pipe(
    filterSurvive(),
    createOffspringWithDrugs(viruses.size / maxPop, drugs)(viruses),
  )(viruses)
);

export const updateViruses = patient => (
  makePatientWithDrugs(
    patient.drugs,
    nextGen(patient),
  )
)

const withDrugs = curry(
  (drugs, { viruses, maxPop }) => (
    Object.freeze({
      viruses, 
      maxPop, 
      drugs,
    })
  )
);

const makePatientWithDrugs = (drugs, viruses) => (
  pipe(
    makePatient,
    withDrugs(drugs)
  )(viruses)
)
// const PatientWithDrugs = makePatientWithDrugs([])(makeResistentVirusArray(100, { guttagonol: false }))
  // console.log(
  //   PatientWithDrugs
  // )
console.log(makePatientWithDrugs(
  [],
  makeResistentVirusArray(100, { guttagonol: false, grimpex: false })
))

export default makePatientWithDrugs;
