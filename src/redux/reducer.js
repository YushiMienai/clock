const changeValue = (state, payload) => {

    if (state.active) return state;

    const {name, val} = payload;
    const oldValue = state.labelArray[name];
    const newValue = oldValue + val;

    if (newValue > 0 && newValue < 61) {

        let { labelArray: {break: breakValue, session: sessionValue }, timer} = state;

        switch(name){
            case 'break' : breakValue = newValue; break;
            case 'session' :
                sessionValue = newValue;
                timer = sessionValue * 60;
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
        let {timer, status} = state;

        timer--;

        if (timer < 0) {
            if (status === 'Session') {
                return {...state, status: 'Break', timer: state.labelArray.break * 60};
            } else {
                return {...state, status: 'Session', timer: state.labelArray.session * 60};
            }
        }

        return {...state, timer: timer};
    } else {
        return state;
    }
}

const resetTimer = () => {
    return preloadedState;
}

const preloadedState = {
    active: false,
    status: 'Session',
    labelArray: {
        break: 5,
        session: 25
    },
    timer: 1500,
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