import React from "react";
import {connect} from "react-redux";
import hash from 'object-hash';
import * as moment from "moment";
import {Button} from "antd";
import {clear} from "../../../../store/slices/projectSlice";
import "./Output.scss"

class Output extends React.Component {    
    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return(
            <div>
                <div className="output" ref={ref => {this.outputRef = ref;}}>
                    {this.renderLogs()}
                </div>
                <Button
                    className="output_clearButton" 
                    type="primary"
                    onClick={this.onClearClick}
                >
                    Clear
                </Button>
            </div>
        );
    }
    
    renderLogs = () => {
        if (!this.props.logs) {
            return null;
        }

        return this.props.logs.map((log) => {return this.renderLog(log)});
    }
    
    renderLog = (log) => {
        return (
            <div key={hash(log)} className="output_log">
                <b>{this.getFormattedTime(log)}></b>
                <span className={this.getLogClass(log)}>{log.data}</span>
            </div>
        )
    }

    getFormattedTime = (log) => {
        return moment(log.time).format("HH:mm:ss");
    };
    
    scrollToBottom = () => {
        this.outputRef.scrollTop = this.outputRef.scrollHeight;
    };

    onClearClick = () => {
        this.props.clear();
    };

    getLogClass = (log) => {
        return log.type === "internal"
            ? "output_log--internal"
            : "";
    };
}

const mapStateToProps = (state) => {
    return {
        logs: state.projects.all[state.projects.current].logs
    }
}

export default connect(mapStateToProps, {clear})(Output);