import { curry, pipe, reduce, map } from 'ramda';
import { List }from 'immutable';
import { getVirusCount } from '../patients/simplePatient';
import { updateViruses, addDrug } from '../patients/patientWithDrugs';

const repeatVirusUpdate = curry(
  (iterations, patient) => (
    reduce(
      patient => updateViruses(patient),
      patient,
      List([...Array(iterations)]),
    )
  )
);

const histoSim = drugTime => pipe(
  repeatVirusUpdate(drugTime),
  addDrug('guttagonol'),
  repeatVirusUpdate(150),
)
const makeHistoSimArray = ({ patient, repetitions, drugTime }) => (
  map(
    () => getVirusCount(histoSim(drugTime)(patient)),
    List([...Array(repetitions)]),
  )
)

export default makeHistoSimArray;
