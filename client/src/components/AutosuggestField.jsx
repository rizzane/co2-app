import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import "../styles/search.scss";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';


function renderInputComponent(inputProps) {
    const { onClick, inputRef = () => { }, ref, ...other} = inputProps;
    return (
        <TextField
            variant="outlined"
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={onClick} >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...other}
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
                            {part.text.charAt(0).toUpperCase() + part.text.slice(1)}
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
    return suggestion.name.charAt(0).toUpperCase() + suggestion.name.slice(1);
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



function AutosuggestField(props) {
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

    );
}

AutosuggestField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutosuggestField);