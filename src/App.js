import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SimpleGraphPage from './SimpleGraphPage/SimpleGraphPage';
import PageWithDrugs from './PageWithDrugs/PageWithDrugs';
import Histogram from './histoSim/Histogram';


const HistoPage = () => (
  <Histogram
    drugTime={150}
    title="Histogram of virus population"
  />
);

// const Menu = () => (
//   <>
//     <Link to="/simple/">Simple virus simulation</Link>
//     <Link to="/withDrugs/">Simulation with drugs</Link>
//     <Link to="/histogram/">Histogram</Link>
//   </>
// );

const App = () => (
  <Router>
    <Route exact path="/" component={SimpleGraphPage} />
    <Route path="/simple/" component={SimpleGraphPage} />
    <Route path="/withDrugs/" component={PageWithDrugs} />
    <Route path="/histogram/" component={HistoPage} />
  </Router>
);

export default App;
