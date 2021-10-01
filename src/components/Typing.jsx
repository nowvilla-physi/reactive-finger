import React, { useCallback, useEffect, useState } from 'react';
import '../assets/sass/typing.scss';
import * as Strings from '../strings';
import * as JSON from '../assets/question/question.json';
import { Problem } from './index';
import { mapping } from '../mapping';
import { useSelector } from 'react-redux';
import { getIsStart, getSolvedCount } from '../reducks/games/selectors';

const Typing = (props) => {
    const selector = useSelector(state => state);
    const isStart = getIsStart(selector);
    const solvedCount = getSolvedCount(selector);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (props.hasSolvedAll) {
            props.finishGame();
        }
    },[props.hasSolvedAll])

    useEffect(() => {
        if (isStart === 0) {
            const questions = JSON.questions
            for (let i=questions.length; 1<i; i--) {
                let k = Math.floor(Math.random() * i);
                [questions[k], questions[i - 1]] = [questions[i - 1], questions[k]];
            }

            const newQuestions = questions.slice(0, 20).map(element => {
                const biHiraganaList = parseHiraganaSentence(element.hiragana)
                const typeSentence = constructTypeSentence(biHiraganaList)
                const defaultTypeSentence = typeSentence.map(typeKind => {
                    return typeKind[0]
                })
                // 問題のデフォルトのローマ字をセットする
                return { ...element , alphabet: defaultTypeSentence.join('') }
            })
            setQuestions(newQuestions);
        }
    }, [isStart])

    const parseHiraganaSentence = useCallback((hiragana) => {
        let ret = [];
        let i = 0;
        let uni, bi, tri;
        while (i < hiragana.length) {
            uni = hiragana[i];
            bi = (i+1 < hiragana.length) ? hiragana.slice(i, i+2) : '';
            tri = (i+2 < hiragana.length) ? hiragana.slice(i, i+3) : '';

            if (tri in mapping) {
                ret.push(tri);
                i += 3;
            }
            else if (bi in mapping) {
                ret.push(bi);
                i += 2;
            } else {
                ret.push(uni);
                i++;
            }
        }
        return ret;
    },[])

    const constructTypeSentence = (slicedHiraganaList) => {
        const length = slicedHiraganaList.length;
        return slicedHiraganaList.map((slicedHiragana, index) => {
            // 文字列末尾の「ん」の処理
            if (slicedHiragana === 'ん' && index === length - 1) {
                return mapping['ん'].filter(romanAlphabet  => {
                    return romanAlphabet !== 'n'
                })
            } else {
                return mapping[slicedHiragana];
            }
        })
    }

    return (
        <div className="typing">
            <div className={ "typing__init--" + (isStart === 0 ? 'visible' : 'invisible ')}>
                <p className="typing__init--visible-text">{ Strings.TYPING_INIT_PREPARE_KEYBOARD } </p>
                <p className="typing__init--visible-text">{ Strings.TYPING_INIT_PUSH_SPACE_KEY }</p>
                <p className="typing__init--visible-text">{ Strings.TYPING_INIT_PUSH_ESCAPE_KEY }</p>
            </div>
            <div className={ "typing__play--" + (isStart === 1 ? 'visible' : 'invisible')}>
                {questions.map((sentence, index) => {
                    if (index === solvedCount) {
                        const expectedSentence = questions[solvedCount];
                        return (
                            <Problem
                                expectedSentenceDisplayName={ expectedSentence.displayName }
                                expectedSentenceHiragana={ expectedSentence.hiragana }
                                expectedSentence={ expectedSentence.alphabet }
                                solveProblem={ props.solveProblem }
                                addCorrectType={ props.addCorrectType }
                                addIncorrectType={ props.addIncorrectType }
                                key={ index }
                                parseHiraganaSentence={parseHiraganaSentence}
                                constructTypeSentence={constructTypeSentence}
                            />
                        )
                    } else {
                        return false;
                    }
                })}
            </div>
            <div className={ "typing__finish--" + (isStart === -1 ? 'visible' : 'invisible')}>
                <p className="typing__finish--visible-text">{ Strings.TYPING_FINISH } </p>
                <p className="typing__finish--visible-text">{ Strings.TYPING_FINISH_CALCULATING } </p>
            </div>
        </div>
    )
}

export default Typing;
