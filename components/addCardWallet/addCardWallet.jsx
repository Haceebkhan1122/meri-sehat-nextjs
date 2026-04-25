import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from './addCardWallet.module.css';
import HeaderOnlyLogo from '../headerOnlyLogo/HeaderOnlyLogo';
import payment from '../../public/svg/payment.svg';
import secure from '../../public/svg/secure.svg';
import Router, { useRouter } from 'next/router';
import visaSvg from '../../public/svg/visa_svg.svg'
import InputMask from 'react-input-mask';
import WrapperContainerWallet from '../wrapperContainerCustomWallet/wrapperContainerWallet';
import HeaderMobileWalletUpdated from '../header_mobile_wallet_updated/header_mobile_wallet_updated';
import SubscriptionStatusModal from '../subscriptionStatusModal/subscriptionStatusModal';
import { addCard } from "@/utils/endpoints";
import API from "@/utils/httpService";
import Loader from '../Loader';
import moment from 'moment';


const AddCardWalletBalance = (props) => {
    const [packagesTab, setPackagesTab] = useState(true)
    const [historyTab, setHistoryTab] = useState(false)
    const [liteAccordian, setLiteAccordian] = useState(false)
    const [plusAccordian, setPlusAccordian] = useState(false)
    const [premiumAccordian, setPremiumAccordian] = useState(false)
    const [flip, setFlip] = useState(false)
    const [cvv, setCvv] = useState("")
    const [expiry, setExpiry] = useState("")
    const [creditCardNumber, setCreditCardNumber] = useState("")
    const [cardHolderName, setCardHolderName] = useState("")
    const [flipedInterval, setFlipedInterval] = useState(false)
    const [transactionType, setTransactionType] = useState("")
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [cvvError, setCvvError] = useState("")
    const [expiryError, setExpiryError] = useState("")
    const [creditCardNumberError, setCreditCardNumberError] = useState("")
    const [cardHolderNameError, setCardHolderNameError] = useState("")


    const isMobile = useMediaQuery('(max-width:767px)');
    const router = useRouter()
    const noCards = true;

    useEffect(() => {
        if (router.query) {
            setTransactionType(router.query.name)
        }
    }, [])

    const handleChange = (e) => {
        setCvv(e.target.value)
    }

    const handleCvvFocus = (e) => {
        setFlip(true)
        setTimeout(() => {
            setFlipedInterval(true)
        }, 300);
    }

    const handleFlipFront = (e) => {
        setFlip(false)
        setFlipedInterval(false)
    }

    const handleBackClicked = () => {
        Router.back()
    }


    const handleClose = () => setShowSubscriptionModal(false);
    const successModalSubscription = true;

    //   Add custom card
    const addCustomCard = async () => {
        setCreditCardNumberError("")
        setCardHolderNameError("")
        setExpiryError("")
        setCvvError("")

        if (!creditCardNumber) {
            setCreditCardNumberError("Please Enter Card Number.")
        }
        else if (!cardHolderName) {
            setCardHolderNameError("Please Enter Card Name.")
        }
        else if (!expiry) {
            setExpiryError("Please Enter Expiry.")
        }
        else if (!cvv) {
            setCvvError("Please Enter Cvv.")
        }
        else {
            setIsLoading(true)
            try {
                const formattedExpiry = moment(expiry, 'MM/YY').format('MM/YY');
                let data = {
                    card_number: creditCardNumber,
                    card_holder_name: cardHolderName,
                    expiry_date: formattedExpiry,
                    cvv: cvv
                };
                const response = await API.post(`${addCard}`, data);
                if (response?.code === 200) {
                    setIsLoading(false)
                    router.push('/wallet-balance')

                }
            } catch (e) {
                console.error(e);
            }
        }
    }
    return (
        <>
            {isLoading && <Loader />}
            {!isMobile
                ?
                <HeaderOnlyLogo toastAnnouce={false} />
                : <HeaderMobileWalletUpdated title="Add card" desc="" handleBackClicked={handleBackClicked} />
            }
            <div className={styles.subscriptionWrapper}>
                <WrapperContainerWallet>
                    {!isMobile &&
                        <div className={styles.wrapperBtnSecured}>
                            <div className={styles.wrapperBtn}>
                                <button className={styles.backBtn} onClick={() => Router.push("/wallet-balance")}> <span className={styles.back_arrow_svg} /> Back  </button>
                            </div>
                            {!isMobile && <div className={styles.securedCardWrapper}>
                                <div className={styles.singleWrapperSecured}>
                                    <Image src={secure} alt='paymeny-mobile' className={styles.paymentmob} />
                                    <span className={styles.your_payment_para_secu}> Your payment info is stored securely </span>
                                </div>
                            </div>
                            }
                        </div>
                    }
                    <div className={styles.wrapperFields}>
                        <div className={styles.leftSubs}>
                            {!isMobile &&
                                <div className={styles.wrapperHeadsTop}>
                                    <h5 className={styles.headSubs}> Wallet </h5>
                                    <p className={styles.headSubsPara}> These funds can only be used on this platform </p>
                                </div>
                            }
                            <div className={flip ? `${styles.cardAddwalletBalance} ${styles.cardAddwalletBalanceFlip}` : styles.cardAddwalletBalance}>
                                {!flip
                                    ?
                                    (<>
                                        <div className={styles.visaImgWrapper}>
                                            <Image src={visaSvg} alt='visa_svg' className={styles.visaCardImg} />
                                        </div>
                                        <InputMask mask="9999 9999 9999 9999" disabled placeholder='XXXX XXXX XXXX XXXX' value={creditCardNumber} className={styles.card_number_input_View} />
                                        <div className={styles.singleHoldersWrapper}>
                                            <div className={styles.singleHolder}>
                                                <span className={styles.firstCard}> Cardholder Name </span>
                                                <span className={styles.twoCard}> {cardHolderName !== "" ? cardHolderName : "Full Name"} </span>
                                            </div>
                                            <div className={styles.singleHolderEXp}>
                                                <span className={styles.firstCard}> Expiry </span>
                                                {expiry !== ""
                                                    ?
                                                    <InputMask disabled mask="99/99" value={expiry} placeholder='MM/YY' className={styles.card_number_input_expiryView} />
                                                    :
                                                    <span className={styles.viewMonth}> MM/YY </span>
                                                }
                                            </div>
                                        </div>
                                    </>)
                                    :
                                    (<>
                                        {flipedInterval && <div className={flipedInterval ? `${styles.blackBar} ${styles.blackBarFlipped}` : styles.blackBar}></div>}
                                        {flipedInterval
                                            &&
                                            <div className={styles.fieldWrapeCvvWrapeAlign}>
                                                <div className={styles.fieldWrapeCvv}>
                                                    <InputMask disabled mask="999" value={cvv} className={styles.emptyWhite} />
                                                    <div className={styles.backGre}>
                                                        <span className={styles.cvGreen}> CVV </span>
                                                        <span className={styles.cvGreen}> XXX </span>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </>)
                                }
                            </div>
                        </div>
                        <div className={styles.rightSubsAddCardWrapper}>
                            <div className={styles.rightSubsAddCard}>
                                <div className={styles.headerAddCardWrapper}>
                                    <div className={styles.headerAddCard}>
                                        <Image src={payment} alt='image' className={styles.imgAddCard} />
                                        <h3> Card Details  </h3>
                                    </div>
                                </div>
                                <div className={styles.cardDetailsAddedWrapper}>
                                    <div className={styles.single_field}>
                                        <label htmlFor="card-number"> Card Number </label>
                                        <div className={styles.wrapperWithImageInpt}>
                                            <input value={creditCardNumber} type="text" placeholder='Enter Card Number' minLength={16} maxLength={16} required className={styles.card_number_input}
                                                onChange={(e) => {
                                                    const inputValue = e.target.value;
                                                    const numericValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters

                                                    if (/^\d{0,16}$/.test(numericValue)) {
                                                        setCreditCardNumber(numericValue);
                                                    }
                                                }}
                                                onFocus={handleFlipFront} />
                                            <Image src={visaSvg} alt='card-number' className={styles.card_number_image} />
                                        </div>
                                        <span className={styles.error_card_add}>{creditCardNumberError}</span>
                                    </div>
                                    <div className={styles.single_field}>
                                        <label htmlFor="card-number"> Cardholder Name </label>
                                        <div className={styles.wrapperWithImageInpt}>
                                            <input type="text" placeholder='Enter full name' required className={styles.card_number_input} onChange={(e) => setCardHolderName(e.target.value)} onFocus={handleFlipFront} />
                                        </div>
                                        <span className={styles.error_card_add}>{cardHolderNameError}</span>
                                    </div>
                                    <div className={styles.multiple_fields_wrapper}>
                                        <div className={styles.multiple_fields}>
                                            <label htmlFor="card-number"> Expiry Date </label>
                                            <InputMask mask="99/99" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder='MM/YY' required className={styles.card_number_input_multi} onFocus={handleFlipFront} />
                                            <span className={styles.error_card_add}> {expiryError}</span>
                                        </div>
                                        <div className={styles.multiple_fields}>
                                            <label htmlFor="card-number"> CVV </label>
                                            <InputMask mask="999" value={cvv} onChange={handleChange} placeholder='XXX' required className={styles.card_number_input_multi} onFocus={handleCvvFocus} />
                                            <span className={styles.error_card_add}>   {cvvError}</span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className={styles.save_btn_cards} onClick={addCustomCard}> Save </button>
                        </div>
                    </div>
                </WrapperContainerWallet>
                <SubscriptionStatusModal packageTitle="demo title" successModalSubscription={successModalSubscription} show={showSubscriptionModal} handleClose={handleClose} />
            </div>
        </>
    )
}

export default AddCardWalletBalance;
