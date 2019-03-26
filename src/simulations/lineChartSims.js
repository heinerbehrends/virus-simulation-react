import { repeat, mapAccum } from 'ramda';
import { simpleSim, runSimulation } from '../simpleSim/simpleSim';

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