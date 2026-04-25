import React from 'react'
import styles from './sliderCardSubscriptionWallet.module.css';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import Router, { useRouter } from 'next/router';

const SliderCardSubscription = ({ bgColor, SliderImg, text, btnText, styling, mobStyling, rightStyle}) => {
    const isMobile = useMediaQuery('(max-width:768px)');

    return (
        <>
            {!isMobile
                ?
                <div className={styles.slidesWalletWrapperAll}>
                    <div className={styles.slidesWalletWrapper} style={{ backgroundColor: bgColor }}>
                        <Image src={SliderImg} alt='Slider-Images' className={styles.sliderImg} style={styling} />
                        <h3 className={styles.textHeadingSlider}> {text} </h3>
                        <button onClick={()=> Router.push(btnText === "Book a Lab Test" ? "" : "/doctor-now")} className={` ${styles.btnText} hovering_green_btn_MA`}> {btnText} </button>
                    </div>
                </div>
                :
                <div className={styles.slidesWalletWrapperAllMobile}>
                    <div className={styles.infoMobileSlider}>
                        <h3 className={styles.headingMobileSlider}> {text} </h3>
                        <button onClick={()=> Router.push(btnText === "Book a Lab Test" ? "" : "/doctor-now")} className={` ${styles.btnMobileSlider} hovering_green_btn_MA`}> {btnText} </button>
                    </div>
                    <div className={styles.imgMobileWrapper} style={rightStyle}><Image src={SliderImg} alt='slider-image-mobile' className={styles.sliderImgMobile} style={mobStyling} /> </div>
                </div>
            }
        </>
    )
}

export default SliderCardSubscription;
 