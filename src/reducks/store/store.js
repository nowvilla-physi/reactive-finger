import { createStore as reduxCreateStore, combineReducers } from 'redux';
import gamesReducer from '../games/reducers';

export default function createStore() {
    return reduxCreateStore(
        combineReducers({
            games: gamesReducer
        })
    )
}
