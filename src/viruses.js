const makeSimpleVirus = (birthProb = 0.1, clearProb = 0.05) => {
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
  
    reproduce: popDensity => (
      doesReproduce(popDensity)
        ? makeSimpleVirus()
        : null
    ),
  })
} ;

function withResistence (initialResistences, muteProb = 0.005) {
  let resistences = initialResistences;

  const isResistentAgainst = drug => resistences[drug];

  function mutateResistences() {
    const newResistences = (
      Object.keys(resistences).reduce(
        (resObj, drug) => (
          Math.random() < muteProb
            ? {
              ...resObj, 
              ...{ [drug]: !resistences[drug] },
            }
            : {
              ...resistences,
              ...resObj,
            }
        ), {}
      )
    );
    return makeResistentVirus(newResistences)
  };

  const survivesDrugs = drugs => {
    if (drugs.length) {
      return drugs.reduce(
        (bool, drug) => bool ? isResistentAgainst(drug) : false,
        true,
      )
    }
    return true;
  }; 
  
  

  return Object.freeze({
    isResistentAgainst,
    mutateResistences,
    survivesDrugs,
  });
};

export const makeResistentVirus = resistences => (
  { ...makeSimpleVirus(), ...withResistence(resistences)}
);

const makeVirusArray = length => Array(length).fill(makeSimpleVirus());

export const makeResistentVirusArray = (length, resistences) => Array(length).fill(makeResistentVirus(resistences));


export default makeVirusArray;