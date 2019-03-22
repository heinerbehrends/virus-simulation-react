import { repeat, mapAccum } from 'ramda';

export const simpleSim = patient => (
  [
    patient.updateViruses(),
    patient.getVirusCount(),
  ]
);

export const sim = patientWithDrugs => (
  [
    patientWithDrugs.updateViruses(),
    [
      patientWithDrugs.getVirusCount(),
      patientWithDrugs.getResistentCount('guttagonol'),
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
  const [newPatient, firstArray] = runSimulation({
    func,
    patient,
    repetitions: repetitions / 2,
  });
    
  return mergePairs(
    firstArray.concat(
      runSimulation({
        func,
        patient: newPatient.addDrug('guttagonol')      ,
        repetitions: repetitions / 2,
      })[1]
    )
  );
};

export default runSimulation;