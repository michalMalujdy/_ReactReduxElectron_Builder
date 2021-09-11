import React from "react";
import Project from "./projectBase/ProjectBase";
import StepsRepository from "../../core/StepsRepository";

class Petsly extends React.Component {
    stepsRepository = new StepsRepository();

    render() {
        return (
            <Project
                projectName="petsly"
                steps={this.stepsRepository.petslySteps}
            />
        );
    }
}

export default Petsly;