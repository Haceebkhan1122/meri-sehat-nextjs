import React, { useState } from 'react'
import styles from './subscribeAccordian.module.css';
import { Card } from 'react-bootstrap';
import Image from 'next/image';
import TickImage from '../../../public/svg/img_tick_package.svg';
import Favorite from '../../../public/svg/heart_pulse_package.svg';
import ArrowRight from '../../../public/svg/arrow_right_card.svg'
import ArrowDown from '../../../public/svg/arrow_down_subscription.svg';
import Scan from '../../../public/svg/scan_package.svg';
import Stethoscope from '../../../public/svg/stethoscope_package.svg';
import Contact from '../../../public/svg/order_package.svg';
import useMediaQuery from '@mui/material/useMediaQuery';

const SubscribeAccordian = ({active}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isMobile = useMediaQuery('(max-width:768px)');

    return (
        <>
            {!isMobile && <Card.Header className={styles.cardHeaderPackageSecond}>
                <h3 className={styles.wrapeTex}> <span className={styles.plusAccordedMonthlyHead}> Monthly Plan: </span> <span className={styles.reviewPara}> Renews on Oct 5, 2023 </span> </h3>
            </Card.Header>
            }
            <h3 className={styles.detailsPlus}> Details </h3>
            {!isMobile && <div className={styles.wrapePlusPackage}>
                <div className={styles.box1}>
                    <Image src={Favorite} alt='heart-icon' className={styles.favHeartIcon} />
                    <div className={styles.infoPlusPackage}>
                        <h3 className={styles.headingBox}> Health Vitals </h3>
                        <span className={styles.smallHeadingBox}> Unlimited </span>
                    </div>
                </div>
                <div className={styles.box1}>
                    <Image src={Stethoscope} alt='heart-icon' className={styles.favHeartIcon} />
                    <div className={styles.infoPlusPackage}>
                        <h3 className={styles.headingBox}> Dr. Consult - Video Call </h3>
                        <span className={styles.smallHeadingBox}> 3 per month </span>
                    </div>
                </div>
                <div className={styles.box1}>
                    <Image src={Scan} alt='heart-icon' className={styles.favHeartIcon} />
                    <div className={styles.infoPlusPackage}>
                        <h3 className={styles.headingBox}> Health Scan </h3>
                        <span className={styles.smallHeadingBox}> 3 per day </span>
                    </div>
                </div>
                <div className={styles.box1}>
                    <Image src={Contact} alt='heart-icon' className={styles.favHeartIcon} />
                    <div className={styles.infoPlusPackage}>
                        <h3 className={styles.headingBox}> History </h3>
                        <span className={styles.smallHeadingBox}> Unlimited </span>
                    </div>
                </div>
            </div>
            }
            {isMobile &&
                <div className={styles.wrapperHolderPackagesMobile}>
                    <div className={styles.wrapperMobilePlusPackage}>
                        <div className={styles.wrapesingle}>
                            <Image src={Favorite} alt='heart-icon' className={styles.favHeartIcon} />
                            <h3 className={styles.headingBox}> Health Vitals </h3>
                        </div>
                        <span className={styles.smallHeadingBox}> Unlimited </span>
                    </div>
                    <div className={styles.wrapperMobilePlusPackage}>
                        <div className={styles.wrapesingle}>
                            <Image src={Stethoscope} alt='heart-icon' className={styles.favHeartIcon} />
                            <h3 className={styles.headingBox}> Instant Video Call </h3>
                        </div>
                        <span className={styles.smallHeadingBox}> 2 per month </span>
                    </div>
                    <div className={styles.wrapperMobilePlusPackage}>
                        <div className={styles.wrapesingle}>
                            <Image src={Scan} alt='heart-icon' className={styles.favHeartIcon} />
                            <h3 className={styles.headingBox}> Health Scan </h3>
                        </div>
                        <span className={styles.smallHeadingBox}> 1 per day </span>
                    </div>
                    <div className={styles.wrapperMobilePlusPackage}>
                        <div className={styles.wrapesingle}>
                            <Image src={Contact} alt='heart-icon' className={styles.favHeartIcon} />
                            <h3 className={styles.headingBox}> History </h3>
                        </div>
                        <span className={styles.smallHeadingBox}> Unlimited </span>
                    </div>
                </div>
            }
            {!isMobile && <div className={styles.btnWrapperPackage}>
                <button className={styles.cancel} onClick={handleShow}> Cancel </button>
                <button className={styles.upgrade}> Upgrade</button>
            </div>
            }
            {isMobile && active
                ?
                <div className={styles.centerMobilePackage}> <button className={styles.cancelMobile} onClick={handleShow}> Cancel </button></div>
                :
                isMobile && active
                ?
                <div className={styles.centerMobilePackage}> <button className={styles.upgradeMobilePackage}> Upgrade </button></div>
                : ""
            }
        </>
    )
}

export default SubscribeAccordian;
