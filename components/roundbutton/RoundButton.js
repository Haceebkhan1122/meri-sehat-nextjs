import Link from 'next/link';
// import './roundButton.css';
import React from 'react';

function RoundButton(props) {
    const { text, link, key } = props;
    return (
        <Link key={key || ''} href={link || '#'} className="roundButton">
            {text || ''}
        </Link>
    );
}

export default RoundButton;
