import React from "react";
import Project from "./projectBase/ProjectBase";
import StepsRepository from "../../core/StepsRepository";

class KittyFur extends React.Component {
    stepsRepository = new StepsRepository();
    
    render() {
        return (
            <Project
                projectName="kittyFur"
                steps={this.stepsRepository.kittyFurSteps}
            />
        );
    }
}

export default KittyFur;