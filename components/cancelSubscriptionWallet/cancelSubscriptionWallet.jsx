import React, { useState } from 'react'
import styles from './cancelSubscriptionWallet.module.css';
import { isMobile } from 'react-device-detect';
import { useRouter } from "next/router";
import SubscriptionModal from '../subscription/modalSubscription/modalSubscription';


const CancelSubscriptionWallet = ({ scanLimit, videoConsults, userDetails }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const router = useRouter();
    const pushToPricing = () => {
        router.push('/pricing')
    }

    let ExpiryRenews = userDetails?.user?.subscription?.formated_end_date;

    return (
        <div className={styles.wrapper}>
            <div className={styles.planMonthly}>
                <span className={styles.planMonthlyText}> {userDetails?.user?.subscription?.is_yearly === 1 ? 'Yearly' : 'Monthly'} Plan: </span>
                <span className={styles.planMonthlyReviews}> Renews on {ExpiryRenews && ExpiryRenews} </span>
            </div>
            <div className={styles.detailBtnContainer}>
                <ul className={styles.paraWrapper}>
                    <li> {scanLimit}</li>
                    <li> {videoConsults} </li>
                </ul>
                {isMobile && <br />}
                {isMobile && <p className={styles.viewDetailsMobile}> View Details </p>}
                <div onClick={pushToPricing} className={styles.rightMonthly}>
                    <button className={styles.btnViewDetails}> View Details </button>
                </div>
            </div>
            <div className={styles.centerClass}> <button onClick={handleShow} className={styles.cancelBtn}> Cancel </button> </div>
            <SubscriptionModal backdrop={true} setShow={setShow} show={show} handleShow={handleShow} handleClose={handleClose} />
        </div>
    )
}
export default CancelSubscriptionWallet;