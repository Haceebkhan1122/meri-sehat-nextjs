import React, { useEffect, useState, Suspense } from 'react'
import styles from './wallet.module.css';
import AddIcon from '../../public/svg/add_circle_icon.svg';
import MoneyTopup from '../../public/svg/moneyTopup.svg';
import Certificate from '../../public/svg/certificateTopup.svg';
import TopUpMain from '../../public/png/genderTopup.png';
import TransactionImg from '../../public/svg/transactionimg.svg';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddCircleMobile from '../../public/svg/add_circle_mobile.svg';
import BulbMobile from '../../public/svg/bulb_wallet_mobile.svg';
import Card1Layer from '../../public/svg/card1Layer.svg';
import Router from 'next/router';
import Link from 'next/link';
import TransactionModal from '../TransactionModal/TransactionModal';
import { Accordion, Col, Container, Row } from "react-bootstrap";
import Cookies from 'js-cookie';
import SliderFooter from '../componentsUpdated/wallet/sliderFooter/SliderFooter';
import Faqs from '../componentsUpdated/wallet/faqs/faqs';
import { renderWidget } from "@/utils/common";
import Loader from "@/components/Loader";


const Wallet = (props) => {
    const { transactions, walletDetails, userDetails, walletPageDetail } = props
    const isMobile = useMediaQuery('(max-width:768px)');
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [pageName, setPageName] = useState();
    const [bnrContent, setBnrContent] = useState("");

    useEffect(() => {
        Cookies.remove('selectedPromocode')
    }, [])

    useEffect(() => {
        setPageName(walletPageDetail?.slug)
    }, [walletPageDetail])

    const handleTopupClicked = () => {
        localStorage.setItem("assignedVal", 1)
        Cookies.remove('topUpMethod')
        Router.push("/wallet-balance")
    }

    // If user is not logged in so it redirect to home page
    const autherization = Cookies.get('Authorization');
    useEffect(() => {
        if (!autherization) {
            window.location.href = "/phone-number";
        }
    }, [])

    const handleModal = (tranData) => {
        setModalShow(true)
        setModalData(tranData)
    }

    const handleClose = () => setModalShow(false);

    return (
        <>
            <section className={`${styles.wrapperWallet} wrapperWallet`}>
                <Container>
                    <Row className='justify-content-center h-100'>
                        <Col lg={12}>
                            <div className={styles.mobileWidth}>
                                <div className={styles.outerDiv}>
                                    <div className={styles.cardTop}>
                                        <div className={styles.img_wraper}>
                                            {!isMobile ? <Image src={TopUpMain} alt='topup-image' className={`${styles.topUpMainImg} img-fluid`} /> : <Image src={AddCircleMobile} alt='circle-image' className={styles.addCircleMobile} onClick={handleTopupClicked} />}
                                        </div>
                                        <div className={styles.shade}></div>
                                        {isMobile && <Image src={AddCircleMobile} alt='circle-image' className={styles.addCircleMobile} onClick={handleTopupClicked} />}
                                        <div className={styles.shading}>
                                        </div>
                                        <div className={styles.info}>
                                            <span className={styles.walletText}> My Balance </span>
                                            <div className={styles.moneyWrapper}>
                                                <Image src={MoneyTopup} alt="moneyTopup-svg" className={styles.moneyWrapperImage} />
                                                <h2 className={styles.priceText}> PKR {walletDetails?.wallet?.voucher_wallet} </h2>
                                            </div>
                                        </div>
                                        {isMobile
                                            ?
                                            <></>
                                            :
                                            <div className={styles.btnTopup} onClick={handleTopupClicked} >  <Image src={AddIcon} alt="add-icon" className={styles.addIconImg} /> TOPUP </div>
                                        }
                                    </div>
                                </div>
                                <Row className={"justify-content-center"}>
                                    <Col lg={6} xs={6}>
                                        <Link href="/reward-points">
                                            <div className={styles.card1}>
                                                <div className={styles.card1Layer}>
                                                    {!isMobile && <Image src={Card1Layer} alt='layer-card-1' />}
                                                </div>
                                                {isMobile
                                                    ?
                                                    <div className={styles.wrapperHeadings}>
                                                        <Image src={BulbMobile} alt='bulb-mobile' className={styles.bulbMobile} />
                                                        <h2 className={styles.headingsVoucherMobile}>  {walletDetails?.wallet?.voucher} PKR </h2>
                                                    </div>
                                                    :
                                                    <h2 className={styles.headingsVoucher}>
                                                        {walletDetails?.wallet?.voucher ? (
                                                            <>
                                                                <div className='d-flex align-items-center justify-content-center'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="48" viewBox="0 0 31 48" fill="none">
                                                                        <path d="M30.8829 19.5103L27.6033 18.6674C27.0154 20.9327 25.7692 22.9729 24.0223 24.5304C22.2754 26.0878 20.106 27.0926 17.7883 27.4177C15.4706 27.7428 13.1086 27.3736 11.0006 26.3569C8.89259 25.3402 7.13321 23.7215 5.94474 21.7054C4.75626 19.6892 4.19201 17.366 4.32327 15.0293C4.45452 12.6926 5.2754 10.4473 6.68218 8.57687C8.08897 6.70649 10.0185 5.29502 12.2272 4.52077C14.4358 3.74653 16.8243 3.64425 19.091 4.22686L19.9356 0.948931C16.6321 0.0908704 13.136 0.368339 10.0091 1.73675C6.88222 3.10516 4.30618 5.48505 2.69492 8.49399C1.08367 11.5029 0.530755 14.9662 1.12504 18.3272C1.71932 21.6883 3.4263 24.752 5.97165 27.0259V47.8649L16.1279 41.094L26.2842 47.8649V27.0578C28.5321 25.0541 30.133 22.4268 30.8829 19.5103ZM22.8987 41.5387L16.1279 37.0251L9.35707 41.5387V29.3297C11.4577 30.3851 13.7758 30.9356 16.1267 30.9374C18.4776 30.9393 20.7964 30.3923 22.8987 29.3402V41.5387Z" fill="white" />
                                                                    </svg>
                                                                    <span className='ps-3' style={{ wordSpacing: '0' }}>{walletDetails?.wallet?.voucher} PKR</span>
                                                                </div>
                                                            </>
                                                        ) : 'Vouchers'}
                                                    </h2>
                                                }
                                                <div className={styles.descCash}> {isMobile ? <span className={styles.descMobile}> Vouchers </span> : <span> {walletDetails?.available_voucher_count >= 1 ? `${walletDetails?.available_voucher_count} Vouchers Available` : 'No Vouchers Available'}  </span>} </div>
                                            </div>
                                        </Link>
                                    </Col>
                                    <Col lg={6} xs={6}>
                                        <Link href="/subscription">
                                            <div className={styles.card2}>
                                                <div className={styles.wrapperSubscription}>
                                                    <Image src={Certificate} alt="certificate" className={styles.certificateTopup} />
                                                    <h2 className={styles.headingsVoucher} style={{ marginTop: '5px' }}>
                                                        {userDetails?.user?.subscription?.package?.name ? (
                                                            <>
                                                                <div className='d-flex align-items-center justify-content-center'>
                                                                    <span className='ps-0 word-1'  >1 Active</span> {isMobile && <span className='activeSubs'>Subscription</span>}
                                                                </div>
                                                            </>
                                                        ) : 'Subscribe Now'}
                                                    </h2>
                                                </div>
                                                {!isMobile && <span className={styles.descCard2}>
                                                    {userDetails?.user?.subscription?.package?.name ? (
                                                        <>
                                                            Expiring on {userDetails?.user?.subscription?.formated_end_date}
                                                        </>
                                                    ) : 'Basic monthly package starting at PKR 299'}
                                                </span>}
                                                {!isMobile && <h3 className={styles.smallHeadingsVoucher} onClick={() => Router.push("/subscription")}>
                                                    {userDetails?.user?.subscription?.package?.name ? (
                                                        <>
                                                            {`${userDetails?.user?.subscription?.package?.name} package`}
                                                        </>
                                                    ) : 'View Packages'}
                                                </h3>}
                                            </div>
                                        </Link>
                                    </Col>
                                </Row>
                            </div>
                            <Row className={`${styles.transactions} justify-content-center`}>
                                <Col lg={12}>
                                    <div className={styles.top}>
                                        <Row className={styles.infoTop}>
                                            <Col lg="6" xs={6} className='px-0'><h2 className={`${styles.allTransactions} text-left`}> All Transactions</h2></Col>
                                            <Col lg="6" xs={6}><h3 className={styles.seeAll} onClick={() => Router.push("/all-transactions-wallet")}> See All </h3></Col>
                                        </Row>
                                        {!isMobile
                                            &&
                                            <div className={styles.topBorder}> </div>
                                        }
                                    </div>
                                    <div className={styles.bottom}>
                                        {transactions?.length > 0 ? (
                                            <>
                                                <div className={styles.wrapperAllTrasactions}>
                                                    {transactions?.length > 0 && transactions?.slice(0, 3)?.map((item, index) => (
                                                        <>
                                                            <div className={`${styles.singleTrasactionWrapper} row`} id={item?.id} onClick={() => handleModal(item)}>
                                                                <div className={`${styles.wrapeFirstTrans} col-lg-10`}>
                                                                    <div className={styles.transactionImgBottomWrapper}>
                                                                        {item?.image && (
                                                                            <Image width={73} height={73} src={item?.image} alt='transaction-img' className={styles.transactionImgBottom} />
                                                                        )}
                                                                    </div>
                                                                    <div className={styles.detailsTransac}>
                                                                        <h3 className={styles.transactionHeading}>
                                                                            {item?.reference_type === 'subscription' ?
                                                                                item?.subscription?.is_yearly === 1 ?
                                                                                    `${item?.subscription?.package?.name} Yearly` : `${item?.subscription?.package?.name} Monthly` :
                                                                                item?.reference_type === 'labs' ? 'Lab Tests' : item?.reference_type === 'one_time' ? 'Doctor Consult' :
                                                                                    item?.reference_type === 'top_up' ? 'Wallet' : item?.reference_type === 'top_up_send' ? 'Credits Sent' : item?.reference_type === 'top_up_receive' ? 'Credits Received' : null}
                                                                        </h3>
                                                                        <span className={styles.transactionDescription}> {item?.buy_date}</span>
                                                                    </div>
                                                                </div>
                                                                {/* <h3 className={`${styles.priceTransactions} col-lg-2`}>
                                                                    <span className={styles.transcPriceAll}> Rs. {item?.formated_price} </span>
                                                                    {item?.status == true ? <span className={styles.verifiedTickTransac}> </span> : <span className={styles.unSuccTickTransac}> </span>}
                                                                </h3> */}
                                                            </div>
                                                            {index < 2 && (
                                                                <div className={styles.centerBorder}>
                                                                    <div className={styles.borderTransaction}></div>
                                                                </div>
                                                            )}
                                                        </>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className={styles.wrapperTransactions}>
                                                    <Image src={TransactionImg} alt='transaction-img' className={styles.transactionImg} />
                                                    <span className={styles.transactionsDesc}> {!isMobile ? <span>  No transactions currently </span> : <span> You have no transactions </span>} </span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                <Suspense fallback={<Loader />}>
                    {walletPageDetail?.widgets?.map((item, index) => {
                        const { key_type } = item;
                        return renderWidget(key_type, item, index, false, bnrContent, pageName);
                    })}
                </Suspense>
                </Container>
            </section>
                
            {modalShow ? (
                <>
                    <TransactionModal show={modalShow} handleClose={handleClose} modalData={modalData} />
                </>
            ) : null}
        </>
    )
}

export default Wallet;
