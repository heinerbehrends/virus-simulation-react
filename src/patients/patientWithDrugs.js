import { pipe } from 'ramda';
import makePatient from './simplePatient';

function withDrugs(
  {
    getViruses, 
    getPopDensity, 
    getVirusCount,
    maxPop,
  },
    drugs = []
){
  function addDrug(newDrug) {
    return makePatientWithDrugs({
      initialViruses: getViruses(),
      maxPop,
      drugs: [...drugs, newDrug],
    })
  };

  function getResistentCount(drug) {
    return (
      getViruses().filter(virus => virus.isResistent([drug])).size
      );
    };
    
  function createOffspring(viruses) {
    return viruses.concat(
      viruses.filter(
        virus => virus.isResistent(drugs)
      ).filter(
        virus => virus.doesReproduce(getPopDensity())
      ).map(
        virus => virus.mutateResistences()
      ),
    );
  };

  function filterByDeath(viruses) {
    return viruses.filter(
      virus => virus.doesSurvive()
    )
  };

  function nextGen(viruses) {
    return pipe(
      filterByDeath,
      createOffspring,  
    )(viruses)
  };
  
  function updateViruses() {
    return makePatientWithDrugs({
        initialViruses: nextGen(getViruses()),
        maxPop,
        drugs,
      }
    )
  };

  return Object.freeze({
    getPopDensity,
    getVirusCount,
    getResistentCount,
    updateViruses,
    addDrug,
  })
};

export const makePatientWithDrugs = ({ initialViruses, maxPop, drugs }) => {
  return withDrugs(makePatient(initialViruses, maxPop), drugs)
}


export default makePatientWithDrugs;