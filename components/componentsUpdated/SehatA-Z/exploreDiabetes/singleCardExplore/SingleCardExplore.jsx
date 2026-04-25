import React from 'react'
import styles from './singleCardExplore.module.scss';
import ImgRightExplore from '/public/png/new-images/explore_img.png';
import arrowImg from '/public/svg/newPages/arrowBtnReduce.svg';
import Image from 'next/image';

const SingleCardExplore = () => {
    return (
        <div className={styles.SingleCardExplore}>
            <div className={styles.left_left}>
                <span> HEALTH </span>
                <h3> Manage Blood Sugar Levels with Fasting & Sugar Check </h3>
            </div>
            <div className={styles.right_right}>
                <Image src={ImgRightExplore} alt="" className={`${styles.right_img_explore} img-fluid `} />
                <Image src={arrowImg} alt="" className={`${styles.right_img_explore_arrow} img-fluid `} />
            </div>
        </div>
    )
}

export default SingleCardExplore
