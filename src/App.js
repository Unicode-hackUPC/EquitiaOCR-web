import React, { Component } from "react";

import Home from "./components/Home";
import { analyseImageByUrl } from "./services/cognitiveServices.js";

import "./style/index.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
