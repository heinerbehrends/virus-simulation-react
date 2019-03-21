import { List } from 'immutable';
import { pipe } from 'ramda';

function makePatient(intialViruses, maxPop = 1000) {
  let viruses = List(intialViruses);
  function getPopDensity() { return viruses.size / maxPop}
  function getVirusCount() { return viruses.size };

  function getViruses() { return viruses };

  // function updateViruses() {
  //   viruses = viruses
  //     .filter(virus => virus.doesSurvive())
  //     .concat(
  //       List(getViruses())      
  //         .filter(virus => virus.doesReproduce(getPopDensity()))
  //     );
  //   return getVirusCount();
  // };
  function updateViruses() {
    return makePatient(
      viruses.filter(
        virus => virus.doesSurvive()
      ).concat(
        List(getViruses()).filter(
          virus => virus.doesReproduce(getPopDensity())
        )
      )
    )
  }

  return Object.freeze({
    getPopDensity,
    maxPop,
    getViruses,
    getVirusCount,
    updateViruses,
  });
};

function withDrugs(
  {
    getViruses, 
    getPopDensity, 
    getVirusCount, 
    maxPop,
  },
    drugs = [],
  ) {
  function addDrug(newDrug) {
    return makePatientWithDrugs({
      initialViruses: getViruses(),
      maxPop,
    }, drugs = [...drugs, newDrug])
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
  
  function updateViruses() {
    return makePatientWithDrugs({
      initialViruses: nextGen(getViruses()),
      maxPop,
    })
  }

  return Object.freeze({
    getPopDensity,
    getVirusCount,
    getResistentCount,
    updateViruses,
    addDrug,
  })
};

export const makePatientWithDrugs = ({ initialViruses, maxPop }, drugs) => {
  return withDrugs(makePatient(initialViruses, maxPop), drugs)
}


export default makePatient;