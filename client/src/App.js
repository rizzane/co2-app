import React, { Component } from 'react';
import "./App.scss";
import MainPage from "./MainPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    }
  }

  render() {
    return (
      <div>
        <MainPage />
      </div>
    );
  }
}

export default App;
