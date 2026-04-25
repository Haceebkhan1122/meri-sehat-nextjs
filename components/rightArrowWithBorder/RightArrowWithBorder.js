import React from 'react';
// import './rightArrowWithBorder.css';
import img from '../../public/svg/right-arrow-border.svg'
import Image from 'next/image';

function RightArrowWithBorder() {
    return (
        <div>
            <Image src={img} width={30} height={30} alt="arrow-with-border" className="arrow_right_border" />
        </div>
    );
}

export default RightArrowWithBorder;
