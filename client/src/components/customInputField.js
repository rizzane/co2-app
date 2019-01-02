import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';

const styles = {
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
};

function CustomInputField(props) {
    const { classes } = props;
    return (
        <Paper className={classes.root}>
            <InputBase className={classes.input}
                placeholder="Search"
                onKeyPress={props.onKeyPress}
                onChange={props.onChange}
                value={props.value}
            />
            <IconButton className={classes.IconButton} onClick={props.onClick}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

export default withStyles(styles)(CustomInputField);