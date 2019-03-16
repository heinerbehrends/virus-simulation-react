const makeSimpleVirus = (maxBirthProb = 0.1, clearProb = 0.05) => ({
  doesSurvive: () => (Math.random() > clearProb),

  reproduce: popDensity => (
    Math.random() < maxBirthProb * (1 - popDensity)
      ? makeSimpleVirus(maxBirthProb, clearProb)
      : null
  ),
});

export default makeSimpleVirus;