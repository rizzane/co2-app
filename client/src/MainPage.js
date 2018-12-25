import React from 'react';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import './MainPage.scss';


export default class MainPage extends React.Component {
    state = {
        checked: true,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        return (
            <div>
                <h1 className="MainPage-header">CO<sup>2</sup>-EMISSIONS</h1>
                <form>
                    <div>
                        <TextField
                            className="search-box"
                            label="Search"
                            placeholder="Placeholder"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <Switch
                            checked={this.state.checked}
                            onChange={this.handleChange('checked')}
                            value="checkedB"
                            color="primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}