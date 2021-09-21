const actions = {
    startGame() {
        return {
            type: 'START',
            payload: { isStart: 1, startTime: performance.now(), finishTime: null},
        };
    },
    resetGame() {
        return {
            type: 'RESET',
            payload: { isStart: 0, startTime: null, finishTime: null},
        };
    },
    finishGame() {
        return {
            type: 'FINISH',
            payload: { isStart: -1, finishTime: performance.now() },
        };
    },
    addCorrectType() {
        return {
            type: 'ADD_CORRECT_TYPE'
        };
    },
    addIncorrectType() {
        return {
            type: 'ADD_INCORRECT_TYPE'
        };
    },
    setSolvedCount() {
        return {
            type: 'SOLVED_COUNT'
        };
    }
}

export default actions;
