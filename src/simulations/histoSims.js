import { curry, pipe } from 'ramda';
import { List }from 'immutable';
import { getVirusCount } from '../patients/simplePatient';
import { updateViruses, addDrug } from '../patients/patientWithDrugs';

const repeatVirusUpdate = curry(
  (iterations, patient) => (
    List([...Array(iterations)]).reduce(
      acc => updateViruses(acc),
      patient
    )
  )
);

const histoSim = drugTime => pipe(
  repeatVirusUpdate(drugTime),
  addDrug('guttagonol'),
  repeatVirusUpdate(150),
)
const makeHistoSimArray = ({ patient, repetitions, drugTime }) => (
  List([...Array(repetitions)]).map(
    () => getVirusCount(histoSim(drugTime)(patient))
  )
)

export default makeHistoSimArray;
