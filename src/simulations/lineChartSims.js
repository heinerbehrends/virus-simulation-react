import { repeat, mapAccum, concat, reduce } from 'ramda';
import { updateSimpleViruses, getVirusCount } from '../patients/simplePatient'
import { updateViruses, getResistentCount, addDrug } from '../patients/patientWithDrugs'

export const simpleSim = patient => (
  [
    updateSimpleViruses(patient),
    getVirusCount(patient),
  ]
);

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

const mergePairs = pairs => reduce(
  (acc, pair) => [[...acc[0], pair[0]], [...acc[1], pair[1]]],
  [[], []],
  pairs,
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
  return mergePairs(
    concat(
      firstArray,
      runSimulation({
        func,
        patient: addDrug('guttagonol', newPatient)      ,
        repetitions: repetitions / 2,
      })[1],
    )
  );
};

export default runSimulation;