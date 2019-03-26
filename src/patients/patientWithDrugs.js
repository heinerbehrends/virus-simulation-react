import { curry, filter, map, pipe, concat } from 'ramda';
import makePatient, { filterReproduce, filterSurvive } from './simplePatient';
import makeResistentVirusArray, { isResistent, mutateResistences } from '../viruses/resistentVirus';

export const addDrug = curry(
  (newDrug, patientWithDrugs) => {
    return patientWithDrugs.set('drugs', [...patientWithDrugs.get('drugs'), newDrug])
    }
  
);

export const getResistentCount = curry(
  (drug, patientWithDrugs) => filter(isResistent([drug]), patientWithDrugs.get('viruses')).size
);

const filterResistent = drugs => filter(
  isResistent(drugs),
);

const createOffspringWithDrugs = (
  (popDensity, drugs, viruses) => concat(
    pipe(
      filterReproduce(popDensity),
      filterResistent(drugs),
      map(mutateResistences),
      )(viruses)
  )
);
const nextGen = (patientWithDrugs) => {
  const viruses = patientWithDrugs.get('viruses');
  return pipe(
    filterSurvive(),
    createOffspringWithDrugs(
      viruses.size / patientWithDrugs.get('maxPop'), 
      patientWithDrugs.get('drugs'),
      viruses,
    ),
  )(viruses)
};

export const updateViruses = patientWithDrugs => (
  patientWithDrugs.set('viruses', nextGen(patientWithDrugs))
);

const withDrugs = curry(
  (drugs, patient) => (
    patient.set('drugs', drugs)
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
