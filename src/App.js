import React from 'react';
import Histogram from './histoSim/Histogram';
import SimpleGraph from './simpleSim/SimpleGraph';
import GraphWithDrugs from './simWithDrugs/GraphWithDrugs';

const App = () => (
  <>
    <SimpleGraph
      startCount={100}
      repetitions={300}
      maxPop={1000}
    />
    <GraphWithDrugs 
      drugTime={100}
      title={'Virus Population with drug and resistence'} 
    />
    <Histogram
      drugTime={150}
      title={'Histogram of virus population'}
    />
  </>
);

export default App;
