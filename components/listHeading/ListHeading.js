import React from 'react';
// import './listHeading.css';

function ListHeading(props) {
    const { text } = props;
    return (
        <div>
            <h3 dir="auto" className="listHeading">
                {' '}
                {text || ''}{' '}
            </h3>
        </div>
    );
}

export default ListHeading;
