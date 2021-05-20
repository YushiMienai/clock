import React, {Fragment} from "react";
import { connect } from 'react-redux';
import {changeValue} from "../actions";

const ControlLine = ({breakLabel, sessionLabel, changeValue}) => {

    const renderButton = (name, value) => {
        const lowName = name.toLowerCase();
        let decrementButton = lowName + "-decrement";
        let incrementButton = lowName + "-increment";

        return <div className="length-control">
            <div id="break-label">{name} Length</div>
            <button className="btn-level" id={decrementButton} value={"-"} onClick={() => changeValue(lowName, -1)}>
                <i className="fa fa-arrow-down fa-2x"/>
            </button>
            <div className="btn-level">{value}</div>
            <button className="btn-level" id={incrementButton} value={"+"} onClick={() => changeValue(lowName, 1)}>
                <i className="fa fa-arrow-up fa-2x"/>
            </button>
        </div>
    }

    return <Fragment>
        {renderButton('Break', breakLabel)}
        {renderButton('Session', sessionLabel)}
    </Fragment>;

}

const mapStateToProps = state => {
    return {
        breakLabel: state.labelArray.break,
        sessionLabel: state.labelArray.session
    }
};

const mapDispatchToProps = {
    changeValue: changeValue
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlLine);