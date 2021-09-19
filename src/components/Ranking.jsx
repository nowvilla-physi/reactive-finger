import format from 'date-fns/format';
import React, { useEffect, useState } from 'react';
import ReactFlexyTable from 'react-flexy-table';
import 'react-flexy-table/dist/index.css';
import { useHistory } from 'react-router-dom';
import '../assets/sass/ranking.scss';
import { Button, Key } from '../components/index';
import { db } from '../firebase/index';
import * as Strings from '../strings';

const Ranking = () => {
    const [data, setData] = useState([]);
    const updateTableData = (newData) => {
        setData(prevData =>
            [...prevData, newData]
        );
    };

    useEffect(() => {
        (async () => {
            await db.collection('score')
                .orderBy('typeSpeed', 'desc')
                .orderBy('correctType', 'desc')
                .orderBy('incorrectType')
                .orderBy('playDate', 'desc')
                .get()
                .then(snapshots => {
                snapshots.forEach(doc => {
                    const result = doc.data();
                    const data = {
                        [Strings.RANKING_TABLE_HEADER_NAME]: result.name,
                        [Strings.RANKING_TABLE_HEADER_TYPE_SPEED]: result.typeSpeed.toPrecision(2),
                        [Strings.RANKING_TABLE_HEADER_CORRECT_TYPE]: result.correctType.toString(),
                        [Strings.RANKING_TABLE_HEADER_INCORRECT_TYPE]: result.incorrectType.toString(),
                        [Strings.RANKING_TABLE_HEADER_PLAY_DATE]: format(result.playDate.toDate(), 'yyyy/MM/dd HH:mm:ss')
                    };
                    updateTableData(data);
                })
            }).catch((error) => {
                console.log(error);
                toError();
            })
        })();
    }, []);

    const history = useHistory();
    const toHome = () => {
        history.push(Strings.HOME_URL);
    };
    const toError = () => {
        history.push(Strings.ERROR_URL);
    };
    const toStart = () => {
        history.push(Strings.START_TYPING_URL);
    };

    return (
        <div className='ranking'>
            <div className='ranking__title'>
                <Key spell={ 'R' } />
                <Key spell={ 'A' } />
                <Key spell={ 'N' } />
                <Key spell={ 'K' } />
                <Key spell={ 'I' } />
                <Key spell={ 'N' } />
                <Key spell={ 'G' } />
            </div>
            <ReactFlexyTable data={data} pageSize={50} pageSizeOptions={[10, 20 ,30, 40, 50]}/>
            <div className='ranking__buttons'>
                <Button
                    className={ 'button--primary' }
                    name={ Strings.RANKING_RETURN_START_BUTTON }
                    doClick={ toStart }
                />
                <Button
                    className={ 'button--primary' }
                    name={ Strings.RANKING_RETURN_HOME_BUTTON }
                    doClick={ toHome }
                />
            </div>
        </div>
    )
}

export default Ranking
