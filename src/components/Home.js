import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Spinner from "./Spinner";
import FileReader from "./FileReader";
import { initializeFirebase, uploadImage } from "../services/firebase";

import home from "../assets/images/home.svg";

import {
  analyseImageByFile,
  analyseImageByUrl
} from "../services/cognitiveServices.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: false,
      urlValue: "",
      pending: false,
      readFile: false,
      file: null,
      error: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateUrl = this.validateUrl.bind(this);
    this.setPending = this.setPending.bind(this);
    this.setFile = this.setFile.bind(this);
  }
  componentDidMount() {
    initializeFirebase();
  }

  showUrl = boo => {
    this.setState({ url: boo });
  };

  handleInputChange(event) {
    this.setState({ urlValue: event.target.value });
  }

  setPending(boo, file) {
    if (boo && this.state.pending !== boo) {
      this.setState({ pending: boo });
    } else if (this.state.pending !== boo) {
      this.setState({ pending: boo, readFile: true, file: file });
    }
  }

  setFile(boo) {
    this.setState({ readFile: boo });
  }

  validateUrl() {
    analyseImageByUrl(this.state.urlValue, this.setPending);
    // if (this.state.urlValue.match(/\.(jpeg|jpg|gif|png)$/) != null) {
    //   analyseImageByUrl(this.state.urlValue, this.setPending);
    // } else {
    //   this.setState({ error: "URL is not valid" });
    // }
  }

  render() {
    return (
      <div className="home">
        <button
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            margin: "1em",
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
          onClick={() => this.setFile(false)}
        >
          <img style={{ width: "5em" }} src={home} />
        </button>
        {this.state.pending ? (
          <Spinner />
        ) : !this.state.readFile ? (
          <div className="buttons">
            <Dropzone
              className="button draganddrop"
              accept="image/png, image/jpeg, image/jpg"
              onDrop={(accepted, rejected) => {
                const callback = url => analyseImageByUrl(url, this.setPending);
                uploadImage(accepted[0], callback);
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
              <div className="input">
                <input
                  className="urlInput"
                  type="text"
                  value={this.state.urlValue}
                  onChange={this.handleInputChange}
                />
                <button className="button" onClick={this.validateUrl}>
                  {" "}
                  Ok{" "}
                </button>
              </div>
            ) : null}
            {this.state.error ? <p>{this.state.error}</p> : null}
          </div>
        ) : (
          <FileReader file={this.state.file} setFile={this.setFile} />
        )}
      </div>
    );
  }
}

export default Home;
