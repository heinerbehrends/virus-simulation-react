import { List } from 'immutable';
import makeSimpleVirus from './viruses';

const makePatient = (intialViruses, maxPop) => {
  let viruses = List(intialViruses);
  console.log(viruses.size / maxPop);
  const getVirusCount = () => viruses.size;
  const update = () => {
    viruses = viruses
      .filter(virus => virus.doesSurvive())
      .concat(
        Array(viruses.size).fill(makeSimpleVirus())        
          .map(virus => virus.reproduce(viruses.size / maxPop))
          .filter(el => el !== null),
      );
  };

  return Object.freeze({
    getVirusCount,
    update,
  });
};

export default makePatient;