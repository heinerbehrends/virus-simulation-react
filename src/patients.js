import { List } from 'immutable';
import { pipe } from 'ramda';

function makePatient(intialViruses, maxPop = 1000) {
  let viruses = List(intialViruses);
  function getPopDensity() { return viruses.size / maxPop}
  function getVirusCount() { return viruses.size };

  function getViruses() { return viruses };

  function setViruses(newViruses) { viruses = newViruses; };

  function updateViruses() {
    viruses = viruses
      .filter(virus => virus.doesSurvive())
      .concat(
        List(getViruses())      
          .filter(virus => virus.doesReproduce(getPopDensity()))
      );
    return getVirusCount();
  };

  return Object.freeze({
    getPopDensity,
    getViruses,
    setViruses,
    getVirusCount,
    updateViruses,
  });
};

function withDrugs(simplePatient, drugs = []) {
  const {
    getViruses, 
    setViruses, 
    getPopDensity, 
    getVirusCount 
  } = simplePatient;
  function addDrug(newDrug) {
    drugs = [...drugs, newDrug];
  }
  // function addDrug(drugs) {
  //   return makePatientWithDrugs(makePatient(getViruses()), drugs)
  // }
  function getDrugs() {
    return drugs
  }
  
  function getResistentCount(drug) {
    return (
      getViruses().filter(virus => virus.survivesDrugs([drug])).size
      );
    };
    
  function createOffspring(viruses) {
    return viruses.concat(
      viruses.filter(
        virus => virus.doesReproduce(getPopDensity())
      ).map(
        virus => virus.mutateResistences()
      ),
    );
  };
  function log() {
    console.log(this)
  }
  function filterByDrugs(viruses) {
    return viruses.filter(
      virus => virus.survivesDrugs(drugs)
    )
  };
  function filterByDeath(viruses) {
    return viruses.filter(
      virus => virus.doesSurvive()
    )
  };
  function nextGen(viruses) {
    return pipe(
      filterByDrugs,
      filterByDeath,
      createOffspring,  
    )(viruses)
  } 
  
  // function updateViruses() {
  //   this.setViruses(nextGen(this.getViruses()))
  // }
  function updateViruses() {
    const {maxPop, getViruses } = this;
    return makePatientWithDrugs({
      initialViruses: nextGen(getViruses()),
      maxPop,
    })
  }

  return Object.freeze({
    getPopDensity,
    getViruses,
    setViruses,
    getVirusCount,
    getResistentCount,
    updateViruses,
    log,
    addDrug,
    getDrugs,
  })
};

export const makePatientWithDrugs = ({ initialViruses, maxPop }) => {
  return withDrugs(makePatient(initialViruses, maxPop))
}


export default makePatient;