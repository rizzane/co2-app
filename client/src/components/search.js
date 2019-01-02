import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import "../styles/search.scss";
import CustomInputField from './customInputField';



const Search = (props) => {
    return (
        <div className="search-container">
            <FormControl variant="outlined">
                <CustomInputField
                    onChange={props.onChange}
                    onKeyPress={props.onKeyPress}
                    onClick={props.onClick}
                    value={props.value}
                />
            </FormControl>
        </div>
    );
}

export default Search;