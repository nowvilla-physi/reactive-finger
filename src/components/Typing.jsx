import React, { useEffect, useState } from 'react';
import '../assets/sass/typing.scss';
import * as Strings from '../strings';
import * as JSON from "../assets/question/question.json";
import { Problem } from "./index";

const Typing = (props) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (props.hasSolvedAll) {
            props.finishGame();
        }
    })

    useEffect(() => {
        if (props.isStart === 0) {
            const questions = JSON.questions;
            for (let i=questions.length; 1<i; i--) {
                let k = Math.floor(Math.random() * i);
                [questions[k], questions[i - 1]] = [questions[i - 1], questions[k]];
            }
            setQuestions(questions);
        }

    }, [props.isStart])

    return (
        <div className="typing">
            <div className={ "typing__init--" + (props.isStart === 0 ? 'visible' : 'invisible ')}>
                <p className="typing__init--visible-text">{ Strings.TYPING_INIT_PREPARE_KEYBOARD } </p>
                <p className="typing__init--visible-text">{ Strings.TYPING_INIT_PUSH_SPACE_KEY }</p>
                <p className="typing__init--visible-text">{ Strings.TYPING_INIT_PUSH_ESCAPE_KEY }</p>
            </div>
            <div className={ "typing__play--" + (props.isStart === 1 ? 'visible' : 'invisible')}>
                {questions.map((sentence, index) => {
                    if (index === props.solvedCount) {
                        const expectedSentence = questions[props.solvedCount];
                        return (
                            <Problem
                                expectedSentenceKana={ expectedSentence.kana }
                                expectedSentence={ expectedSentence.alphabet }
                                solveProblem={ props.solveProblem }
                                addCorrectType={ props.addCorrectType }
                                addIncorrectType={ props.addIncorrectType }
                                key={ index }
                            />
                        )
                    } else {
                        return false;
                    }
                })}
            </div>
            <div className={ "typing__finish--" + (props.isStart === -1 ? 'visible' : 'invisible')}>
                <p className="typing__finish--visible-text">{ Strings.TYPING_FINISH } </p>
                <p className="typing__finish--visible-text">{ Strings.TYPING_FINISH_CALCULATING } </p>
            </div>
        </div>
    )
}

export default Typing
