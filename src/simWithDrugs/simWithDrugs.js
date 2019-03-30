import { runSimulation } from '../simpleSim/simpleSim';

export const sim = patientWithDrugs => (
  [
    patientWithDrugs.updateViruses(),
    [
      patientWithDrugs.getVirusCount(),
      patientWithDrugs.getResistentCount('guttagonol'),
    ],
  ]
);

const mergePairs = pairs => pairs.reduce(
  (acc, pair) => [[...acc[0], pair[0]], [...acc[1], pair[1]]],
  [[], []],
);

export function simulationWithDrugs({
  func,
  patient,
  drugTime,
}) {
  const [newPatient, firstArray] = runSimulation({
    func,
    patient,
    repetitions: drugTime,
  });

  return mergePairs(
    firstArray.concat(
      runSimulation({
        func,
        patient: newPatient.addDrug('guttagonol'),
        repetitions: 300 - drugTime,
      })[1],
    ),
  );
}

export default runSimulation;
