import CreditCardSvg from '../../../public/svg/creditCardReward.svg';
import styles from './reedemedVouchers.module.css';
import Image from 'next/image';

const ReedemedVouchers = ({ redeemCredits }) => {
    return (
        <div className={styles.wrapperRewardCard}>
            {!redeemCredits?.length > 0 ? (
                <>
                    <div className={styles.noCreditsWrapper}>
                        <Image src={CreditCardSvg} />
                        <span>  No credits available </span>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.wrapperAvailableCards}>
                        {redeemCredits?.length > 0 && redeemCredits?.map((item) => (
                            <>
                                <div key={item?.id} className={styles.singleCard} id={item?.id}>
                                    <div className={styles.price}>
                                        <h3 className={styles.pkr}> PKR <span className={styles.specPrice}> {item?.amount_per_user} </span> </h3>
                                        <span className={styles.details}> Expires on : {item?.formated_end_date} </span>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default ReedemedVouchers;
