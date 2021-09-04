import React from 'react';
import '../assets/sass/key.scss';

const Key = (props) => {
    return (
        <button className="key">{ props.spell }</button>
    )
}

export default Key
