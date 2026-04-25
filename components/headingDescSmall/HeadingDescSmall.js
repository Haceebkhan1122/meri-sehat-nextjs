import React from 'react';
// import './headingDescSmall.css';

function HeadingDescSmall(props) {
    const { text, children,className } = props;
    return (
        <div>
            <h5 dir="auto" className={`heading_desc_small ${className}`}>
                {text || children || ''}
            </h5>
        </div>
    );
}

export default React.memo(HeadingDescSmall);
