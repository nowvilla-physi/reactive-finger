import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/sass/start-typing.scss';
import { Button, Typing } from '../components/index';
import * as Strings from '../strings';
import whistleAudio from '../assets/audio/whistle.mp3';

const whistle = new Audio(whistleAudio);

const StartTyping = () => {
    // 0: ゲーム開始前 1: ゲーム中 -1: ゲーム終了
    const [isStart, setIsStart] = useState(0);
    const [time, setTime] = useState(0);
    const [typeSpeed, setTypeSpeed] = useState(0);
    const [correctType, setCorrectType] = useState(0);
    const [incorrectType, setIncorrectType] = useState(0);
    const [solvedCount, setSolvedCount] = useState(0);
    const hasSolvedAll = solvedCount === 20;

    const resetGame = () => {
        setIsStart(0);
        resetTimer();
        resetTypeSpeed();
        resetCorrectType();
        resetIncorrectType();
        resetSolvedCount();
    };
    const startGame = () => {
        setIsStart(1);
        whistle.play().then();
    };
    const finishGame = () => {
        setIsStart(-1);
        whistle.play().then();
        calcTypeSpeed();
        setTimeout(() => {
            toScore()
        }, 500);
    };

    useEffect(() => {
        let timer;

        if (isStart === 1) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return function cleanUp() {
            clearInterval(timer);
        }
    }, [time, isStart]);

    const resetTimer = () => {
        setTime(0);
    };

    const calcTypeSpeed = () => {
        setTypeSpeed(Math.round(correctType * 10 / time) / 10);
    };

    const resetTypeSpeed = () => {
        setTypeSpeed(0);
    };

    const addCorrectType = () => {
        setCorrectType(prevCorrectType => prevCorrectType + 1);
    };

    const resetCorrectType = () => {
        setCorrectType(0);
    };

    const addIncorrectType = () => {
        setIncorrectType(prevIncorrectType => prevIncorrectType + 1);
    };

    const resetIncorrectType = () => {
        setIncorrectType(0);
    };

    const resetSolvedCount = () => {
        setSolvedCount(0);
    }

    const handleKeyDown = useCallback((event) => {
        switch (event.which) {
            // スペースキーコードは32。
            case 32:
                startGame();
                break;
            // エスケープキーコードは27。
            case 27:
                if (isStart !== 0) {
                    resetGame();
                }
                break;
            default:
                break;
        }
    }, [isStart]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);
        return (() => {
            window.removeEventListener("keydown", handleKeyDown, false);
        })
    }, [isStart]);

    const solveProblem = useCallback(() => {
        setSolvedCount(prevSolvedCount => prevSolvedCount + 1);
    }, [solvedCount]);

    const history = useHistory();
    const toHome = () => {
        history.push(Strings.HOME_URL);
    };
    const toRanking = () => {
        history.push(Strings.RANKING_URL);
    };
    const toScore = () => {
        history.push({
            pathname: Strings.SCORE_URL,
            state: {
                typeSpeed: typeSpeed,
                correctType: correctType,
                incorrectType: incorrectType
            }
        })
    };

    return (
        <div className="start-typing">
            <div className="start-typing__step"
                 style={{"width": `${ 100.0 * solvedCount / 20 }%`}}>
            </div>
            <Typing
                isStart={ isStart }
                finishGame={ finishGame }
                addCorrectType={ addCorrectType }
                addIncorrectType={ addIncorrectType }
                solvedCount={ solvedCount }
                solveProblem={ solveProblem }
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

export default StartTyping
