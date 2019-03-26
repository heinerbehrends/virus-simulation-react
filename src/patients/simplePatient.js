import { List } from 'immutable';

function makePatient(intialViruses, maxPop = 1000) {
  const viruses = List(intialViruses);

  function getPopDensity() { return viruses.size / maxPop}

  function getVirusCount() { return viruses.size };

  function getViruses() { return viruses };

  function updateViruses() {

    return makePatient(
      viruses.filter(
        virus => virus.doesSurvive()
      ).concat(
        getViruses().filter(
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

export default makePatient;
