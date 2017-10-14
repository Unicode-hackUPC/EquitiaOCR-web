import React, { Component } from 'react'

import Home from "./components/Home";
import { analyseImageByUrl } from "./services/cognitiveServices.js";

import "./style/index.css";

class App extends Component {
  render() {
    analyseImageByUrl(
      'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
    );
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
