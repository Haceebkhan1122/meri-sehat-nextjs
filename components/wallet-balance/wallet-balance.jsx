import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderOnlyLogo from '../headerOnlyLogo/HeaderOnlyLogo';
import price from '../../public/svg/price.svg';
import payment from '../../public/svg/newPages/payment.svg';
import plus from '../../public/svg/plus.svg';
import secure from '../../public/svg/secure.svg';
import styles from './wallet-balance.module.css';
import WrapperContainerWallet from '../wrapperContainerCustomWallet/wrapperContainerWallet';
import bothVisas from '../../public/svg/visaimagesboth.svg';
import easypaisa from '../../public/svg/easypaisasvg.svg';
import jazzcash from '../../public/svg/jazzcashsvg.svg';
import TopupPaymentModal from '../TopupPaymentModal/TopupPaymentModal';
import TopupBalanceLimitModal from '../topupBalanceLimitModal/topupBalanceLimitModal';
import AllCardShowModal from '../AllCardShowModal/AllCardShowModal';
import SingleCardRemoveModal from '../SingleCardRemoveModal/SingleCardRemoveModal';
import visaSvg from '../../public/svg/visa_svg.svg'
import editIcon from '../../public/svg/editIcon.svg'
import { useRouter } from 'next/router'
import HeaderMobileWalletUpdated from '../header_mobile_wallet_updated/header_mobile_wallet_updated';
import { APIV3 } from "@/utils/httpService";
import { makePayment } from "@/utils/endpoints";
import Loader from '../Loader';
import Cookies from 'js-cookie';


const WalletBalanceComp = (props) => {
    const { topupData, getListSavedCards, walletDetails, handleRemoveCard, setSingleSavedCardShow, singleSavedCardShow } = props
    const [topupClicked, setTopupClicked] = useState(false)
    const [show, setShow] = useState(false);
    const [allSavedCardShow, setAllSavedCardShow] = useState(false);
    const [showLimit, setShowLimit] = useState(false);
    const isMobile = useMediaQuery('(max-width:768px)');
    const [selectedDebit, setSelectedDebit] = useState(false)
    const [selectedMobileTransfer, setSelectedMobileTransfer] = useState(false)
    const [selectedBankTransfer, setSelectedBankTransfer] = useState(false)
    const [savedCard, setSavedCard] = useState(false)
    const [selectedVal, setSelectedVal] = useState()
    const [amountTransfer, setAmountTransfer] = useState(0)
    const [error, setError] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)
    const [paymentData, setPaymentData] = useState([])
    const [btnValidation, setBtnValidation] = useState(false)
    const [topupAdded, setTopupAdded] = useState(false)
    const [toastMsgError, setToastMsgError] = useState(false)
    const [paySecurePopup, setPaySecurePopup] = useState(true)
    const [singleCardDetail, setSingleCardDetail] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [uanNumber, setUanNumber] = useState(false)
    const [transactionData, setTransactionData] = useState({})
    const [apiFailedToast, setApiFailedToast] = useState(false)
    const [failedAmount, setFailedAmount] = useState(0)
    const [sendTopUpAmount, setSendTopUpAmount] = useState()
    const availableCards = false;
    const saved_cards = true;
    const handleClose = () => setShow(false);
    const handleCardClose = () => setAllSavedCardShow(false);
    const handleSingleCardClose = () => setSingleSavedCardShow(false);
    const handleShow = () => setShow(false);
    const handleCardShow = () => setAllSavedCardShow(true);
    const router = useRouter();
    const handleBackToTopupClosed = () => {
        setTopupClicked(false)
        setShow(false);
    }

    
    const handleCloseLimit = () => setShowLimit(false);

    // If user is not logged in so it redirect to home page
    const autherization = Cookies.get('Authorization');
    useEffect(() => {

        if (!autherization) {
            router.push('/')
        }
    }, [])

    useEffect(() => {
      const formatedPrice =  Cookies.get('topUpPrice');
      if(formatedPrice){
        setTopupClicked(true)
        setSendTopUpAmount(formatedPrice)
      }
    }, [])
    

    const handleSelect = (e, item) => {
        setApiFailedToast(false);
        if (e.target.value === "3") {
            Cookies.remove("topUpMethod")
            setSelectedDebit(true)
            setSelectedBankTransfer(false)
            setSelectedMobileTransfer(false)
            setSavedCard(false)
            setSelectedVal(e.target.value)
            Cookies.set("topUpMethod", e.target.value)
            setDisableBtn(true)
        }

        else if (e.target.value === "4") {
            Cookies.remove("topUpMethod")
            setSelectedMobileTransfer(true)
            setSelectedBankTransfer(false)
            setSelectedDebit(false)
            setSavedCard(false)
            setSelectedVal(e.target.value)
            Cookies.set("topUpMethod", e.target.value)
            setDisableBtn(true)
        }

        else if (e.target.value === "1") {
            Cookies.remove("topUpMethod")
            setSelectedBankTransfer(true)
            setSelectedDebit(false)
            setSelectedMobileTransfer(false)
            setSavedCard(false)
            setSelectedVal(e.target.value)
            Cookies.set("topUpMethod", e.target.value)
            setDisableBtn(true)
        }

        else if (e.target.value == item?.id) {
            setSelectedVal(e.target.value)
            setSavedCard(true)
            setSelectedBankTransfer(false)
            setSelectedDebit(false)
            setSelectedMobileTransfer(false)
            setDisableBtn(true)
        }

        else {
            setSelectedDebit(false)
            setSelectedBankTransfer(false)
            setSelectedBankTransfer(false)
            setDisableBtn(false)
        }

    }

    const handleDone = async () => {
        if(amountTransfer.startsWith('0')) {
            setIsLoading(false)
            return;
        }
        if (+amountTransfer >= topupData?.remaining_amount_this_month) {
            setShowLimit(true);
        } else {
            setIsLoading(true);
            try {
                const data = {
                    amount: +amountTransfer,
                    payment_method: selectedVal,
                    reference_id: 0,
                    reference_type: 'top_up',
                };
                const response = await APIV3.post(makePayment, data);
                if (response.status == 200) {
                    setIsLoading(false);
                    setPaymentData(response);
                    setDisableBtn(true);
                    // setTopupAdded(true)
                    setPaySecurePopup(false);
                    if (response?.data?.data?.redirect_url) {
                        setTimeout(() => {
                            window.location.href = response?.data?.data?.redirect_url;
                        }, 1000);
                    }

                } else if (response.status == 400) {
                    setIsLoading(false);
                    setApiFailedToast(true);
                    setPaymentData(response);
                }
                else {
                    setPaySecurePopup(false);
                    setToastMsgError(true);
                    setIsLoading(false)
                    setTimeout(() => {
                        setToastMsgError(false);
                    }, 2000);
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false)
            }
        }
    };


    useEffect(() => {
        setDisableBtn(true)
        setBtnValidation(true)
    }, [])


    const handleTopup = () => {
        localStorage.removeItem("assignedVal")
        setTopupClicked(true)
        // setShow(true)
    }

    const handleBackClicked = () => {
        let assignedVal = localStorage.getItem("assignedVal")
        setBtnValidation(true);
        Cookies.remove("topUpMethod")
        if (assignedVal == 1) {
            window.location.href = "/wallet"
        }
        else {
            localStorage.setItem("assignedVal", 1)
            setTopupClicked(false)
        }
    }

const handleAmount = (e) => {
    let value = e.target.value;
    if (value.length > 1 && value.startsWith('0')) {
        value = value.replace(/^0+/, ''); 
    }
    setSendTopUpAmount(value);
    if (value >= topupData?.minimum_topup_daily_amount && value <= topupData?.maximum_topup_daily_amount) {
        setAmountTransfer(value);
        setBtnValidation(true);
    } else {
        setAmountTransfer("");
        setBtnValidation(false);
    }
};


    useEffect(() => {
        let timeout;
        if (error !== "") {
            timeout = setTimeout(() => {
                setError("")
            }, 1500);
        }
        return () => clearTimeout(timeout)
    }, [error])


    const TransactionData = async () => {
        try {
            const response = await APIV3.get('/transaction-last');
            if (response?.status == 200) {
                const data = response?.data?.data;
                setTransactionData(data);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (router.query.res === 'succeed' || router.query.res === 'failed') {
            TransactionData();
            if (transactionData) {
                setTopupClicked(true)
                setShow(true)
            }
        } if (router.query.res === 'succeed') {
            setSuccessModal(true)
        } else if (router.query.res === 'failed') {
            setSuccessModal(false)
        }
    }, [router.query.res])


    useEffect(() => {
        if (typeof window !== "undefined") {
            const uanNumber = window.localStorage.getItem('uan_number')
            setUanNumber(uanNumber);
        }
    }, []);

    return (
        <>
            {isLoading && <Loader />}
            {!isMobile
                ?
                <HeaderOnlyLogo toastAnnouce={false} />
                :
                <HeaderMobileWalletUpdated apiFailedToast={apiFailedToast} title={!topupClicked ? "Wallet" : "Topup"} desc="Theses funds can only be used on this platform" handleBackClicked={handleBackClicked} />
            }
            <div className={styles.subscriptionWrapper}>
                <WrapperContainerWallet>
                    {!isMobile &&
                        <div className={styles.wrapperBtnSecured}>
                            <div className={styles.wrapperBtn}>
                                {/* <button className={styles.backBtn} onClick={handleBackClicked}> <span className={styles.back_arrow_svg} /> Back  </button> */}
                            </div>
                            {!isMobile && paySecurePopup &&
                                <div className={styles.securedCardWrapper}>
                                    <div className={styles.singleWrapperSecured}>
                                        {apiFailedToast ? <span className={styles.card_added_Img_not}> </span> : <Image src={secure} alt='paymeny-mobile' className={styles.paymentmob} />}
                                        <span className={styles.your_payment_para_secu}> {!apiFailedToast && 'Your payment info is stored securely'} </span>
                                        {apiFailedToast && <span className={styles.card_added_text_api_failed}> {paymentData.message} </span>}
                                    </div>
                                </div>}

                            {(topupAdded || toastMsgError) && <div className={styles.cardAddedWrapperToast}>
                                <div className={styles.singleWrapperToastAdded}>
                                    <span className={!toastMsgError ? styles.card_added_Img : styles.card_added_Img_not} />
                                    {!toastMsgError ? <span className={styles.card_added_text}> {paymentData.message} </span> : <span className={styles.card_added_text}> Your card could not be added at this time </span>}
                                </div>
                            </div>}

                        </div>
                    }
                    <div className={styles.wrapperFields}>
                        <div className={topupClicked ? styles.leftSubs : styles.centerTopup}>
                            {!isMobile &&
                                <div className={styles.wrapperHeadsTop}>
                                    {topupClicked ? <h5 className={styles.headSubs}> <span className={styles.back_arrow_svg} onClick={handleBackClicked} />  Topup </h5> : <h5 className={styles.headSubs}> <span className={styles.back_arrow_svg} onClick={handleBackClicked} />  Wallet </h5>}
                                    <p className={styles.headSubsPara}> These funds can only be used on this platform </p>
                                </div>
                            }
                            {!topupClicked
                                ?
                                (<>
                                    <div className={styles.cardAddwalletBalance}>
                                        <div className={styles.wrapperSubscription}>
                                            <Image src={price} alt="certificate" className={styles.certificateTopup} />
                                            <h2 className={styles.headingsVoucher}> PKR {walletDetails?.wallet?.voucher_wallet?.toLocaleString('en-IN')}</h2>
                                        </div>
                                        <span className={styles.descCard2}>
                                            <div className={styles.btnTopup} onClick={handleTopup}> <Image src={plus} alt="add-icon" className={styles.addIconImg} onClick={handleShow} /> TOPUP</div>
                                        </span>
                                    </div>
                                </>)
                                :
                                <div className={styles.rightSubsLeftTopCard}>
                                    {isMobile ? (<> <p className={styles.orderIdTop}>Order ID: 0001234</p></>) : (<><p className={styles.orderIdTop}> Order ID: 0001234 </p></>)}
                                    <input type="number" value={Number(sendTopUpAmount?.replace(/,/g, ''))}  required placeholder='Enter amount to be added in wallet' max={20000} min={1} maxLength={20000} 
                                        className={(btnValidation && disableBtn) ? `${styles.amountWallet} ${styles.amountWalletColr}` : `${styles.amountWallet} ${styles.amountWalletColrError}`} onChange={handleAmount} />
                                    <p className={styles.orderIdTopAmount}>{`Enter an amount from PKR ${topupData?.minimum_topup_daily_amount} to`} <span>  {`PKR ${topupData?.maximum_topup_daily_amount?.toLocaleString('en-IN')}`} </span>  </p>
                                    <i className={styles.learnmoreTop} onClick={() => setShowLimit(true)}> Learn about topup </i>
                                    <button className={(btnValidation && disableBtn && amountTransfer !== 0) ? styles.topupDoneBtn : styles.disableTopupDoneBtn} disabled={amountTransfer == 0 ? true : (disableBtn && btnValidation) ? false : true} onClick={handleDone}> Done </button>
                                </div>
                            }
                        </div>

                        {topupClicked &&
                            <>
                                {isMobile ? (<><h2 className={styles.mobileHeading}>Payment Method</h2></>) : (<></>)}
                                <div className={(saved_cards && topupClicked) ? `${styles.rightSubsAddCard} ${styles.cardsSectionPaymentSaved}` : styles.rightSubsAddCard}>

                                    <div className={styles.headerAddCardWrapper}>
                                        <div className={`${styles.headerAddCard}`}>
                                            <Image src={payment} alt='image' className={styles.imgAddCard} />
                                            {/* {!topupClicked ? <h3>  My Cards  </h3> :  */}
                                            <h3>  Payment methods  </h3>
                                            {/* } */}
                                        </div>
                                        {!topupClicked && <div className={styles.plusIconWrapper}>
                                            {/* <Image src={plus} alt="image" className={styles.plusAddCardImg} onClick={() => router.push('/add-card')} /> */}
                                        </div>
                                        }
                                    </div>
                                    {!topupClicked
                                        ?
                                        // <div className={`${styles.nocardAddedWrapper} ${getListSavedCards?.length > 0 && 'justify-content-start'}`}>
                                        //     {!getListSavedCards?.length > 0 ? (
                                        //         <>
                                        //             <span className={styles.imgAddCardNo} />
                                        //             <h3>  No cards added </h3>
                                        //         </>
                                        //     ) : (
                                        //         <>
                                        //             <div className={styles.cardSaveState}>
                                        //                 {getListSavedCards?.length > 0 && getListSavedCards?.map((item) => (
                                        //                     <>

                                        //                         <div className={selectedVal == item?.id ? `${styles.activeCheckedd} ${styles.inptWrapperChecked} ${styles.cardTopUp}` : styles.cardTopUp}>
                                        //                             <div className={styles.inptWrapper}>
                                        //                                 <input
                                        //                                     id={item?.id}
                                        //                                     type="radio"
                                        //                                     name='top-up'
                                        //                                     className={styles.checkboxTopup}
                                        //                                     value={item?.id}
                                        //                                     onChange={(e) => handleSelect(e, item)}
                                        //                                     defaultChecked={selectedVal === item?.id}
                                        //                                 />
                                        //                                 <label htmlFor={item?.id} className={styles.checkboxTopupSavedSpa}>
                                        //                                     {item?.card_number}
                                        //                                 </label>
                                        //                                 <span className={styles.editIcon} onClick={() => handleSingleCardShow(item)}></span>
                                        //                             </div>
                                        //                             <div className={styles.iconsWrapperTopup}>
                                        //                                 <Image src={visaSvg} alt='icons' className={styles.masterCardSvg} />
                                        //                             </div>
                                        //                         </div>
                                        //                     </>
                                        //                 ))}
                                        //             </div>
                                        //             <button className={styles.view_all_cards} onClick={handleCardShow}>
                                        //                 VIEW ALL
                                        //             </button>
                                        //         </>

                                        //     )}
                                        // </div>
                                        ""
                                        :
                                        <div className={styles.cardsSectionPaymentparent}>
                                            {/* {saved_cards
                                        ?
                                        (<>
                                            <div className={styles.savedParent}>
                                                <p className={styles.orderCardsSaved}> Saved </p>
                                                <Image style={{ cursor: 'pointer' }} src={editIcon} alt='icons' width={16} height={16} onClick={handleCardShow} />
                                            </div>
                                            {getListSavedCards?.length > 0 && getListSavedCards?.map((item) => (
                                                <>
                                                    <div className={selectedVal == item?.id ? `${styles.activeChecked} ${styles.inptWrapperCheckedPayment} ${styles.cardTopUp}` : styles.cardTopUp}>
                                                        <div className={styles.inptWrapper}>
                                                            <input
                                                                id={item?.id}
                                                                type="radio"
                                                                name='top-up'
                                                                className={styles.checkboxTopup}
                                                                value={item?.id}
                                                                onChange={(e) => handleSelect(e, item)}
                                                                defaultChecked={selectedVal === item?.id}
                                                            />
                                                            <label htmlFor={item?.id} className={styles.checkboxTopupSavedSpa}>
                                                                {item?.card_number}
                                                            </label>
                                                            <span className={styles.editIcon} onClick={() => handleSingleCardShow(item)}></span>
                                                        </div>
                                                        <div className={styles.iconsWrapperTopup}>
                                                            <Image src={visaSvg} alt='icons' className={styles.masterCardSvg} />
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                            <hr className={styles.hr} />
                                            <p className={styles.orderCardsSaved}> Other Payment Method </p>
                                        </>)
                                        :
                                        ""
                                    } */}
                                            {/* debitcard */}
                                            <div className={selectedDebit ? `${styles.inptWrapperCheckedPayment} ${styles.cardTopUp} ` : styles.cardTopUp}>
                                                <div className={styles.inptWrapper}>
                                                    <input id='topup_id_1' type="radio" name='top-up' value='3' className={styles.checkboxTopup} onChange={(e) => handleSelect(e, "3")} />
                                                    <label htmlFor='topup_id_1' className={styles.wallet_balance_label_title}> Debit/Credit Card  </label>
                                                </div>
                                                <div className={styles.iconsWrapperTopup}>
                                                    <Image src={bothVisas} alt='icons' className={styles.masterCardSvgMix} />
                                                </div>
                                            </div>

                                            {/* mobile */}
                                            <div className={selectedMobileTransfer ? `${styles.inptWrapperCheckedPayment} ${styles.cardTopUp} ` : styles.cardTopUp}>
                                                <div className={styles.inptWrapper}>
                                                    <input id='topup_id_2' type="radio" value='4' name='top-up' className={styles.checkboxTopup} onChange={(e) => handleSelect(e, "4")} />
                                                    <label htmlFor='topup_id_2' className={styles.wallet_balance_label_title}> Mobile Wallet  </label>
                                                </div>
                                                <div className={styles.iconsWrapperTopup}>
                                                    <Image src={easypaisa} alt='icons' className={styles.masterCardSvg} />
                                                    <Image src={jazzcash} alt='icons' className={styles.masterCardSvgJazz} />
                                                </div>
                                            </div>

                                            {/* bank trasnfer */}
                                            <div className={selectedBankTransfer ? `${styles.inptWrapperCheckedPayment} ${styles.cardTopUp} ` : styles.cardTopUp}>
                                                <div className={styles.inptWrapper}>
                                                    <input id='topup_id_3' type="radio" value='1' name='top-up' className={styles.checkboxTopup} onChange={(e) => handleSelect(e, "1")} />
                                                    <label htmlFor='topup_id_3' className={styles.wallet_balance_label_title}> Bank Transfer  </label>
                                                </div>
                                                <div className={styles.iconsWrapperTopup}></div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </>
                        }
                    </div>
                    <TopupPaymentModal handleBackToTopupClosed={handleBackToTopupClosed} transactionData={transactionData} title={'Wallet'} show={show} handleClose={handleClose} successModal={successModal} uanNumber={uanNumber} />
                    <TopupBalanceLimitModal show={showLimit} handleClose={handleCloseLimit} />
                </WrapperContainerWallet >

                <AllCardShowModal handleSelect={handleSelect} handleCardClose={handleCardClose} allSavedCardShow={allSavedCardShow} getListSavedCards={getListSavedCards} selectedVal={selectedVal} handleRemoveCard={handleRemoveCard} />
                <SingleCardRemoveModal singleSavedCardShow={singleSavedCardShow} handleSingleCardClose={handleSingleCardClose} singleCardDetail={singleCardDetail} handleCardClose={handleCardClose} handleRemoveCard={handleRemoveCard} />

            </div >
        </>
    )
}

export default WalletBalanceComp;
