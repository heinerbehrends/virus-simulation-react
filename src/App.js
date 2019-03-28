import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { curry } from 'ramda';
import Histogram from './histoSim/Histogram';
import SimpleGraph from './simpleSim/SimpleGraph';
import GraphWithDrugs from './simWithDrugs/GraphWithDrugs';
import Button from './Button/Button';
import { TextInput } from './ScreenName/ScreenNameStyled';

const handleNrInputMinMax = curry(
  (setFunc, { max, min }, { target: { value } }) => {
    const number = parseInt(value, 10);
    if (isNaN(number)) {
      return;
    }
    if (number < min) {
      setFunc(min);
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
    <TextInput onChange={func} size="4" value={value}/>
  </div>
)

const SimpleGraphPage = () => {
  const [maxPop, setMaxPop] = useState(1000);
  const handleMaxPop = handleNrInputMinMax(setMaxPop, { max: 10000, min: 1 });

  const [birthProb, setBirthProb] = useState(10);
  const handleBirthProb = handleNrInputMinMax(setBirthProb, { max: 100, min: 1 });

  const [clearProb, setClearProb] = useState(5);
  const handleClearProb = handleNrInputMinMax(setClearProb, { max: 100, min: 1 });

  const [repetitions, setRepititions] = useState(300);
  const handleRepetitions = handleNrInputMinMax(setRepititions, { max: 1000, min: 100 });

  return (
    <>
      <Link to="/withDrugs/">
        <Button value="Next" />
      </Link>
      <SimpleGraph
        startCount={100}
        repetitions={repetitions}
        maxPop={maxPop}
        birthProb={birthProb / 100}
        clearProb={clearProb / 100}
      />
      <NumberInput
        label="Maximum virus population"
        func={handleMaxPop}
        value={maxPop}
      />
      <NumberInput
        label="Probability of producing offspring"
        func={handleBirthProb}
        value={birthProb}
      />
      <NumberInput
        label="Probability of dying"
        func={handleClearProb}
        value={clearProb}
      />
      <NumberInput
        label="Number of time steps"
        func={handleRepetitions}
        value={repetitions}
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
