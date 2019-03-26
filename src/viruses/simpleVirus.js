export const makeSimpleVirus = (birthProb = 0.1, clearProb = 0.05) => {
  function doesReproduce(popDensity) {
    return Math.random() < birthProb * (1 - popDensity);
  };
  function doesSurvive() {
    return Math.random() > clearProb;
  };
  
  return Object.freeze({
    birthProb,
    clearProb,
    doesSurvive,
    doesReproduce,
    })
};

const makeVirusArray = length => Array(length).fill(makeSimpleVirus());

export default makeVirusArray;