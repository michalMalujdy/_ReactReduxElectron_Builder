import React from "react";
import {connect} from "react-redux";
import {Switch} from 'antd';
import {addStep, removeStep} from "../../../../store/slices/projectSlice";
import "./Step.scss";

class Step extends React.Component {    
    render() {
        return (
            <div className="step">
                <div className="step_name">{this.props.step.name}</div>
                <Switch onChange={this.onSwitchChange}/>
            </div>
        );
    }
    
    onSwitchChange = (isSwitchOn) => {
        if (isSwitchOn) {
            this.props.addStep(this.props.step);
        } else {
            this.props.removeStep(this.props.step);
        }
    };
}

export default connect(null, {addStep, removeStep})(Step);