import React from 'react';
// import './headingWithSpace.css';

function HeadingWithSpace(props) {
    const { text } = props;

    return (
        <div>
            <h6 dir="auto" className="headingWithSpace">
                {text || ''}
            </h6>
        </div>
    );
}

export default HeadingWithSpace;
