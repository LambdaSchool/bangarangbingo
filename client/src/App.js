import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import { Landing, SignIn, SignUp, Settings, Billing } from './components';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/Settings" component={Settings} />
        <Route path="/Billing" component={Billing} />
      </div>
    );
  }
}

export default App;
