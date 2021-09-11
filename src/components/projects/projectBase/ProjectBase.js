import React from "react";
import {connect} from "react-redux";
import {Card, Button, message} from 'antd';
import hash from 'object-hash';
import Step from "./step/Step";
import Output from "./output/Output";
import CurrentStepBanner from "./currentStepBanner/CurrentStepBanner";
import Shell from "../../../core/domain/Shell";
import {setCurrentProject, addLog, stepStarted, allStepsFinished} from "../../../store/slices/projectSlice";
import "./ProjectBase.scss";

class Project extends React.Component {
    componentDidMount() {
        this.props.setCurrentProject(this.props.projectName);
    }

    render() {
        return (
            <div>
                <Card className="project_card" title="Steps" bordered={false}>
                    {this.renderSteps()}
                    <Button type="primary" onClick={this.onBuildClick}>Build</Button>
                    <Button type="primary" danger disabled>Stop</Button>
                </Card>

                <Card className="project_card" title="Output">
                    <Output/>
                </Card>
                
                <CurrentStepBanner/>
            </div>
        )
    }

    renderSteps = () => {
        return this.props.steps.map(step => {
            return <Step key={hash(step)} step={step}/>
        })
    }

    onBuildClick = () => {
        const shell = new Shell();

        shell.executeCommands(
            this.props.stepsToExecute,
            this.onStdOut,
            this.onStdErrCallback,
            this.onStartStepCallback,
            this.onFinishSuccess,
            this.onFinishError
        );
    }

    onStdOut = (log) => {
        this.props.addLog({...log});
    }
    
    onStdErrCallback = (log) => {
        this.props.addLog({...log});
    };

    onStartStepCallback = (step) => {
        this.props.stepStarted(step);
    };

    onFinishSuccess = () => {
        message.success('All steps executed successfully!');
        this.props.allStepsFinished();
    };

    onFinishError = () => {
        message.error('There was an error');
        this.props.allStepsFinished();
    };
}

const mapStateToProps = (state) => {
    return {
        stepsToExecute: state.projects.all[state.projects.current].stepsToExecute
    }
};

export default connect(mapStateToProps, {setCurrentProject, addLog, stepStarted, allStepsFinished})(Project);