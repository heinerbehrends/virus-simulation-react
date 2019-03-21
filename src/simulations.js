import { List } from 'immutable';
import { repeat, mapAccum } from 'ramda';

// const simulation = ({ Patient, iterations }) => (
//   List([...Array(iterations)])
//   .map(() => Patient.updateViruses())
//   .map(patient => patient.getVirusCount()).toArray()
// );

export const sim = patient => {
  return [
    patient.updateViruses(),
    patient.getVirusCount(),
  ]
}

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