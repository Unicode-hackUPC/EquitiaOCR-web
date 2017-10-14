import React, { Component } from "react";

import Home from "./components/Home";
import analyseImage from "./services/cognitiveServices.js";

import "./style/index.css";

class App extends Component {
  render() {
    analyseImage(
      "https://scontent-mad1-1.xx.fbcdn.net/v/t34.0-12/22497400_10211204530124478_179622941_n.jpg?oh=471806aef54ba3f54130d178ba36391a&oe=59E44C8B"
    );
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
