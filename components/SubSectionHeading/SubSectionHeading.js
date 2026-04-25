import React from 'react';

function SubSectionHeading(props) {
    const { text, color } = props;
    return (
        <div>
            <h3 dir="auto" className="subSectionHeading" style={{ color }}>
                {text || ''}
            </h3>
        </div>
    );
}

export default SubSectionHeading;
