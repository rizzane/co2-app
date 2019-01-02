import React from 'react';
import "./styles/App.scss";
import Header from "./components/header";
import Search from "./components/search";
import Checkbox from "./components/checkbox";
import Chart from "./components/chart";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      searchInput: "",
      perCapita: false
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getData = this.getData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  getData(key) {
    fetch("/api/" + key)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(response => {
        this.setState({
          results: response.results
        })
      });
  }

  handleCheckboxChange = (event) => {
    this.setState({ perCapita: event.target.checked });
  };

  handleInputChange = (event) => {
    this.setState({ searchInput: event.target.value })
  }

  handleClick = (event) => {
    this.handleSearch(event);
  }
  handleKeyPress = (event) => {
    if(event.key === "Enter") {
      this.handleSearch(event);
    }
  }
  handleSearch = (event) => {
    event.preventDefault();
    const value = this.state.searchInput.toLowerCase();
    if (value.length > 0) {
      this.getData(value);
    }
    this.setState({
      searchInput: ""
    });
  }

  render() {
    return (
      <div className="page-container">
        <Header />
        <Search
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          onClick={this.handleClick}
          value={this.state.searchInput}
        />
        <Checkbox
          checked={this.state.perCapita}
          onChange={this.handleCheckboxChange}
        />
        <Chart
          data={this.state.results}
          perCapita={this.state.perCapita}
          title={this.state.searchInput}
        />
      </div>
    );
  }
}

export default App;
