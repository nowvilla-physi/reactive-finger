import React from 'react';
import Logo from '../assets/images/logo.svg';
import '../assets/sass/header.scss';

const Header = () => {
    return (
        <header className="header">
            <h1 className="header__logo">
                <img src={ Logo } alt="Reactive-Finger" />
            </h1>
        </header>
    )
};

export default Header;
