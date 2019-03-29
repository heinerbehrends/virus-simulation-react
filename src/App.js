import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { curry } from 'ramda';
import Histogram from './histoSim/Histogram';
import SimpleGraph from './simpleSim/SimpleGraph';
import GraphWithDrugs from './simWithDrugs/GraphWithDrugs';
import Button from './Button/Button';
import { TextInput } from './ScreenName/ScreenNameStyled';
import simpleSim, { runSimulation } from './simpleSim/simpleSim';
import makePatient from './patients/simplePatient';
import makeVirusArray from './viruses/simpleVirus';


const handleNrInput = curry(
  ({ setFunc, max }, { target: { value } }) => {
    const number = parseInt(value, 10);
    if (isNaN(number)) {
      return;
    }
    if (number < 1) {
      setFunc(1);
      return;
    };
    if (number > max) {
      setFunc(max);
      return;
    };
    setFunc(number);
  }
);

const NumberInput = ({ label, func, value }) => (
  <div>
    <span style={{marginLeft: "2rem"}} >{label}</span>
    <TextInput onClick={({ currentTarget }) => currentTarget.select()} onChange={func} size="4" value={value}/>
  </div>
);

const MultipleInputs = ({ configs }) => (
  configs.map(
    ({ label, func, max, value }, idx) => (
      <NumberInput
        label={label}
        func={handleNrInput({setFunc: func, max})}
        value={value}
        key={idx}
      />
    )
  )
)

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
}
const PageWithDrugs = () => (
  <GraphWithDrugs 
    drugTime={100}
    title={'Virus Population with drug and resistence'} 
  />
);

const HistoPage = () => (
  <Histogram
    drugTime={150}
    title={'Histogram of virus population'}
  />
);

const Menu = () => (
  <>
    <Link to="/simple/">Simple virus simulation</Link>
    <Link to="/withDrugs/">Simulation with drugs</Link>
    <Link to="/histogram/">Histogram</Link>
  </>
)

const App = () => (
  <Router>
    <Route exact path="/" component={SimpleGraphPage} />
    <Route path="/simple/" component={SimpleGraphPage} />
    <Route path="/withDrugs/" component={PageWithDrugs} />
    <Route path="/histogram/" component={HistoPage} />
  </Router>
);

export default App;
