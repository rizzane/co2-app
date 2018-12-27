import React from 'react';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Chart from "./chart";
import './MainPage.scss';


export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            searchValue: "",
            perCapita: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.getData = this.getData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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

    handleChange = event => {
        this.setState({ perCapita: event.target.checked });
    };

    handleSearch = event => {
        if (event.key === "Enter") {
            event.preventDefault();
            const value = event.target.value.toLowerCase();
            if (value.length > 0) {
                this.getData(value);
            }
        }
    }

    render() {
        return (
            <div className="page">
                <h1 className="MainPage-header">CO<sup>2</sup>-EMISSIONS</h1>
                <div className="search-box">
                    <div>
                        <TextField
                            label="Search"
                            style={{ margin: 8 }}
                            margin="normal"
                            variant="filled"
                            type="search"
                            onKeyPress={this.handleSearch}
                        />
                    </div>
                    <div>
                        <Switch
                            checked={this.state.perCapita}
                            onChange={this.handleChange}
                            color="primary"
                        />
                        <span>Per Capita</span>
                    </div>
                </div>
                <div className="chart">
                    <Chart
                        data={this.state.results}
                        perCapita={this.state.perCapita}
                    />
                </div>

            </div>
        );
    }
}