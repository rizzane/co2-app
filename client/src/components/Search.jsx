import React from 'react';
import "../styles/search.scss";
import AutosuggestField from "./AutosuggestField";

const Search = (props) => {
    return (
        <div className="search-container">
            <AutosuggestField 
                suggestions={props.suggestions}
                onChange={props.onChange}
                onClick={props.onClick}
                onKeyPress={props.onKeyPress}
                value={props.value}
                handleFetch={props.handleFetch}
                handleClear={props.handleClear}
            />
        </div>
    );
}

export default Search;