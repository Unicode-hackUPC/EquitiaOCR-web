import React, { Component } from "react";
import home from "../assets/images/home.svg";
class FileReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: this.props.file.recognitionResult.lines,
      ctx: null
    };
    this.width = 0;
    this.height = 0;
  }

  componentDidMount() {
    this.setState({ ctx: document.getElementById("cs").getContext("2d") });
  }

  getMaxWidth() {
    let mw = 0;
    this.state.lines.forEach(line => {
      for (let i = 0; i < 8; i += 2) {
        if (line.boundingBox[i] > mw) {
          console.log("x", i, line.boundingBox[i], mw);
          mw = line.boundingBox[i];
        }
      }
    });
    this.width = mw + 50;
  }

  getMaxHeight() {
    let mh = 0;
    this.state.lines.forEach(line => {
      for (let i = 1; i < 8; i += 2) {
        if (line.boundingBox[i] > mh) {
          mh = line.boundingBox[i];
        }
      }
    });
    this.height = mh + 50;
  }

  getFontSize() {
    this.fontSize = Math.round(this.height / 10) + "px";
  }
  render() {
    this.getMaxWidth();
    this.getMaxHeight();
    // this.getFontSize();
    return (
      <div>
        <button
          style={{ alignSelf: "flex-start", fontSize: "1em" }}
          onClick={() => this.props.setFile(false)}
        >
          <img style={{ width: "100%" }} src={home} />
        </button>
        <div
          style={{
            position: "fixed",
            background: "white",
            width: this.width + 20,
            height: "100vh",
            overflow: "auto"
          }}
        >
          <canvas
            id="cs"
            style={{ margin: "auto", padding: "2em" }}
            width={this.width}
            height={this.height}
          >
            {this.state.lines && this.state.ctx
              ? this.state.lines.map((line, key) => {
                  //  console.log("this.font", this.fontSize);
                  let fontSize =
                    (line.boundingBox[2] - line.boundingBox[0]) /
                    line.text.length;
                  console.log("fsize", line.text, fontSize);
                  this.state.ctx.font = fontSize + "px Arial";
                  this.state.ctx.fillText(
                    line.text,
                    line.boundingBox[0] + 20,
                    line.boundingBox[1] + 20
                  );
                  return <p key={key}>{line.text}</p>;
                })
              : null}
          </canvas>
        </div>
      </div>
    );
  }
}

export default FileReader;
