import { repeat, mapAccum } from 'ramda';

export const sim = patient => (
  [
    patient.updateViruses(),
    patient.getVirusCount(),
  ]
)

export const simResisitent = patient => (
  [
    patient.updateViruses(),
    patient.getResistentCount('guttagonol'),
  ]
)

function runSimulation({
  func, patient, repetitions
}) {
  return mapAccum(
    func,
    patient,
    repeat(null, repetitions)
  )
}

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
    
  return firstArray.concat(
    runSimulation({
      func,
      patient: newPatient.addDrug('guttagonol')      ,
      repetitions: repetitions / 2,
    })[1]
  )
  }


export default runSimulation;