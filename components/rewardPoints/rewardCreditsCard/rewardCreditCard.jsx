import React from 'react';
import styles from './rewardCreditCard.module.css';
import CreditCardSvg from '../../../public/svg/creditCardReward.svg';
import Image from 'next/image';
import LoaderAssets from "../../../public/gif/asset_loader.gif";

// The component takes three props: loader, availableCredits, and redeemVoucherFunc
const AvailableVouchers = ({ loader, availableCredits, redeemVoucherFunc }) => {


    // Redeem Voucher function caller
    const redeemVoucherCall = (item) => {
        redeemVoucherFunc(item?.id)
    }

    return (
        // Conditional rendering based on the loader prop
        loader ? (
            // If loader is true, render loading spinner
            <div className={styles.gifCenter} style={{ height: '50vh !important' }}>
                <Image
                    className="loading_gif m-auto"
                    src={LoaderAssets} // This variable is not defined in this component, it might be imported from somewhere else
                    alt="loader"
                    width={90}
                    height={90}
                />
            </div>
        ) : (
            // If loader is false, render available credit cards
            <div className={styles.wrapperRewardCard}>
                {!availableCredits?.length > 0 ? (
                    // If no credits available, display message
                    <>
                        <div className={styles.noCreditsWrapper}>
                            <Image src={CreditCardSvg} />
                            <span> No credits available </span>
                        </div>
                    </>
                ) : (
                    // If credits available, render the list of available cards
                    <>
                        <div className={styles.wrapperAvailableCards}>
                            {/* Map through availableCredits array and render each card */}
                            {availableCredits?.map((item) => (
                                <div key={item?.id} className={styles.singleCard} id={item?.id}>
                                    <div className={styles.price}>
                                        <h3 className={styles.pkr}> PKR <span className={styles.specPrice}> {item?.amount_per_user} </span> </h3>
                                        <span className={styles.details}> Expires on : {item?.formated_end_date} </span>
                                    </div>
                                    <div className={styles.wrapeBtn}><button className={styles.reedemBtn} onClick={() => redeemVoucherCall(item)}> Redeem </button></div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        )
    )
}

export default AvailableVouchers;
