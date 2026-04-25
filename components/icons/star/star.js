import React from 'react';
// import './star.css';
import img from '../../../public/svg/star.svg'
import Image from 'next/image';

function Star() {
    return (
        <div>
            <Image src={img} alt="star" />
        </div>
    );
}

export default Star;
