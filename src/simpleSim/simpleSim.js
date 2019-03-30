import { mapAccum, curry } from 'ramda';
import makePatient from '../patients/simplePatient';
import makeVirusArray from '../viruses/simpleVirus';

const simpleSim = patient => (
  [
    patient.updateViruses(),
    patient.getVirusCount(),
  ]
);

export const runSimulation = curry(
  (func, { virusCount, birthProb, clearProb, maxPop, repetitions }) => {
    const result = mapAccum(
      func,
      makePatient(
        makeVirusArray({
          virusCount,
          birthProb: birthProb / 100, 
          clearProb: clearProb / 100,
        }), maxPop,
      ),
      [...Array(repetitions)],
    );
    return new Promise(resolve => resolve(result));
  }
);

const runSimpleSim = runSimulation(simpleSim);

export default runSimpleSim;