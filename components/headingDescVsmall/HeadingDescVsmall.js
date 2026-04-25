import React from 'react';
// import './headingDescVsmall.css';

function HeadingDescVsmall(props) {
    const { text, onClick, className, color } = props;
    return (
        <h6
            style={{ color: color }}
            onClick={onClick}
            className={`headingDescVsmall ${(className && className) || ''}`}
        >
            {' '}
            {text || ''}{' '}
        </h6>
    );
}

export default HeadingDescVsmall;
