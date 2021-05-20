export const changeValue = (name, val) => {
    return {
        type: 'CHANGE_VALUE',
        payload: {name, val}
    };
};
export const startStopTimer = () => {
    return {
        type: 'START_STOP_TIMER'
    }
}
export const countDown = () => {
    return {
        type: 'COUNT_TIMER'
    }
}
export const resetTimer = () => {
    return {
        type: 'RESET_TIMER'
    }
}
