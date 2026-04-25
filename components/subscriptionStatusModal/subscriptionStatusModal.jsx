import React from 'react'
import styles from './subscriptionStatusModal.module.css';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';
import closeIcon from '../../public/svg/close-vector-svg.svg';
import calender from '../../public/svg/calender_moal.svg'
import time from '../../public/svg/time_modal.svg'
import wallet from '../../public/svg/wallet_modal.svg'
import cash from '../../public/svg/wallet_walt_modal.svg'
import visaSvg from '../../public/svg/visa_svg.svg'
import { isMobile } from 'react-device-detect';


const SubscriptionStatusModal = ({ packageTitle, show, handleClose, successModalSubscription }) => {
    return (
        <Modal centered show={show} onHide={handleClose} className={`${styles.modalSubs} modalSubscriptionPackage`}>
            <Modal.Body>
                <div className={styles.headerCloseWrape}>
                    <Image src={closeIcon} alt='close-icon' className={styles.close_icon} onClick={handleClose} />
                </div>
                <div className={styles.wrapperSubsModalContainer}>
                    <div className={styles.headerSubsModalHeader}>
                        <h3 className={styles.headerSubsTitle}>
                            <span className={styles.titl}> LITE Monthly </span>
                            <span className={styles.paraTitl}> Transaction ID: 000123 </span>
                        </h3>
                        <button className={styles.success_btn}> successfull </button>
                    </div>
                    <span className={styles.sucessText}> Successfully purchased subscription package - LITE Monthly. </span>
                    <div className={styles.wrapperTimeline}>
                        <div className={styles.singleTimeline}>
                            <div className={styles.firstFirst}>
                                <Image src={calender} alt='image' />
                                <span className={styles.timelineHeads}> Date </span>
                            </div>
                            <span className={styles.timelinePara}> Dec 7, 2023 </span>
                        </div>
                        <div className={styles.singleTimeline}>
                            <div className={styles.firstFirst}>
                                <Image src={time} alt='image' />
                                <span className={styles.timelineHeads}> Time </span>
                            </div>
                            <span className={styles.timelinePara}> 11:00 AM </span>
                        </div>
                        <div className={styles.singleTimeline}>
                            <div className={styles.firstFirst}>
                                <Image src={wallet} alt='image' />
                                <span className={styles.timelineHeads}> Payment Method </span>
                            </div>
                            <div className={styles.img}>
                                <Image src={visaSvg} className={styles.visaImageModal} alt='' />
                                <span className={styles.timelinePara}> **** 4545 </span>
                            </div>
                        </div>
                        <div className={`${styles.singleTimeline} ${styles.singleTimelineTotal}`}>
                            <div className={styles.firstFirst}>
                                <Image src={cash} alt='image' />
                                <span className={styles.timelineHeads}> Total </span>
                            </div>
                            <span className={styles.timelinePara}> PKR 600 </span>
                        </div>
                    </div>
                    <p className={styles.helpPara}> For help or queries, call us at <span className={styles.numSide}>  (021)-111-111-111 </span> </p>
                    {isMobile &&
                        <div className={styles.wraperBtnDownload}>
                            <button className={styles.downloadBtn}> Download </button>
                        </div>
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SubscriptionStatusModal;
