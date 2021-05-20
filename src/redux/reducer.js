const changeValue = (state, payload) => {

    if (state.active) return state;

    const {name, val} = payload;
    const oldValue = state.labelArray[name];
    const newValue = oldValue + val;

    if (newValue > 0 && newValue < 61) {

        let { break: breakValue, session: sessionValue } = state.labelArray;
        let timer = state.timer;

        switch(name){
            case 'break' : breakValue = newValue; break;
            case 'session' :
                sessionValue = newValue;
                timer = timeToString(newValue, 0)
                break;
            default: break;
        }

        return {...state, labelArray: {break: breakValue, session: sessionValue}, timer: timer};
    } else {
        return state;
    }
};

const startStopTimer = state => {
    return {...state, active: !state.active};
}

const countDown = state => {
    if (state.active) {
        let { minutes: min, seconds: sec } = state.timer;

        min = parseInt(min);
        sec = parseInt(sec);

        if (--sec < 0){
            min--;
            if (min < 0) {
                const curStatus = state.status;

                if (curStatus === 'Session') {
                    return {...state, status: 'Break', timer: timeToString(state.labelArray.break, 0), timeColor: 'white'};
                } else {
                    return {...state, status: 'Session', timer: timeToString(state.labelArray.session, 0), timeColor: 'white'};
                }
            } else {
                sec = 59;
            }
        }

        let timerColor = 'white';
        if (min < 1) {
            timerColor = 'rgb(165, 13, 13)';
        }

        return {...state, timer: timeToString(min, sec), timeColor: timerColor};
    } else {
        return state;
    }
}

const timeToString = (min, sec) => {
    min = min.toString()
    if (min.length < 2) {
        min = "0" + min;
    }

    sec = sec.toString();
    if (sec.length < 2) {
        sec = "0" + sec;
    }

    return {minutes: min, seconds: sec};
}

const resetTimer = () => {
    return preloadedState;
}

const preloadedState = {
    active: false,
    status: 'Session',
    timeColor: 'white',
    labelArray: {
        break: 5,
        session: 25
    },
    timer: {
        minutes: '25',
        seconds: '00'
    },
};

const reducer = (state, action) => {
    if (state === undefined) {
        return preloadedState;
    }

    switch (action.type) {
        case 'CHANGE_VALUE': return changeValue(state, action.payload);
        case 'START_STOP_TIMER': return startStopTimer(state);
        case 'COUNT_TIMER': return countDown(state);
        case 'RESET_TIMER': return resetTimer();
        default: return state;
    }
};

export default reducer;