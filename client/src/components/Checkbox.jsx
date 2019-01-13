import React from "react";
import Switch from '@material-ui/core/Switch';
import "../styles/checkbox.scss";

const Checkbox = (props) => {
    return (
        <div className="checkbox-container">
            <Switch
                checked={props.checked}
                onChange={props.onChange}
                color="primary"
            />
            <span>Per Capita</span>
        </div>
    );
}

export default Checkbox;