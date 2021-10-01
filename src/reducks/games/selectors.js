import { createSelector } from 'reselect';

const gamesSelector = (state) => state.games;

export const getIsStart = createSelector(
    [gamesSelector],
    state => state.isStart
);

export const getTypeSpeed = createSelector(
    [gamesSelector],
    state => state.typeSpeed
);

export const getCorrectType = createSelector(
    [gamesSelector],
    state => state.correctType
);

export const getIncorrectType = createSelector(
    [gamesSelector],
    state => state.incorrectType
);

export const getSolvedCount = createSelector(
    [gamesSelector],
    state => state.solvedCount
);
