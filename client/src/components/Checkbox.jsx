import React from "react";
import Switch from '@material-ui/core/Switch';
import "../styles/checkbox.scss";

const Checkbox = (props) => {
    return (
        <div className="checkbox-container">
            <Switch
                id="co2-checkbox"
                checked={props.checked}
                onChange={props.onChange}
                color="primary"
            />
            <label htmlFor="co2-checkbox" className="checkbox-label" >Per Capita</label>
        </div>
    );
}

export default Checkbox;