import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Histogram from '../histoSim/Histogram';
import MultipleInputs from '../NumberInputs/MultipleInputs';
import { makeHistoSimArray2 } from '../histoSim/histoSims';
import makePatientWithDrugs from '../patients/patientWithDrugs';
import makeResistentVirusArray from '../viruses/resistentVirus';

const HistoPage = () => {
  const [timeBetweenDrugs, setTimeBetweenDrugs] = useState(100);
  const [simData, setSimData] = useState();

  useEffect(() => {
    makeHistoSimArray2({
      patient: makePatientWithDrugs({
        viruses: makeResistentVirusArray({
          virusCount: 100,
          resistences: { guttagonol: false, grimpex: false },
        }),
        maxPop: 1000,
        drugs: [],
      }),
      repetitions: 100,
      timeBetweenDrugs,
    }).then(
      result => setSimData(result.toArray()),
    );
  }, [timeBetweenDrugs]);

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
            label: 'Time steps between adding drugs',
            value: timeBetweenDrugs,
            func: setTimeBetweenDrugs,
            max: 300,
          },
        ]}
      />
    </>
  );
};

export default HistoPage;
