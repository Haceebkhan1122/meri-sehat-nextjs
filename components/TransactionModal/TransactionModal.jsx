import React, { useEffect, useState } from 'react'
import styles from './TransactionModal.module.css';
import {  Modal } from 'react-bootstrap';
import Image from 'next/image';
import calender from '../../public/svg/newPages/calender_moal.svg'
import timeIcon from '../../public/svg/newPages/timeIcon.svg'
import wallet from '../../public/svg/newPages/wallet_modal.svg'
import cash from '../../public/svg/newPages/wallet_walt_modal.svg'
import nameImg from '../../public/svg/nameImg.svg'
import { APIV3 } from "@/utils/httpService";
import closeBtn1 from '../../public/svg/newPages/closeBtn1.svg'
import Loader from '../customLoader/Loader';
import Cookies from 'js-cookie';
import { makePayment } from "@/utils/endpoints";
import { useRouter } from 'next/router';

const TransactionModal = ({ show, handleClose, modalData }) => {
    const [loading, setLoading] = useState(false);
    const [uanNumber, setUanNumber] = useState("");
    const Authorization = Cookies.get('Authorization');

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL2;
    useEffect(() => {
        if (typeof window !== "undefined") {
            const number = window.localStorage.getItem("uan_number");
            if (number) {
                setUanNumber(number);
            }
        }
    }, []);

    // download API //??
    const downloadDoc = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${BASE_URL}/payment-receipt-download?is_download=1&transaction_id=${modalData?.id}`,
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

    const NavigateRespectivePayment = async (data, e) => {
        e.preventDefault();
        if (data?.reference_type == 'one_time') {
            if (Authorization && data?.payment_method == 'credit_debit_card') {
                const myData = {
                    reference_id: 0,
                    reference_type: 'one_time',
                    payment_method: '3',
                    amount: '1',
                };
                const visaCardId = 61876;
                const response = await APIV3.post(
                    `/payment?id=${visaCardId}`,
                    myData
                );
                const myRedirecturl = response?.data?.data?.redirect_url;
                if (myRedirecturl) {
                    window.location.href = myRedirecturl;
                }
                return response;
            }
            if (Authorization && data?.payment_method == 'wallet') {
                const myData = {
                    reference_id: 0,
                    reference_type: 'one_time',
                    payment_method: '4',
                    amount: '1',
                };
                const jazzcashID = 73948;
                const response = await APIV3.post(
                    `/payment?id=${jazzcashID}`,
                    myData
                );
                const myRedirecturl = response?.data?.data?.redirect_url;
                if (myRedirecturl) {
                    window.location.href = myRedirecturl;
                }
                return response;
            }
            if (Authorization && data?.payment_method == 'bank_account') {
                const myData = {
                    reference_id: 0,
                    reference_type: 'one_time',
                    payment_method: '1',
                    amount: '1',
                };
                const visaCardId = 61876;
                const response = await APIV3.post(
                    `/payment?id=${visaCardId}`,
                    myData
                );
                const myRedirecturl = response?.data?.data?.redirect_url;
                if (myRedirecturl) {
                    window.location.href = myRedirecturl;
                }
                return response;
            }
        }
        if (data?.reference_type == 'subscription') {
            if (data?.payment_method == 'credit_debit_card') {
                const myData = {
                    reference_id: data?.subscription?.package?.id,
                    reference_type: 'subscription',
                    payment_method: '3',
                    amount: '1',
                    is_yearly_pkg: data?.is_yearly_pkg == 1 ? '1' : '0'
                };
                const easypaisaId = 62039;
                const response = await APIV3.post(`/payment?id=${easypaisaId}`, myData);
                if (response?.data?.data?.redirect_url) {
                    window.location.href = response?.data?.data?.redirect_url;
                } else if (response?.status == 400) {
                    toast.error(response?.data?.message);
                }
                return response;
            }
            if (data?.payment_method == 'wallet') {
                const myData = {
                    reference_id: data?.subscription?.package?.id,
                    reference_type: 'subscription',
                    payment_method: '4',
                    amount: '1',
                    is_yearly_pkg: data?.is_yearly_pkg == 1 ? '1' : '0'
                };
                const jazzcashID = 73948;
                const response = await APIV3.post(`/payment?id=${jazzcashID}`, myData);
                if (response?.data?.data?.redirect_url) {
                    window.location.href = response?.data?.data?.redirect_url;
                } else if (response?.status == 400) {
                    toast.error(response?.data?.message);
                }
                return response;
            }
            if (data?.payment_method == 'bank_account') {
                const myData = {
                    reference_id: data?.subscription?.package?.id,
                    reference_type: 'subscription',
                    payment_method: '1',
                    amount: '1',
                    is_yearly_pkg: data?.is_yearly_pkg == 1 ? '1' : '0'
                };
                const visaCardId = 61876;
                const response = await APIV3.post(`/payment?id=${visaCardId}`, myData);
                if (response?.data?.data?.redirect_url) {
                    window.location.href = response?.data?.data?.redirect_url;
                } else if (response?.status == 400) {
                    toast.error(response?.data?.message);
                }
                return response;
            }
        }

        if (data?.reference_type == 'top_up') {
            if (data?.payment_method == 'wallet') {
                const topUpAmount = Number(data?.formated_price.replace(/,/g, ''));
                const myData = {
                    amount: topUpAmount,
                    payment_method: 4,
                    reference_id: 0,
                    reference_type: 'top_up',
                };
                const response = await APIV3.post(makePayment, myData);
                const myRedirecturl = response?.data?.data?.redirect_url;
                if (myRedirecturl) {
                    window.location.href = myRedirecturl;
                }
                return response;
            }
            if (data?.payment_method == 'bank_account') {
                const topUpAmount = Number(data?.formated_price.replace(/,/g, ''));
                const myData = {
                    amount: topUpAmount,
                    payment_method: 1,
                    reference_id: 0,
                    reference_type: 'top_up',
                };
                const response = await APIV3.post(makePayment, myData);
                const myRedirecturl = response?.data?.data?.redirect_url;
                if (myRedirecturl) {
                    window.location.href = myRedirecturl;
                }
                return response;
            }
            if (data?.payment_method == 'credit_debit_card') {
                const topUpAmount = Number(data?.formated_price.replace(/,/g, ''));
                const myData = {
                    amount: topUpAmount,
                    payment_method: 3,
                    reference_id: 0,
                    reference_type: 'top_up',
                };
                const response = await APIV3.post(makePayment, myData);
                const myRedirecturl = response?.data?.data?.redirect_url;
                if (myRedirecturl) {
                    window.location.href = myRedirecturl;
                }
                return response;
            }
        }
    }

    // navigate('/target-page', { state: { formattedPrice: formattedPriceFromBackend } });
    const router = useRouter();
    const NavigateChangeMethod = (data,e) => {
        e.preventDefault();
        if(data?.reference_type == 'top_up'){
            Cookies.set('topUpPrice',data?.formated_price)
            router.push('/wallet-balance')
        }
        if(data?.reference_type == 'one_time'){
            window.location.href = '/no-subscription'
        }
        if(data?.reference_type == 'subscription'){
            if(data?.is_yearly_pkg == 1){
                window.location.href = `/order/${data?.subscription?.package?.id}?yearly=yearly`
            }
            else {
            window.location.href = `/order/${data?.subscription?.package?.id}`

            }
        }
    }

    return (
        <div className="">
            {loading && (
                <Loader />
            )}
            <Modal centered show={show} onHide={handleClose} className={`${styles.topUpModal} transactionModal`}>
                <Modal.Body className='px-0'>
                    <div className={styles.closeBtn} onClick={handleClose}>
                        <Image src={closeBtn1} alt="labImage" width={16} height={16} />
                    </div>
                    <div className={styles.wrapperPayment}>

                        <div className={styles.cardTopModal}>
                            <div className={styles.header}>
                                <div className={styles.tranId}>
                                    <span className={styles.sehatHead}>
                                        {modalData?.reference_type === 'subscription' ?
                                            modalData?.subscription?.is_yearly === 1 ?
                                                `${modalData?.subscription?.package?.name?.toLowerCase()} Yearly` : `${modalData?.subscription?.package?.name?.toLowerCase()} Monthly` :
                                            modalData?.reference_type === 'labs' ? 'Lab Tests' : modalData?.reference_type === 'one_time' ? 'Doctor Appointment' :
                                                modalData?.reference_type === 'top_up' ? 'Wallet' : modalData?.reference_type === 'top_up_send' ? 'Credits Sent' : modalData?.reference_type === 'top_up_receive' ? 'Credits Received' : null}
                                    </span>
                                    <div className={styles.topupHead}> Transaction ID: {modalData?.id}  </div>
                                </div>
                                <button style={modalData?.status == true ? { backgroundColor: "rgba(25, 179, 181, 0.10)", color: "#19B3B5" } : { backgroundColor: "rgba(240, 99, 134, 0.10)", color: "#F06386" }}> {modalData?.status == true ? "Successful" : "Unsuccessful"} </button>
                            </div>

                            {modalData?.reference_type !== "labs" && modalData?.reference_type !== "one_time" ? (
                                <>
                                    <div className={styles.header2}>
                                        <span>
                                            {modalData?.reference_type == "top_up_receive" && `Successfully received credits from ${modalData?.sender_name}`
                                                || modalData?.reference_type == "top_up_send" && `Successfully sent credits to ${modalData?.sender_receiver_name}` || (modalData?.reference_type == "top_up" || modalData?.reference_type == "top_up_send") && `${modalData?.status ? "Successful" : "Unsuccessful"} Topup to Wallet`
                                                ||
                                                modalData?.reference_type == "subscription" && modalData?.status == true && `Successfully ${modalData?.is_upgraded == true ? 'upgraded' : 'purchased'} subscription package ${modalData?.subscription?.package?.name === 'PREMIUM' || modalData?.subscription?.package?.name === 'PLUS' ? 'to' : '-'}  
                                        ${modalData?.subscription?.is_yearly === 1 ? `${modalData?.subscription?.package?.name} Yearly` :
                                                    `${modalData?.subscription?.package?.name} Monthly`}` ||
                                                modalData?.reference_type == "subscription" && modalData?.status == false && `Your attempt to ${modalData?.is_upgraded == true ? 'upgraded' : 'purchased'} the
                                        ${modalData?.subscription?.is_yearly === 1 ? `${modalData?.subscription?.package?.name} ${!modalData?.subscription?.is_weekly == false ? `Yearly` : ''}  subscription package was unsuccessful.` :
                                                    `${modalData?.subscription?.package?.name} ${modalData?.subscription?.is_weekly == false ? `Monthly` : ''} subscription package was unsuccessful.`}`}
                                        </span>
                                    </div>
                                </>
                            ) : null}
                            <div className={styles.wrapperTimeline}>

                                {modalData?.reference_type == "top_up_receive" || modalData?.reference_type == "top_up_send" ? (
                                    <div className={styles.singleTimeline}>
                                        <div className={styles.firstFirst}>
                                            <Image src={nameImg} alt='image' />
                                            <span className={styles.timelineHeads}> Name </span>
                                        </div>
                                        <span className={styles.timelinePara}>
                                            {modalData?.reference_type == "top_up_receive" && modalData?.sender_name || modalData?.reference_type == "top_up_send" && modalData?.sender_receiver_name}
                                        </span>
                                    </div>
                                ) : null}

                                {modalData?.reference_type == "labs" ? (
                                    <>
                                        <div className={styles.singleTimeline}>
                                            <div className={styles.firstFirst}>
                                                <Image src={calender} alt='image' width={16} height={17.07} />
                                                <span className={styles.timelineHeads}> Booking Date </span>
                                            </div>
                                            <span className={styles.timelinePara}> {modalData?.buy_date} </span>
                                        </div>
                                    </>
                                ) : null}
                                {modalData?.reference_type == "labs" ? (
                                    <>
                                        <div className={styles.singleTimeline}>
                                            <div className={styles.firstFirst}>
                                                <Image src={timeIcon} alt='image' width={16} height={17.07} />
                                                <span className={styles.timelineHeads}> Booking Time </span>
                                            </div>
                                            <span className={styles.timelinePara}> {modalData?.buy_time} </span>
                                        </div>
                                    </>
                                ) : null}

                                <div className={styles.singleTimeline}>
                                    <div className={styles.firstFirst}>
                                        <Image src={calender} alt='image' width={20} height={20} />
                                        <span className={styles.timelineHeads}> Date </span>
                                    </div>
                                    <span className={styles.timelinePara}> {modalData?.buy_date} </span>
                                </div>
                                <div className={styles.singleTimeline}>
                                    <div className={styles.firstFirst}>
                                        <Image src={timeIcon} alt='image' width={20} height={20} />
                                        <span className={styles.timelineHeads}> Time </span>
                                    </div>
                                    <span className={styles.timelinePara}> {modalData?.buy_time} </span>
                                </div>
                                {modalData?.reference_type !== "top_up" && modalData?.reference_type !== "top_up_send" && modalData?.reference_type !== "top_up_receive" ? (
                                    <>
                                        <div className={styles.singleTimeline}>
                                            <div className={styles.firstFirst}>
                                                <Image src={wallet} alt='image' width={20} height={20} />
                                                <span className={styles.timelineHeads}> Payment Method </span>
                                            </div>
                                            <div className={styles.img}>
                                                {/* <Image src={visaSvg} className={styles.visaImageModal} alt='' /> */}
                                                <span className={styles.timelinePara}>
                                                    {modalData?.multi_transaction == null &&
                                                        (modalData
                                                            ?.payment_method == 'wallet'
                                                            ? modalData
                                                                ?.payment_method_value
                                                            : modalData?.subscription?.transaction
                                                                ?.payment_method_value &&
                                                            modalData?.subscription?.transaction
                                                                ?.payment_method_value)}
                                                </span>
                                            </div>
                                        </div>
                                        {modalData?.multi_transaction && modalData?.multi_transaction !== null && (
                                            <div className={styles.wraper_payment_method}>
                                                <div className={styles.single__payment_div11}>
                                                    {modalData?.multi_transaction?.transaction_amount > 0 && (
                                                        <div className={styles.single__payment_div}>
                                                            <span className={styles.textHead}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                                    <path d="M22.5 6V18C22.5 18.55 22.3042 19.0208 21.9125 19.4125C21.5208 19.8042 21.05 20 20.5 20H4.5C3.95 20 3.47917 19.8042 3.0875 19.4125C2.69583 19.0208 2.5 18.55 2.5 18V6C2.5 5.45 2.69583 4.97917 3.0875 4.5875C3.47917 4.19583 3.95 4 4.5 4H20.5C21.05 4 21.5208 4.19583 21.9125 4.5875C22.3042 4.97917 22.5 5.45 22.5 6ZM4.5 8H20.5V6H4.5V8ZM4.5 12V18H20.5V12H4.5Z" fill="#19B3B5" />
                                                                </svg>
                                                                {modalData?.payment_method_value}
                                                            </span>
                                                            <span className={styles.datee_in}>
                                                                PKR{' '}
                                                                {modalData?.multi_transaction?.transaction_amount?.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {modalData?.multi_transaction?.merisehat_pay !== null && (
                                                        <>
                                                            <div className={styles.single__payment_div}>
                                                                <span className={styles.textHead}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                                        <path d="M5.5 21C4.95 21 4.47917 20.8042 4.0875 20.4125C3.69583 20.0208 3.5 19.55 3.5 19V5C3.5 4.45 3.69583 3.97917 4.0875 3.5875C4.47917 3.19583 4.95 3 5.5 3H19.5C20.05 3 20.5208 3.19583 20.9125 3.5875C21.3042 3.97917 21.5 4.45 21.5 5V7.5H19.5V5H5.5V19H19.5V16.5H21.5V19C21.5 19.55 21.3042 20.0208 20.9125 20.4125C20.5208 20.8042 20.05 21 19.5 21H5.5ZM13.5 17C12.95 17 12.4792 16.8042 12.0875 16.4125C11.6958 16.0208 11.5 15.55 11.5 15V9C11.5 8.45 11.6958 7.97917 12.0875 7.5875C12.4792 7.19583 12.95 7 13.5 7H20.5C21.05 7 21.5208 7.19583 21.9125 7.5875C22.3042 7.97917 22.5 8.45 22.5 9V15C22.5 15.55 22.3042 16.0208 21.9125 16.4125C21.5208 16.8042 21.05 17 20.5 17H13.5ZM20.5 15V9H13.5V15H20.5ZM16.5 13.5C16.9167 13.5 17.2708 13.3542 17.5625 13.0625C17.8542 12.7708 18 12.4167 18 12C18 11.5833 17.8542 11.2292 17.5625 10.9375C17.2708 10.6458 16.9167 10.5 16.5 10.5C16.0833 10.5 15.7292 10.6458 15.4375 10.9375C15.1458 11.2292 15 11.5833 15 12C15 12.4167 15.1458 12.7708 15.4375 13.0625C15.7292 13.3542 16.0833 13.5 16.5 13.5Z" fill="#19B3B5" />
                                                                    </svg>
                                                                    Wallet
                                                                </span>
                                                                <span className={styles.datee_in}>
                                                                    PKR{' '}
                                                                    {modalData?.multi_transaction?.merisehat_pay?.toLocaleString()}
                                                                </span>
                                                            </div>
                                                        </>
                                                    )}

                                                    {modalData?.multi_transaction?.promocode !== null && (
                                                        <div className={styles.single__payment_div}>
                                                            <span className={styles.textHead}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                                    <path d="M17.8825 1.42965L17.746 1.17261L17.6158 1.43292L16.527 3.61054L13.9824 3.91154L13.6538 3.95041L13.8996 4.17193L15.7147 5.80771L15.3517 8.22775L15.3033 8.54979L15.5795 8.3772L17.75 7.02064L19.9205 8.3772L20.1967 8.54979L20.1483 8.22775L19.7853 5.80771L21.6004 4.17193L21.8452 3.95134L21.5181 3.9116L19.0405 3.61054L17.8825 1.42965Z" fill="#19B3B5" stroke="#19B3B5" stroke-width="0.3" />
                                                                    <path d="M17.6829 9.97412L17.7203 9.82883L17.575 9.79148L16.1219 9.41798L15.9769 9.38073L15.9393 9.52558C15.6863 10.5006 15.15 11.3787 14.3981 12.0491C13.6462 12.7194 12.7125 13.1519 11.7149 13.2918C10.7174 13.4317 9.70072 13.2728 8.79342 12.8352C7.88612 12.3976 7.12888 11.7009 6.61735 10.8332C6.10582 9.96539 5.86296 8.96548 5.91946 7.95975C5.97595 6.95402 6.32926 5.98759 6.93475 5.18257C7.54024 4.37754 8.37075 3.77003 9.32134 3.43679C10.2719 3.10355 11.3 3.05953 12.2756 3.31029L12.4208 3.34761L12.4582 3.20244L12.8324 1.75007L12.8698 1.60509L12.7249 1.56745C11.2286 1.17881 9.64508 1.30448 8.22881 1.92428C6.81255 2.54408 5.64577 3.62202 4.91598 4.98487C4.18618 6.34772 3.93575 7.91634 4.20492 9.43868C4.47018 10.9389 5.22486 12.3083 6.35005 13.3335V22.5V22.7803L6.58326 22.6248L11.0001 19.6803L15.4168 22.6248L15.6501 22.7803V22.5V13.3477C16.642 12.4459 17.3489 11.2734 17.6829 9.97412ZM10.9169 17.5724L8.15005 19.4168V14.526C9.04309 14.9359 10.0149 15.1491 10.9994 15.1499C11.984 15.1506 12.9563 14.9389 13.8501 14.5302V19.4168L11.0833 17.5724L11.0001 17.5169L10.9169 17.5724Z" fill="#19B3B5" stroke="#19B3B5" stroke-width="0.3" />
                                                                </svg>
                                                                {modalData?.multi_transaction?.promocode_name}
                                                            </span>
                                                            <span className={styles.datee_in}>
                                                                PKR{' '}
                                                                {modalData?.multi_transaction?.promocode?.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : null}


                                <div className={`${styles.singleTimeline} ${styles.singleTimelineTotal}`}>
                                    <div className={styles.firstFirst}>
                                        <Image src={cash} alt='image' width={20} height={20} />
                                        <span className={styles.timelineHeads}> Total </span>
                                    </div>
                                    <span className={styles.timelinePara}> PKR {modalData?.formated_price} </span>
                                </div>
                            </div>



                            <div>
                                {/* <p className={styles.helpPara}> For help or queries, call us at <span className={styles.numSide}>  (021)-111-111-111 </span> </p> */}
                                <p className={styles.helpPara}>
                                    For help or queries, call us at
                                    <a className="ms-1 anchoring_quering" href={`tel:${uanNumber}`}>
                                        {uanNumber}
                                    </a>
                                </p>
                                {modalData?.status == true ? (
                                    <>
                                        <div className={styles.btnWrapper}>
                                            <button onClick={downloadDoc} className={styles.downloadButtonModal}> DOWNLOAD </button>
                                        </div>
                                    </>
                                ) : null}
                                {modalData?.status == false ? (
                                    <div className={styles.btnWrapper1}>
                                        <button onClick={(e) => NavigateChangeMethod(modalData,e)} className={styles.tryagain}> CHANGE PAYMENT </button>
                                        <button onClick={(e) => NavigateRespectivePayment(modalData, e)} className={styles.changePayment}> TRY AGAIN </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>


                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default TransactionModal;
