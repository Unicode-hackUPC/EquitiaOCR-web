import React, { Component } from 'react';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      fileUploaded: false
    }
  }
  componentDidMount(){
  }

  render() {
    return (
      <div className="home">
        <div className="draganddrop">
        </div>
        <div className="buttons">
          <button className="button" >Upload a picture</button>
          <button className="button">Take a picture</button>
        </div>
      </div>
    );
  }
}

export default Home;
