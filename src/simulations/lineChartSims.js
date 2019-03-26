import { repeat, mapAccum } from 'ramda';
import { updateSimpleViruses, getVirusCount } from '../patients/simplePatient'
import { updateViruses, getResistentCount, addDrug } from '../patients/patientWithDrugs'

export function simpleSim(patient, value) {
  return [
    updateSimpleViruses(patient),
    getVirusCount(patient),
  ]
};

export const sim = patientWithDrugs => (
  [
    updateViruses(patientWithDrugs),
    [
      getVirusCount(patientWithDrugs),
      getResistentCount('guttagonol')(patientWithDrugs),
    ],
  ]
);

function runSimulation({
  func, patient, repetitions
}) {
  return mapAccum(
    func,
    patient,
    repeat(null, repetitions)
  )
};

const mergePairs = pairs => pairs.reduce(
  (acc, pair) => [[...acc[0], pair[0]], [...acc[1], pair[1]]],
  [[], []]
);

export function simulationWithDrugs({
  func,
  patient,
  repetitions,
}) {
  console.log(patient)
  const [newPatient, firstArray] = runSimulation({
    func,
    patient: patient,
    repetitions: repetitions / 2,
  });
  console.log(firstArray)
  console.log(addDrug(newPatient, 'guttagonol'))
  return mergePairs(
    firstArray.concat(
      runSimulation({
        func,
        patient: addDrug(newPatient, 'guttagonol')      ,
        repetitions: repetitions / 2,
      })[1]
    )
  );
};

export default runSimulation;