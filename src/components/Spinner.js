import React, { Component } from "react";
class Spinner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="lds-css ng-scope">
        <div style={{ width: "100%", height: "100%" }} className="lds-pacman">
          <div>
            <div />
            <div />
            <div />
          </div>
          <div>
            <div />
            <div />
          </div>
        </div>
      </div>
    );
  }
}

export default Spinner;
