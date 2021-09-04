import React, { useCallback, useEffect, useState } from 'react';
import '../assets/sass/problem.scss';
import key_fail from '../assets/audio/key_fail.mp3';

const keyFail = new Audio(key_fail);

const useKeyMatcher = (answerStr, addCorrectType, addIncorrectType) => {
    const [inputtedStr, setInputtedStr] = useState("");
    let isCleanedUp = false;

    const handleKeyDown = useCallback((e) => {
        if (isCleanedUp) return;
        if (e.which === 27) {
            setInputtedStr("")
            return;
        } else if(e.which === 32) {
            return;
        }

        const key = e.key;
        if (answerStr.startsWith(inputtedStr + key)) {
            addCorrectType();
            setInputtedStr(prevInputtedStr => prevInputtedStr + key);
        }
        else {
            keyFail.play().then();
            addIncorrectType();
        }
    }, [inputtedStr, answerStr, isCleanedUp]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return (() => {
            isCleanedUp = true;
            window.removeEventListener("keydown", handleKeyDown);
        })
    }, [handleKeyDown])

    const allMatched = answerStr === inputtedStr;
    return {
        inputtedStr: inputtedStr,
        allMatched: allMatched
    };
}

const Problem = (props) => {
    const {inputtedStr, allMatched}
        = useKeyMatcher(
            props.expectedSentence,
            props.addCorrectType,
            props.addIncorrectType
        );

    useEffect(() => {
        if (allMatched) {
            props.solveProblem();
        }
    }, [allMatched])

    return (
        <div className="problem">
            <p> { props.expectedSentenceKana }</p>
            { inputtedStr.split('').map((letter, index) => {
                return <span className="problem__expected" key={ index }>{ letter }</span>
            })}
            { props.expectedSentence.substring(inputtedStr.length).split('').map((letter, index) => {
                return <span className="problem__alphabet" key={ index }>{ letter }</span>
            })}
        </div>
    )
};

export default Problem;
