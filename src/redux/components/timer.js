import React, {Fragment} from "react";
import {startStopTimer, countDown} from "../actions";
import {connect} from "react-redux";


const Timer = ({active, minutes, seconds, startStopTimer, countDown}) => {

    const toggleTimer = () => {
        console.log(active);
        startStopTimer();
        if (!active) setTimeout(() => {countDown_()}, 1000);
    }

    const countDown_ = () => {
        console.log(active);
        if (!active) {
            countDown();
            setTimeout(() => {countDown_()}, 1000);
        }
    }

    return (
        <Fragment>
            <div className="timer">
                <div className="timer-wrapper">
                    <div id="timer-label">Session</div>
                    <div id="time-left">{minutes}:{seconds}</div>
                </div>
            </div>
            <div className="timer-control">
                <button id="start_stop" onClick={() => toggleTimer()}>
                    <i className="fa fa-play fa-2x"/>
                    <i className="fa fa-pause fa-2x"/>
                </button>
                <button id="reset">
                    <i className="fa fa-refresh fa-2x"/>
                </button>
            </div>
        </Fragment>

    );
}

const mapStateToProps = state => {
    return {
        active: state.active,
        minutes: state.timer.minutes,
        seconds: state.timer.seconds
    }
};

const mapDispatchToProps = {
    startStopTimer: startStopTimer,
    countDown: countDown
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);