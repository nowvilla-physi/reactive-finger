import React from 'react';
import '../assets/sass/note.scss';
import { Key } from '../components/index';
import * as Strings from '../strings';

const Note = () => {
    const mailAddress = process.env.REACT_APP_MAIL_ADDRESS;

    return (
        <div className="note">
            <Key spell={ '注' } />
            <Key spell={ '意' } />
            <Key spell={ '事' } />
            <Key spell={ '項' } />
            <p className="note__description">{Strings.HOME_NOTE_INTRODUCTION}</p>
            <p className="note__description">{Strings.HOME_NOTE_METHOD}</p>
            <p className="note__description">{Strings.HOME_NOTE_QUESTIONS}</p>
            <p className="note__description">{Strings.HOME_NOTE_TYPE_KIND}</p>
            <p className="note__description--red">{Strings.HOME_NOTE_PRIVACY}</p>
            <p className="note__description--red">{Strings.HOME_NOTE_RESPONSIBILITY}</p>
            <p className="note__description">{Strings.HOME_NOTE_CONTACT}</p>
            <a className="note__contact"
                href={ "mailto:" + mailAddress + "?subject=" + Strings.HOME_NOTE_MAIL_SUBJECT }>{ Strings.HOME_NOTE_MAIL_SUBJECT }
            </a>
        </div>
    )
}

export default Note
