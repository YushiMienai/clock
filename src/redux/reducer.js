const createNewState = (state, value, name) => {
    let active = state.active;
    let { break: breakValue, session: sessionValue } = state.labelArray;
    let { minutes: minutesValue, seconds: secondsValue } = state.timer;

    switch(name){
        case 'break' : breakValue = value; break;
        case 'session' : sessionValue = value; minutesValue = value.toString(); break;
        case 'minutes' : minutesValue = value; break;
        case 'seconds' : secondsValue = value; break;
        case 'active' : active = value; break;
        default: break;
    }

    return {
        active: active,
        labelArray: {
            break: breakValue,
            session: sessionValue,
        },
        timer: {
            minutes: minutesValue,
            seconds: secondsValue
        }
    };
};

const changeValue = (state, payload) => {

    if (state.active) return;

    const {name, val} = payload;
    const oldValue = state.labelArray[name];
    const newValue = oldValue + val;

    if (newValue > 0 && newValue < 61) {

        return createNewState(state, newValue, name)
    } else {
        return state;
    }
};

const startStopTimer = state => {
    if (state.active) {
        let { minutes: minutesValue, seconds: secondsValue } = state.timer;
        let min = parseInt(minutesValue);
        let sec = parseInt(secondsValue);
        sec = sec.toString();

        if (sec.length < 2) {
            sec = "0" + sec;
        }

        return {
            active: false,
            labelArray: {
                break: state.labelArray.break,
                session: state.labelArray.session
            },
            timer: {
                minutes: min.toString(),
                seconds: sec
            }
        };
    } else {
        return createNewState(state, true, 'active')
    }
}

const countDown = state => {
    if (state.active) {
        let { minutes: minutesValue, seconds: secondsValue } = state.timer;
        let min = parseInt(minutesValue);
        let sec = parseInt(secondsValue);

        if (--sec < 0){
            if (--min < 0) {
                return createNewState(state, false, 'active')
            } else {
                sec = 59;
            }
        }

        sec = sec.toString();

        if (sec.length < 2) {
            sec = "0" + sec;
        }

        const newState = {
            active: true,
            labelArray: {
                break: state.labelArray.break,
                session: state.labelArray.session
            },
            timer: {
                minutes: min.toString(),
                seconds: sec
            }
        };

        return newState;
    } else {
        return state;
    }
}

const reducer = (state, action) => {
    if (state === undefined) {
        return {
            active: false,
            labelArray: {
                break: 5,
                session: 25
            },
            timer: {
                minutes: '25',
                seconds: '00'
            }
        };
    }

    switch (action.type) {
        case 'CHANGE_VALUE': return changeValue(state, action.payload);
        case 'START_STOP_TIMER': return startStopTimer(state);
        case 'COUNT_TIMER': return countDown(state);
        default: return state;
    }
};

export default reducer;