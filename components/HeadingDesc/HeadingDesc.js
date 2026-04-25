import React from 'react';
// import './headingDesc.css';

function HeadingDesc(props) {
    const { text, custom_class } = props;
    return (
        <div>
            <h5
                dir="auto"
                className={`heading_desc ${custom_class ? custom_class : ''}`}
            >
                {text || ''}
            </h5>
        </div>
    );
}

export default HeadingDesc;
