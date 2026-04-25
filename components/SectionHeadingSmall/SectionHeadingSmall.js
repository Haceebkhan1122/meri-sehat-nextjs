import React from 'react';
// import './sectionHeadingSmall.css';

function SectionHeadingSmall(props) {
    const { text, color } = props;


    return (
        <div>
            <h3 dir="auto" className="sectionHeadingSmall" style={{ color }}>
                {text || ''}
            </h3>
        </div>
    );
}

export default SectionHeadingSmall;
