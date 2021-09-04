import React from 'react';
import '../assets/sass/button.scss';

const Button = (props) => {
    return (
        <button
            className={ props.className }
            onClick={ props.doClick } >
            { props.name }
        </button>
    )
}

export default Button
