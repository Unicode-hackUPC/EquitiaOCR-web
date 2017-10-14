import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Spinner from "./Spinner";
import analyseImage from "../services/cognitiveServices.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUploaded: false,
      url: false,
      urlValue: "",
      accepted: [],
      rejected: [],
      pending: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setPending = this.setPending.bind(this);
  }
  componentDidMount() {}

  showUrl = boo => {
    this.setState({ url: boo });
  };

  handleInputChange(event) {
    this.setState({ urlValue: event.target.value });
  }

  setPending(boo) {
    this.setState({ pending: boo });
  }

  render() {
    if (this.state.accepted.length !== 0) {
      analyseImage(this.state.accepted[0], this.setPending);
    }
    return (
      <div className="home">
        {this.state.pending ? (
          <Spinner />
        ) : (
          <div className="buttons">
            <Dropzone
              className="button draganddrop"
              accept="image/png, image/jpeg, image/jpg"
              onDrop={(accepted, rejected) => {
                this.setState({ accepted, rejected });
              }}
            >
              <p>Upload a picture</p>
              <p>open file</p>
              <p>or</p>
              <p>drag and drop here</p>
            </Dropzone>
            <p className="text"> OR </p>
            <button
              className="button"
              onClick={() => this.showUrl(!this.state.url)}
            >
              Enter an URL
            </button>
            {this.state.url ? (
              <input
                className="urlInput"
                type="text"
                value={this.state.urlValue}
                onChange={this.handleInputChange}
              />
            ) : null}
            <button className="button"> Ok </button>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
