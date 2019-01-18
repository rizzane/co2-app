import AutosuggestField from "./AutosuggestField";
import React from 'react';
import "../styles/search.scss";
import FormControl from '@material-ui/core/FormControl';

const Search = (props) => {
    return (
        <div className="search-container">
            <FormControl variant="outlined">
                <AutosuggestField
                    suggestions={props.suggestions}
                    onChange={props.onChange}
                    onClick={props.onClick}
                    onKeyPress={props.onKeyPress}
                    value={props.value}
                    handleFetch={props.handleFetch}
                    handleClear={props.handleClear}
                />
            </FormControl>
        </div>
    );
}

export default Search;