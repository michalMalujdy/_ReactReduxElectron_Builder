import {buildLog} from "./Log";
const {spawn} = window.require('child_process');

export default class Shell {
    executeCommands = (steps, onStdout, onStderr, onStartStep, onFinishSuccess, onFinishError) => {
        steps = this.getUnpackedAndSortedSteps(steps);
        this.executeCommandsRecurrent(steps, 0, onStdout, onStderr, onStartStep, onFinishSuccess, onFinishError);
    };

    executeCommandsRecurrent = (steps, index, onStdout, onStderr, onStartStepCallback, onFinishSuccess, onFinishError) => {
        if (index >= steps.length) {
            onStdout(this.getFinishedAllLog());
            onFinishSuccess();
            return;
        }
        
        const step = steps[index];
        index += 1;

        onStartStepCallback(step);
        onStdout(this.getStartCommandLog(step));
        
        const process = spawn(step.command, [], {shell: true});
        process.stdout.setEncoding('utf8');

        process.stdout.on('data', this.handleStdout(onStdout));
        process.stderr.on('data', this.handleStderr(onStderr));
        process.on('close', this.handleRecurrentClose(steps, index, onStdout, onStderr, onStartStepCallback, onFinishSuccess, onFinishError));
    };

    getUnpackedAndSortedSteps = (steps) => {
        return [...steps].sort((c1, c2) => c1.order - c2.order);
    };

    handleStdout = (onStdoutCallback) => {
        return (data) => {
            onStdoutCallback(buildLog('info', data));
        };
    };

    handleStderr = (onStderrCallback) => {
        return (data) => {
            onStderrCallback(buildLog('error', data));
        };
    };

    handleRecurrentClose = (steps, index, onStdout, onStderr, onStartStep, onFinishSuccess, onFinishError) => {
        return (exitCode) => {
            const step = steps[index - 1];
            
            if (exitCode === 0) {
                onStdout(this.getFinishCommandLog(step))
                this.executeCommandsRecurrent(steps, index, onStdout, onStderr, onStartStep, onFinishSuccess, onFinishError);
            } else {
                onStdout(this.getErrorLog(step))
                onFinishError();
            }
        };
    };

    getStartCommandLog = (step) => {
        return buildLog("internal", `Starting ${step.name}`);
    };

    getFinishCommandLog = (step) => {
        return buildLog("internal", `Finished ${step.name} successfully!`);
    };

    getFinishedAllLog = () => {
        return buildLog("internal", "Finished executing all steps successfully!");
    };
    
    getErrorLog = (step) => {
        return buildLog("internal", `Error executing step ${step.name}. Execution stopped.`);
    };
}