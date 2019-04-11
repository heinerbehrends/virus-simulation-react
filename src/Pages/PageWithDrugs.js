import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import GraphWithDrugs from '../simWithDrugs/GraphWithDrugs';
import MultipleInputs from '../NumberInputs/MultipleInputs';
import simulationWithDrugs from '../simWithDrugs/simWithDrugs';

const PageWithDrugs = () => {
  const [maxPop, setMaxPop] = useState(1000);
  const [drugTime, setDrugTime] = useState(150);
  const [simData, setSimData] = useState([...Array(300).fill(100)]);

  useEffect(() => {
    simulationWithDrugs({
      drugTime,
      virusCount: 100,
      resistences: { guttagonol: false },
      drugs: [],
      maxPop,
    }).then(
      data => setSimData(data),
    );
  }, [maxPop, drugTime]);

  return (
    <>
      <Link to="/histogram/">
        <Button value="Next" />
      </Link>

      <GraphWithDrugs
        resultArrays={simData}
        title="Virus Population with drug and resistence"
      />
      <MultipleInputs
        configs={[
          {
            label: 'Time steps before adding drug',
            value: drugTime,
            func: setDrugTime,
            max: 300,
          },
          {
            label: 'Maximum virus population',
            value: maxPop,
            func: setMaxPop,
            max: 10000,
          },
        ]}
      />
    </>
  );
};

export default PageWithDrugs;
