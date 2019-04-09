import React, { useState } from 'react';
import GraphWithDrugs from '../simWithDrugs/GraphWithDrugs';
import MultipleInputs from '../NumberInputs/MultipleInputs';


const PageWithDrugs = () => {
  const [maxPop, setMaxPop] = useState(1000);
  const [drugTime, setDrugTime] = useState(150);
  return (
    <>
      <GraphWithDrugs
        drugTime={drugTime}
        maxPop={maxPop}
        title="Virus Population with drug and resistence"
      />
      <MultipleInputs
        configs={[
          {
            label: 'Maximum virus population',
            func: setMaxPop,
            max: 10000,
            value: maxPop,
          },
          {
            label: 'Number of time steps before adding drug',
            func: setDrugTime,
            max: 300,
            value: drugTime,
          },
        ]}
      />
    </>
  );
};

export default PageWithDrugs;
