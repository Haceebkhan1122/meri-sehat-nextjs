import React from 'react';
// import './sectionHeadingLarge.css';

function SectionHeadingLarge(props) {
    const { text } = props;

    return (
        <div>
            <h1 dir="auto" className="sectionHeadingLarge">
                {text || ''}
            </h1>
        </div>
    );
}

export default React.memo(SectionHeadingLarge);
