import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Histogram from '../histoSim/Histogram';
import MultipleInputs from '../NumberInputs/MultipleInputs';
import makeHistoSimArray from '../histoSim/histoSims';
import makePatientWithDrugs from '../patients/patientWithDrugs';
import makeResistentVirusArray from '../viruses/resistentVirus';

const HistoPage = () => {
  const [drugTime, setDrugTime] = useState(100);
  const [simData, setSimData] = useState();

  useEffect(() => {
    makeHistoSimArray({
      patient: makePatientWithDrugs({
        viruses: makeResistentVirusArray({
          virusCount: 100,
          resistences: { guttagonol: false },
        }),
        maxPop: 1000,
        drugs: [],
      }),
      repetitions: 100,
      drugTime,
    }).then(
      result => setSimData(result.toArray()),
    );
  }, [drugTime]);

  return (
    <>
      <Link to="/histogram2/">
        <Button value="Next" />
      </Link>

      <Histogram
        simData={simData}
        title="Histogram of virus population"
      />
      <MultipleInputs
        configs={[
          {
            label: 'Time steps before adding drug',
            value: drugTime,
            func: setDrugTime,
            max: 300,
          },
        ]}
      />
    </>
  );
};

export default HistoPage;
