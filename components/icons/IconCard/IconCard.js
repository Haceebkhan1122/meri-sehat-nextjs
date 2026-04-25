import React from 'react';
import { HeadingDesc } from '@/components/HeadingDesc';
import { SectionHeadingSmall } from '@/components/SectionHeadingSmall';
import Link from 'next/link';
// import './iconCard.css';
import Image from 'next/image';

function IconCard(props) {
    const { link, img, heading, desc, key } = props;
    return (
        <Link key={key} href={link || '#'}>
            <div className="iconCard">
                <div className="img_box">
                    <Image crossorigin="anonymous" src={img} alt="icon card" width={100} height={100} />
                </div>
                <div className="card_body">
                    <SectionHeadingSmall text={heading} />
                    <HeadingDesc text={desc} />
                </div>
            </div>
        </Link>
    );
}

export default IconCard;
