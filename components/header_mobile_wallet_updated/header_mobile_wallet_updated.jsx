import React from 'react'
import styles from './header_mobile_wallet_updated.module.css';
import backin from '../../public/svg/newPages/arrow-back_header_ic.svg'
import secure from '../../public/svg/secure.svg';
import Image from 'next/image';
import {useRouter} from 'next/router';

const HeaderMobileWalletUpdated = ({ apiFailedToast, title, desc, handleBackClicked }) => {
    let router = useRouter();

    return (
        <>
            <div className={`${styles.wrapperAllHeaderMobile} mobileSpacing`}>
                <div className={styles.wraperMobile_wallet_header}>
                    <div className={styles.backbutton_Header} onClick={handleBackClicked} >
                        <Image src={backin} alt='backing' className={styles.backing} /> 
                    </div>
                    {router.pathname == '/subscription' && <h3 className='title_side_back_mob'> {title} </h3> }
                </div>
                <div className={styles.securedWRappermobileHeader_wrap}>
                    {router.pathname !== "/subscription" && (
                        <div className={styles.securedWRappermobileHeader}>
                            {apiFailedToast ? <span className={styles.card_added_Img_not}> </span> : <Image src={secure} alt='paymeny-mobile' className={styles.paymentmob_withHeader} />}
                            <span className={styles.your_payment_para_secu_header}> {apiFailedToast ? 'The payment method field is required.' : 'Your payment info is stored securely'} </span>
                        </div>
                    )}
                </div>
                <h3 className={`${styles.title_header} mobileNone`}> {title}  </h3>
                <span className={styles.para}> {desc} </span>
            </div>
        </>
    )
}

export default HeaderMobileWalletUpdated;
