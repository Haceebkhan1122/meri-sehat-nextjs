import React from 'react'
import styles from './trendingTickBtn.module.scss';
import Image from 'next/image';
import doc from '/public/png/new-images/add_post-current.png';

const TrendingTickBtn = ({ image, text }) => {
    return (
        <div className={styles.color_btn_trend}>
            <Image src={doc} alt='' className={styles.img_tick} />
            {text}
        </div>
    )
}

export default TrendingTickBtn;
