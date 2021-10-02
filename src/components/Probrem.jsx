import React, { useCallback, useEffect, useState } from 'react';
import '../assets/sass/problem.scss';
import key_fail from '../assets/audio/key_fail.mp3';
import solved_question from '../assets/audio/solved_question.mp3';
import actions from '../reducks/games/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getIsStart } from '../reducks/games/selectors';
import { useHistory } from "react-router-dom";

const keyFail = new Audio(key_fail);
const solvedQuestion = new Audio(solved_question);

const useKeyMatcher = (addCorrectType, addIncorrectType, typeKindList) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const selector = useSelector(state => state);
    const isStart = getIsStart(selector);
    const [inputtedStr, setInputtedStr] = useState('');
    const [inputtedFullStr, setInputtedFullStr] = useState('');
    const [flagList, setFlagList] = useState([]);
    const [allMatched, setAllMatched] = useState(false);
    const [index, setIndex] = useState(0);
    const [partialMatchStr, setPartialMatchStr] = useState('');

    let isCleanedUp = false;

    useEffect(() => {
        typeKindList.forEach(_ => {
            setFlagList(prevFlagList =>
                [...prevFlagList, false]
            );
        });
    }, []);

    const handleKeyDown = useCallback((e) => {
        if (isCleanedUp) return;
        // escキー
        if (e.which === 27) {
            if (isStart !== 0) {
                history.go(0)
            }
            return;
        // スペースキー
        } else if(e.which === 32) {
            if (isStart === 0) {
                dispatch(actions.startGame());
            }
            return;
        }

        const key = e.key;
        const slicedHiraganaIndex = flagList.indexOf(false);

        for (let i=0; i<typeKindList[slicedHiraganaIndex].length; i++) {
            // 完全一致した場合は次の文字のマッチ処理にうつる
            if (typeKindList[slicedHiraganaIndex][i] === (inputtedStr + key)) {
                flagList[slicedHiraganaIndex] = true;
                setInputtedStr('');
                setInputtedFullStr(prevInputtedFullStr => prevInputtedFullStr + key);
                dispatch(actions.addCorrectType());
                break;
            } else if (typeKindList[slicedHiraganaIndex][i].startsWith(inputtedStr + key)) {
                if (i !== 0) {
                    setIndex(slicedHiraganaIndex);
                    setPartialMatchStr(typeKindList[slicedHiraganaIndex][i]);
                }
                setInputtedStr(prevInputtedStr => prevInputtedStr + key);
                setInputtedFullStr(prevInputtedFullStr => prevInputtedFullStr + key);
                dispatch(actions.addCorrectType());
                break;
            } else {
                if (i === typeKindList[slicedHiraganaIndex].length - 1) {
                    keyFail.play().then();
                    dispatch(actions.addIncorrectType());
                }
            }
        }

        // 1問全部タイプできたかを判定する
        setAllMatched(!flagList.includes(false));
    }, [isStart, inputtedStr, isCleanedUp, flagList]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return (() => {
            isCleanedUp = true;
            window.removeEventListener("keydown", handleKeyDown);
        })
    }, [handleKeyDown]);

    return {
        inputtedFullStr: inputtedFullStr,
        allMatched: allMatched,
        index: index,
        partialMatchStr: partialMatchStr
    };
}

const Problem = (props) => {
    const parseHiraganaSentence = props.parseHiraganaSentence;
    const constructTypeSentence = props.constructTypeSentence;
    const typeKindList
        = constructTypeSentence(parseHiraganaSentence(props.expectedSentenceHiragana));
    const [displayTypeKindList, setDisplayTypeKindList] = useState([]);
    const [expectedSentence, setExpectedSentence] = useState(props.expectedSentence);

    const {inputtedFullStr, allMatched, partialMatchStr, index}
        = useKeyMatcher(
        props.addCorrectType,
        props.addIncorrectType,
        typeKindList,
    );

    useEffect(() => {
        typeKindList.forEach(typeKind => {
            setDisplayTypeKindList(prevState => [...prevState, typeKind[0]]);
        });
    }, []);

    useEffect(() => {
        if (partialMatchStr !== '') {
            setDisplayTypeKindList(displayTypeKindList.map((displayTypeKind, i) =>
                i === index ? partialMatchStr : displayTypeKind
            ));
        }
    }, [index, partialMatchStr]);

    useEffect(() => {
        setExpectedSentence(displayTypeKindList.join(''));
    }, [displayTypeKindList]);

    useEffect(() => {
        if (allMatched) {
            solvedQuestion.play().then();
            props.solveProblem();
        }
    }, [allMatched]);

    return (
        <div className="problem">
            <p> { props.expectedSentenceDisplayName }</p>
            { inputtedFullStr.split('').map((letter, index) => {
                return <span className="problem__expected" key={ index }>{ letter }</span>
            })}
            { expectedSentence.substring(inputtedFullStr.length).split('').map((letter, index) => {
                return <span className="problem__alphabet" key={ index }>{ letter }</span>
            })}
        </div>
    )
};

export default Problem;
