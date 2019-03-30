import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SimpleGraph from '../simpleSim/SimpleGraph';
import MultipleInputs from '../NumberInputs/MultipleInputs';
import Button from '../Button/Button';
import simpleSim, { runSimulation } from '../simpleSim/simpleSim';
import makePatient from '../patients/simplePatient';
import makeVirusArray from '../viruses/simpleVirus';

const SimpleGraphPage = () => {
  const [maxPop, setMaxPop] = useState(1000);
  const [birthProb, setBirthProb] = useState(10);
  const [clearProb, setClearProb] = useState(5);
  const [repetitions, setRepetitions] = useState(300);  
  const [simData, setSimData] = useState([...Array(300).fill(100)]);

  useEffect(
    () => {
      runSimulation({
        func: simpleSim,
        patient: makePatient(
          makeVirusArray({
            length: 100,
            birthProb: birthProb / 100, 
            clearProb: clearProb / 100,
          }), maxPop,
        ),
        repetitions,
      }).then(
        ([, simData]) => setSimData(simData)
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
            label: "Maximum virus population",
            func: setMaxPop,
            max: 10000,
            value: maxPop,
          },
          {
            label: "Probability of producing offspring",
            func: setBirthProb,
            max: 100,
            value: birthProb,
          },
          {
            label: "Probability of dying",
            func: setClearProb,
            max: 100,
            value: clearProb,
          },
          {
            label: "Number of time steps",
            func: setRepetitions,
            max: 1000,
            value: repetitions,
          },
        ]}
      />
    </>
  );
};

export default SimpleGraphPage;