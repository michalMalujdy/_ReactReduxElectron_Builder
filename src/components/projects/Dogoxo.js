import React from "react";
import Project from "./projectBase/ProjectBase";
import StepsRepository from "../../core/StepsRepository";

class Dogoxo extends React.Component {
    stepsRepository = new StepsRepository();

    render() {
        return (
            <Project
                projectName="dogoxo"
                steps={this.stepsRepository.dogoxoSteps}
            />
        );
    }
}

export default Dogoxo;