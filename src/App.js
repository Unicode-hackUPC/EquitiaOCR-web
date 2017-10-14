import React, { Component } from 'react'

import Header from './components/Header'
import Home from './components/Home'

import './style/index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Home />
      </div>
    );
  }
}

export default App;
