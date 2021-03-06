import { curry, pipe } from 'ramda';
import { List } from 'immutable';

const repeatVirusUpdate = curry(
  (iterations, patient) => (
    List([...Array(iterations)]).reduce(
      acc => acc.updateViruses(),
      patient,
    )
  ),
);

const addDrug = curry(
  (drug, patient) => patient.addDrug(drug),
);

const histoSim = drugTime => (
  pipe(
    repeatVirusUpdate(drugTime),
    addDrug('guttagonol'),
    repeatVirusUpdate(150),
  )
);

const makeHistoSimArray = ({ patient, repetitions, drugTime }) => {
  const result = List([...Array(repetitions)]).map(
    () => histoSim(drugTime)(patient).getVirusCount(),
  );
  return new Promise(resolve => resolve(result));
};

const histoSim2 = timeBetweenDrugs => (
  pipe(
    repeatVirusUpdate(150),
    addDrug('guttagonol'),
    repeatVirusUpdate(timeBetweenDrugs),
    addDrug('grimpex'),
    repeatVirusUpdate(150),
  )
);

export const makeHistoSimArray2 = ({ patient, repetitions, timeBetweenDrugs }) => {
  const result = List([...Array(repetitions)]).map(
    () => histoSim2(timeBetweenDrugs)(patient).getVirusCount(),
  );
  return new Promise(resolve => resolve(result));
};

export default makeHistoSimArray;
