import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SimpleGraphPage from './Pages/SimpleGraphPage';
import PageWithDrugs from './Pages/PageWithDrugs';
import HistoPage from './Pages/HistoPage';
import HistoPage2 from './Pages/HistoPage2';


const App = () => (
  <Router>
    <Route exact path="/" component={SimpleGraphPage} />
    <Route path="/simple/" component={SimpleGraphPage} />
    <Route path="/withDrugs/" component={PageWithDrugs} />
    <Route path="/histogram/" component={HistoPage} />
    <Route path="/histogram2" component={HistoPage2} />
  </Router>
);

export default App;
