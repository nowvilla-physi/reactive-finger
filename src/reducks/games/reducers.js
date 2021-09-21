import whistleAudio from '../../assets/audio/whistle.mp3';

const whistle = new Audio(whistleAudio);

const initialState = {
    isStart: 0,
    startTime: null,
    finishTime: null,
    typeSpeed: 0,
    correctType: 0,
    incorrectType: 0,
    solvedCount: 0
}

const gamesReducer = (state= initialState, action) => {
    switch (action.type) {
        case 'START': {
            whistle.play().then();
            return { ...state, ...action.payload };
        }
        case 'RESET': {
            return initialState;
        }
        case 'FINISH': {
            whistle.play().then();
            const typeSpeed = calcTypeSpeed(state.correctType, state.startTime, action.payload.finishTime);
            return { ...state, ...action.payload, typeSpeed: typeSpeed };
        }
        case 'ADD_CORRECT_TYPE': {
            return { ...state, correctType: state.correctType + 1 };
        }
        case 'ADD_INCORRECT_TYPE': {
            return { ...state, incorrectType: state.incorrectType + 1 };
        }
        case 'SOLVED_COUNT': {
            return { ...state, solvedCount: state.solvedCount + 1 };
        }
        default: {
            return state;
        }
    }
}

const calcTypeSpeed = (correctType, startTime, finishTime) => {
    const time = (finishTime - startTime) / 1000;
    return Math.round(correctType * 10 / (time)) / 10;
};

export default gamesReducer;
