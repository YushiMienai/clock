import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import {changeValue} from "../actions";

const ControlLine = () => {

    const {labelArray : {break: breakLabel, session: sessionLabel}} = useSelector(state => state);
    const dispatch = useDispatch();

    const renderButton = (name, value) => {
        const lowName = name.toLowerCase();
        let decrementButton = lowName + "-decrement";
        let incrementButton = lowName + "-increment";

        return <div className="length-control">
            <div id="break-label">{name} Length</div>
            <button className="btn-level" id={decrementButton} value={"-"} onClick={() => dispatch(changeValue(lowName, -1))}>
                <i className="fa fa-arrow-down fa-2x"/>
            </button>
            <div className="btn-level">{value}</div>
            <button className="btn-level" id={incrementButton} value={"+"} onClick={() => dispatch(changeValue(lowName, 1))}>
                <i className="fa fa-arrow-up fa-2x"/>
            </button>
            <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>
        </div>
    }

    return <>
        {renderButton('Break', breakLabel)}
        {renderButton('Session', sessionLabel)}
    </>;

}

export default ControlLine;