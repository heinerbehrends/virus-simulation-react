import { mapAccum } from 'ramda';

const simpleSim = patient => (
  [
    patient.updateViruses(),
    patient.getVirusCount(),
  ]
);

export function runSimulation({
  func, patient, repetitions
}) {
  const result = mapAccum(
    func,
    patient,
    [...Array(repetitions)],
  );
  return new Promise(resolve => resolve(result));
};

export default simpleSim;