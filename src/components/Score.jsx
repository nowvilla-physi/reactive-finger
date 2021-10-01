import React, { useState } from 'react';
import '../assets/sass/score.scss';
import * as Strings from '../strings';
import { Button } from './index';
import { useHistory } from 'react-router-dom';
import { db, FirebaseTimestamp } from '../firebase/index';
import { useDispatch, useSelector } from 'react-redux';
import { getCorrectType, getIncorrectType, getTypeSpeed } from '../reducks/games/selectors';
import actions from '../reducks/games/actions';

const Score = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const typeSpeed = getTypeSpeed(selector);
    const correctType = getCorrectType(selector);
    const incorrectType = getIncorrectType(selector);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');

    const handleOnChange = (e) => {
        setName(e.target.value);
    };

    const openRegisterForm = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    const registerScore = (async () => {
        if (name.trim().length > 0) {
            await db.collection('score')
                .add({
                    name: name,
                    typeSpeed: typeSpeed,
                    correctType: correctType,
                    incorrectType: incorrectType,
                    playDate: FirebaseTimestamp.now()
                }).then(() => {
                    alert(Strings.SCORE_REGISTER_SUCCESS);
                    toStart();
                }).catch((error) => {
                    console.log(error);
                    alert(Strings.SCORE_REGISTER_FAIL);
                });
        } else {
            alert(Strings.SCORE_REGISTER_ALERT);
        }
    });

    const history = useHistory();
    const toStart = () => {
        dispatch(actions.resetGame());
        history.push(Strings.START_TYPING_URL);
    };

    return (
        <>
            <div className="score">
                <h2 className="score__title">{ Strings.SCORE_TITLE }</h2>
                <div className="score__score">
                    <div className="score__score-item">
                        <h3 className="score__score-item-label">{ Strings.SCORE_TYPE_SPEED }</h3>
                        <p className="score__score-item-result">
                            { typeSpeed } <span className="score__score-item-unit">{ Strings.SCORE_TYPE_PER_SECOND_UNIT }</span>
                        </p>
                    </div>
                    <div className="score__score-item">
                        <h3 className="score__score-item-label">{ Strings.SCORE_CORRECT_TYPE }</h3>
                        <p className="score__score-item-result">
                            { correctType } <span className="score__score-item-unit">{ Strings.SCORE_TYPE_UNIT }</span>
                        </p>
                    </div>
                    <div className="score__score-item">
                        <h3 className="score__score-item-label">{ Strings.SCORE_INCORRECT_TYPE }</h3>
                        <p className="score__score-item-result">
                            { incorrectType } <span className="score__score-item-unit">{ Strings.SCORE_TYPE_UNIT }</span>
                        </p>
                    </div>
                </div>
                <div className='score__buttons'>
                    <Button
                        className={ 'button--primary' }
                        name={ Strings.SCORE_REPLAY_BUTTON }
                        doClick={ toStart }
                    />
                    <Button
                        className={ 'button--primary' }
                        name={ Strings.SCORE_REGISTER_INDUCTION_BUTTON }
                        doClick={ openRegisterForm }
                    />
                </div>
            </div>
            <div className={ "register--" + (isOpen ? 'visible' : 'invisible') }>
                <p>{ Strings.SCORE_REGISTER_NOTE }</p>
                <p>
                    <input
                        className="register--visible__name"
                        type="text"
                        value={ name }
                        onChange={ e => handleOnChange(e) }
                    />
                </p>
                <Button
                    className={ 'button--primary' }
                    name={ Strings.SCORE_REGISTER_BUTTON }
                    doClick={ registerScore }
                />
            </div>
        </>
    )
};

export default Score;
