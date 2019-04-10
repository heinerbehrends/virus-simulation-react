import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SimpleGraph from '../simpleSim/SimpleGraph';
import MultipleInputs from '../NumberInputs/MultipleInputs';
import Button from '../Button/Button';
import runSimpleSim from '../simpleSim/simpleSim';

const SimpleGraphPage = () => {
  const [maxPop, setMaxPop] = useState(1000);
  const [birthProb, setBirthProb] = useState(10);
  const [clearProb, setClearProb] = useState(5);
  const [repetitions, setRepetitions] = useState(300);
  const [simData, setSimData] = useState([...Array(300).fill(100)]);

  useEffect(
    () => {
      runSimpleSim({
        virusCount: 100,
        birthProb,
        clearProb,
        maxPop,
        repetitions,
      }).then(
        ([, data]) => setSimData(data),
      );
    }, [birthProb, clearProb, maxPop, repetitions],
  );

  return (
    <>
      <Link to="/withDrugs/">
        <Button value="Next" />
      </Link>
      <SimpleGraph
        simData={simData}
      />
      <MultipleInputs
        configs={[
          {
            label: 'Maximum virus population',
            value: maxPop,
            func: setMaxPop,
            max: 10000,
          },
          {
            label: 'Probability of producing offspring',
            value: `${birthProb} %`,
            func: setBirthProb,
            max: 100,
          },
          {
            label: 'Probability of dying',
            value: `${clearProb} %`,
            func: setClearProb,
            max: 100,
          },
          {
            label: 'Number of time steps',
            value: repetitions,
            func: setRepetitions,
            max: 1000,
          },
        ]}
      />
    </>
  );
};

export default SimpleGraphPage;
