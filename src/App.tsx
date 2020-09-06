import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.scss'

import Patients from './pages/Patients'
import Login from './pages/Login'
import ContextProvider from './ContextProvider'
import Doctors from './pages/Doctors'
import Header from './components/Header'

class App extends Component {
  componentDidMount() {
    // fetch my routine
  }
  
  render() {
    return (
      <div className="App">
        <ContextProvider>
          <Router>
            <Header/>

            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/patients" component={Patients} />
              <Route exact path="/patients" component={Doctors} />
            </Switch>
          </Router>
        </ContextProvider>
      </div>
    );
  }
}

export default App;
