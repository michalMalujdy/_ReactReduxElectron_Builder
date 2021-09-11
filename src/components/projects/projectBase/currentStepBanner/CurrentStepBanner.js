import React from "react";
import {connect} from "react-redux";
import {Alert, Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons';
import "./CurrentStepBanner.scss"

class CurrentStepBanner extends React.Component {
    loadingIcon = <LoadingOutlined className="current-step-banner_loading" spin/>;
    
    render() {
        return (
            <div className={"current-step-banner" + this.getVisibilityClass()}>
                <Alert message={this.renderContent()} type="info"/>
            </div>
        )
    }

    renderContent = () => {
        if (this.props.executingStep === null) {
            return null;
        }
        
        return (
            <div className="current-step-banner_content">
                <Spin className="current-step-banner_content_spin" indicator={this.loadingIcon}/>
                <span>Executing step <b>{this.props.executingStep.name}</b></span>
            </div>
        );
    }

    getVisibilityClass = () => {
        return this.props.executingStep === null
            ? " current-step-banner--hidden"
            : "";
    }
}

const mapStateToProps = (state) => {
    return {
        executingStep: state.projects.all[state.projects.current].executingStep
    }
};

export default connect(mapStateToProps, null)(CurrentStepBanner);