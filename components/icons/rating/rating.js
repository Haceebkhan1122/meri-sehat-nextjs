import React from 'react';
import { Star } from '../star';
// import './rating.css';

function Rating(props) {
    const { text, subText } = props;
    return (
        <div className="rating">
            <Star />
            <h6>
                {text} <span style={{ color: '#fff' }} >/ {subText}</span>
            </h6>
        </div>
    );
}

export default Rating;
