import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '.';
import ErrorImage from '../assets/images/error.png';
import '../assets/sass/error.scss';
import * as Strings from '../strings';

const Error = (props) => {
    const history = useHistory();

    const toHome = () => {
        history.push(Strings.HOME_URL)
    }

    return(
        <div className="error">
            <h2 className="error__status-code">{ props.errorCode }</h2>
            <p className="error__message">{ props.errorMessage }</p>
            <div>
                <img className="error__image" src={ ErrorImage } alt="エラー" />
            </div>
            <Button
                className={ "button--error" }
                name={ Strings.ERROR_RETURN_HOME_BUTTON }
                doClick={ toHome }
            />
        </div>
    )
}

export default Error
