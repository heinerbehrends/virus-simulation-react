import { repeat, mapAccum } from 'ramda';

const simpleSim = patient => (
  [
    patient.updateViruses(),
    patient.getVirusCount(),
  ]
);

export function runSimulation({
  func, patient, repetitions
}) {
  return mapAccum(
    func,
    patient,
    repeat(null, repetitions)
  )
};

export default simpleSim;