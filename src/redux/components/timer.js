import React, {Fragment, useState, useEffect} from "react";
import {startStopTimer, countDown, resetTimer} from "../actions";
import {connect} from "react-redux";


const Timer = ({status, time, color, startStopTimer, countDown, resetTimer}) => {

    const [timer, setTimer] = useState(0);

    useEffect(() => {
        if (time.minutes === "00" && time.seconds === "00") {
            document.getElementById('beep').play();
        }
    }, [time])

    const toggle = () => {
        startStopTimer();
        if (timer === 0) {
            setTimer(setInterval(() => {countDown()}, 1000));
        } else {
            stop();
        }
    }

    const stop = () => {
        console.log(color)
        clearInterval(timer);
        setTimer(0);
    }

    const reset = () => {
        stop();
        resetTimer();
        document.getElementById('beep').pause();
    }

    return (
        <Fragment>
            <div className="timer" style={{color: color}}>
                <div className="timer-wrapper">
                    <div id="timer-label">{status}</div>
                    <div id="time-left">{time.minutes}:{time.seconds}</div>
                </div>
            </div>
            <div className="timer-control">
                <button id="start_stop" onClick={() => toggle()}>
                    <i className="fa fa-play fa-2x"/>
                    <i className="fa fa-pause fa-2x"/>
                </button>
                <button id="reset">
                    <i className="fa fa-refresh fa-2x" onClick={() => reset()}/>
                </button>
            </div>
        </Fragment>

    );
}

const mapStateToProps = state => {
    return {
        status: state.status,
        time: state.timer,
        color: state.timeColor
    }
};

const mapDispatchToProps = {
    startStopTimer: startStopTimer,
    countDown: countDown,
    resetTimer: resetTimer
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);