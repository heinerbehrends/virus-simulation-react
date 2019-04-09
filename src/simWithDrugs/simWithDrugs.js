import { mapAccum, curry } from 'ramda';
import makePatientWithDrugs from '../patients/patientWithDrugs';
import makeResistentVirusArray from '../viruses/resistentVirus';

export const runSimulationWithDrugs = curry(
  (func, { repetitions, patientWithDrugs }) => (
    mapAccum(
      func,
      patientWithDrugs,
      [...Array(repetitions)],
    )
  ),
);

const sim = patientWithDrugs => (
  [
    patientWithDrugs.updateViruses(),
    [
      patientWithDrugs.getVirusCount(),
      patientWithDrugs.getResistentCount('guttagonol'),
    ],
  ]
);

const runSim = runSimulationWithDrugs(sim);

const mergePairs = pairs => pairs.reduce(
  (acc, pair) => [[...acc[0], pair[0]], [...acc[1], pair[1]]],
  [[], []],
);

function simulationWithDrugs({
  drugTime,
  virusCount,
  resistences,
  drugs,
  maxPop,
}) {
  const patientWithDrugs = makePatientWithDrugs({
    viruses: makeResistentVirusArray({
      virusCount,
      resistences,
    }),
    maxPop,
    drugs,
  });
  console.log(runSim(
    { drugTime, patientWithDrugs },
  ));
  const [newPatient, firstArray] = runSim(
    { repetitions: drugTime, patientWithDrugs },
  );
  console.log(newPatient.getVirusCount());
  return mergePairs(
    firstArray.concat(
      runSim({
        patientWithDrugs: newPatient.addDrug('guttagonol'),
        repetitions: 300 - drugTime,
      })[1],
    ),
  );
}

export default simulationWithDrugs;
