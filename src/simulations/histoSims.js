import { curry, pipe } from 'ramda';
import { List }from 'immutable';

const repeatVirusUpdate = curry(
  (iterations, patient) => (
    List([...Array(iterations)]).reduce(
      acc => acc.updateViruses(),
      patient
    )
  )
);
const addDrug = curry(
  (drug, patient) => patient.addDrug(drug)
);

const histoSim = drugTime => pipe(
  repeatVirusUpdate(drugTime),
  addDrug('guttagonol'),
  repeatVirusUpdate(150),
)
const makeHistoSimArray = ({ patient, repetitions, drugTime }) => (
  List([...Array(repetitions)]).map(
    () => histoSim(drugTime)(patient).getVirusCount()
  )
)

export default makeHistoSimArray;
