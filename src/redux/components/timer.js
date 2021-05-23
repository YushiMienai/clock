import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {countDown, resetTimer, startStopTimer} from "../actions";


const Timer = () => {

    const {status, timer: time} = useSelector(state => state);
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(0);

    let color = 'white';

    const generateClock = time => {
        let minutes = Math.floor(time / 60).toString();
        let seconds = (time % 60).toString();

        if (minutes.length < 2) {
            minutes = "0" + minutes;
        }

        if (seconds.length < 2) {
            seconds = "0" + seconds;
        }

        if (time < 60) {
            color = 'rgb(165, 13, 13)';
        } else {
            color = 'white';
        }

        if (time === 0) {
            document.getElementById('beep').play();
        }

        return minutes + ":" + seconds;
    }

    let clock = generateClock(time);

    useEffect(() => {

        clock = generateClock(time);

    }, [timer])

    const toggle = () => {
        dispatch(startStopTimer());
        if (timer === 0) {
            setTimer(setInterval(() => {dispatch(countDown())}, 1000));
        } else {
            stop();
        }
    }

    const stop = () => {
        clearInterval(timer);
        setTimer(0);
    }

    const reset = () => {
        stop();
        dispatch(resetTimer());
        document.getElementById('beep').pause();
    }

    return (
        <>
            <div className="timer" style={{color: color}}>
                <div className="timer-wrapper">
                    <div id="timer-label">{status}</div>
                    <div id="time-left">{clock}</div>
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
        </>

    );
}

export default Timer;