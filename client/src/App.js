import React from 'react';
import "./styles/App.scss";
import Header from "./components/Header";
import Checkbox from "./components/Checkbox";
import Chart from "./components/Chart";
import Search from "./components/Search";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      inputValue: "",
      perCapita: false,
      suggestions: []
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this);
    this.getData = this.getData.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  // Fetches data from api as json
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

  // Fetches suggestions for autosuggest feature
  getSuggestions(input) {
    const inputValue = input.toLowerCase();
    if (inputValue.length === 0) return [];

    fetch("/api/countries/" + inputValue)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch");
        }
      })
      .then(response => {
        this.setState({
          suggestions: response.results
        })
      });
  }
  
  handleCheckboxChange = (event) => {
    this.setState({ perCapita: event.target.checked });
  };

  handleSuggestionsFetchRequested = ({value}) => {
    this.getSuggestions(value.toLowerCase());
  };

  handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };
  handleInputChange = (event, { newValue }) => {
    this.setState({ inputValue: newValue });
  }

  handleClick = (event) => {
    this.handleSearch(event);
  }
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.handleSearch(event);
    }
  }
  
  handleSearch = (event) => {
    event.preventDefault();
    const value = this.state.inputValue.toLowerCase();
    if (value.length > 0) {
      this.getData(value);
    }
    this.setState({
      inputValue: ""
    });
  }

  render() {
    return (
      <div className="page-container">
        <Header />
        <Search
          suggestions={this.state.suggestions}
          onChange={this.handleInputChange}
          onClick={this.handleClick}
          onKeyPress={this.handleKeyPress}
          value={this.state.inputValue}
          handleFetch={this.handleSuggestionsFetchRequested}
          handleClear={this.handleSuggestionsClearRequested}
        />
        <Checkbox
          checked={this.state.perCapita}
          onChange={this.handleCheckboxChange}
        />
        <Chart
          data={this.state.results}
          perCapita={this.state.perCapita}
        />
      </div>
    );
  }
}

export default App;
