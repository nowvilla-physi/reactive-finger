import React from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/sass/start-typing.scss';
import { Button, Typing } from '../components/index';
import * as Strings from '../strings';
import { useDispatch, useSelector } from 'react-redux';
import { getSolvedCount } from "../reducks/games/selectors";
import actions from "../reducks/games/actions";

const StartTyping = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const solvedCount = getSolvedCount(selector);
    const allQuestionNumber = 20;
    const hasSolvedAll = solvedCount === allQuestionNumber;

    const finishGame = () => {
        dispatch(actions.finishGame())
        setTimeout(() => {
            toScore();
        }, 500);
    };

    const history = useHistory();
    const toHome = () => {
        history.push(Strings.HOME_URL);
    };
    const toRanking = () => {
        history.push(Strings.RANKING_URL);
    };
    const toScore = () => {
        history.push(Strings.SCORE_URL);
    };

    return (
        <div className="start-typing">
            <div className="start-typing__step"
                 style={{"width": `${ 100.0 * solvedCount / allQuestionNumber }%`}}>
            </div>
            <Typing
                finishGame={ finishGame }
                addCorrectType={ () => dispatch(actions.addCorrectType()) }
                addIncorrectType={ () => dispatch(actions.addIncorrectType()) }
                solvedCount={ solvedCount }
                solveProblem={ () => dispatch(actions.setSolvedCount()) }
                hasSolvedAll={ hasSolvedAll }
            />
            <div className="start-typing__buttons">
                <Button
                    className={ 'button--primary' }
                    name={ Strings.START_TO_RANKING_BUTTON }
                    doClick={ toRanking }
                />
                <Button
                    className={ 'button--primary' }
                    name={ Strings.START_BACK_TO_HOME_BUTTON }
                    doClick={ toHome }
                />
            </div>
        </div>
    )
}

export default StartTyping;
