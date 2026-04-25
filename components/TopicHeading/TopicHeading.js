import React from 'react';
// import './topicHeading.css';

function TopicHeading(props) {
    const { text } = props;
    return (
        <div>
            <h3 dir="auto" className="topicHeading">
                {text || ''}
            </h3>
        </div>
    );
}

export default TopicHeading;
