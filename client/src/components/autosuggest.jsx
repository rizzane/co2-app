import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import "../styles/search.scss";
import CustomInputField from "./customInputField";


function renderInputComponent(inputProps) {
    return (
        <CustomInputField
            inputProps={inputProps}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 500 }}>
                            {part.text}
                        </span>
                    ) : (
                            <strong key={String(index)} style={{ fontWeight: 300 }}>
                                {part.text}
                            </strong>
                        );
                })}
            </div>
        </MenuItem>
    );
}


function getSuggestionValue(suggestion) {
    return suggestion.name;
}

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
        width: 400,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
});



function Search(props) {
    const { classes } = props;

    const autosuggestProps = {
        suggestions: props.suggestions,
        renderInputComponent,
        onSuggestionsFetchRequested: props.handleFetch,
        onSuggestionsClearRequested: props.handleClear,
        getSuggestionValue,
        renderSuggestion,
    };

    return (
        <div className="search-container">
            <FormControl>
                <Autosuggest
                    {...autosuggestProps}
                    inputProps={{
                        placeholder: "Search",
                        value: props.value,
                        onChange: props.onChange,
                        onKeyPress: props.onKeyPress,
                        onClick: props.onClick,
                    }}
                    theme={{
                        container: classes.container,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                    }}
                    renderSuggestionsContainer={options => (
                        <Paper {...options.containerProps} square>
                            {options.children}
                        </Paper>
                    )}
                />
            </FormControl>
        </div>
    );
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);