import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Patients from './pages/Patients'
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      Hey boi <br/>

      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/patients" component={Patients} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
