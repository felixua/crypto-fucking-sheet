import React from 'react';
//import { Switch, Route } from 'react-router-dom';

import Dashboard from './pages/dashboard/dashboard.component';

import './App.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  render() {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }
}

export default App;
