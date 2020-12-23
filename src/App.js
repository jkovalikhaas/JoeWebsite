import React, { Component } from "react";
import "./index.css";
import HomeContainer from "./HomeContainer.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return <HomeContainer />;
  }
}

export default App;
