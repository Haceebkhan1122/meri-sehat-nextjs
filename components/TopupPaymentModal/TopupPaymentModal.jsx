import React, { useState } from 'react'
import styles from './TopupPaymentModal.module.css';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';
import calender from '../../public/svg/newPages/calender_moal.svg'
import time from '../../public/svg/clockAlter.svg'
// import time from '../../public/svg/clockAlter.svg'

import wallet from '../../public/svg/newPages/wallet_modal.svg'
import cash from '../../public/svg/newPages/wallet_walt_modal.svg'
import visaSvg from '../../public/svg/visa_svg.svg'
import success_tick from '../../public/svg/green_tick_topup_modal.svg';
import unsuccess_tick from '../../public/svg/topup_unsucessful.svg';
import Cookies from 'js-cookie';
import Loader from '../customLoader/Loader';


const TopupPaymentModal = ({ handleBackToTopupClosed, show, handleClose, successModal, title, transactionData, uanNumber }) => {
    const [loading, setLoading] = useState(false);


    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL2;

    // download API //??
    const downloadDoc = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${BASE_URL}/payment-receipt-download?is_download=1`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: Cookies.get('Authorization'),
                        'Access-Control-Allow-Origin': '*',
                        platform: 'web',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error(response);
            }

            const blob = await response.blob();
            const filename = `Payment_Receipt`;

            const url = window.URL.createObjectURL(
                new Blob([blob], { type: 'application/pdf' })
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };
    // download API //??
    return (
        <div className="">
            {loading && (
                <Loader />
            )}
            <Modal centered show={show} onHide={handleClose} className={`${styles.topUpModal} topUpModal`}>
                <Modal.Body>
                    <div className={styles.topupHeader}>
                        <Image src={successModal ? success_tick : unsuccess_tick} alt='successImg' width={60} height={60} />
                        <h3> Wallet {successModal ? 'Successful' : 'Unsuccessful'}  </h3>
                        <p className={styles.topupHead}> Transaction ID: {transactionData?.id}  </p>
                    </div>
                    <div className={styles.wrapperPayment}>

                        <div className={styles.cardTopModal}>
                            <div className={styles.header}>
                                <div className={styles.tranId}>
                                    <span className={styles.sehatHead}>
                                        {title}
                                    </span>

                                </div>
                                <button style={successModal ? { backgroundColor: "rgba(25, 179, 181, 0.10)", color: "#19B3B5" } : { backgroundColor: "rgba(240, 99, 134, 0.10)", color: "#F06386" }}> {successModal ? "Successful" : "Unsuccessful"} </button>
                            </div>
                            <div className={styles.header2}>
                                <span>
                                    {successModal ? 'Successful' : 'Unsuccessful'} Topup to Wallet
                                </span>
                            </div>
                            <div className={styles.wrapperTimeline}>

                                <div className={styles.singleTimeline}>
                                    <div className={styles.firstFirst}>
                                        <Image src={calender} alt='image' />
                                        <span className={styles.timelineHeads}> Date </span>
                                    </div>
                                    <span className={styles.timelinePara}>{transactionData?.buy_date}</span>
                                </div>
                                <div className={styles.singleTimeline}>
                                    <div className={styles.firstFirst}>
                                        <Image src={time} alt='image' />
                                        <span className={styles.timelineHeads}> Time </span>
                                    </div>
                                    <span className={styles.timelinePara}>{transactionData?.buy_time}</span>
                                </div>
                                <div className={styles.singleTimeline}>
                                    <div className={styles.firstFirst}>
                                        <Image src={wallet} alt='image' />
                                        <span className={styles.timelineHeads}> Payment Method </span>
                                    </div>
                                    <div className={styles.img}>
                                        {/* <Image src={visaSvg} className={styles.visaImageModal} alt='' /> */}
                                        <span className={styles.timelinePara}>{transactionData?.payment_method_value} </span>
                                    </div>
                                </div>

                                <div className={`${styles.singleTimeline} ${styles.singleTimelineTotal}`}>
                                    <div className={styles.firstFirst}>
                                        <Image src={cash} alt='image' />
                                        <span className={styles.timelineHeads}> Total </span>
                                    </div>
                                    <span className={styles.timelinePara}>PKR {transactionData?.formated_price}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            {/* <p className={styles.helpPara}> For help or queries, call us at <span className={styles.numSide}>  {uanNumber} </span> </p> */}
                            <p className={styles.helpPara}>
                                For help or queries, call us at
                                <a className={`ms-1 ${styles.anchoring_quering}`} href={`tel:${uanNumber}`}>
                                    {uanNumber}
                                </a>
                            </p>
                            {successModal ? (
                                <>
                                    <div className={styles.btnWrapper}>
                                        <button onClick={downloadDoc} className={styles.downloadButtonModal}> DOWNLOAD </button>
                                        <button className={styles.doneButtonModal} onClick={handleBackToTopupClosed}> DONE </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={styles.btnWrapper}>
                                        <button className={styles.changePaymentBtn} onClick={handleClose}> Change Payment </button>
                                        <button onClick={handleClose} className={styles.topUpTryAgain}> Try Again </button>
                                    </div>
                                </>
                            )}

                        </div>


                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default TopupPaymentModal