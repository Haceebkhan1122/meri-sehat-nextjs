import CreditCardSvg from '../../../public/svg/creditCardReward.svg';
import Image from 'next/image';
import styles from './ExpiredVouchers.module.css';

const ExpiredVouchers = ({ expiredCredits }) => {
    return (
        <div className={styles.wrapperRewardCard}>
            {!expiredCredits?.length > 0 ? (
                <>
                    <div className={styles.noCreditsWrapper}>
                        <Image src={CreditCardSvg} />
                        <span>  No credits available </span>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.wrapperAvailableCards}>
                        {expiredCredits?.length > 0 && expiredCredits?.map((item) => (
                            <>
                                <div key={item?.id} className={styles.singleCard} id={item?.id}>
                                    <div className={styles.price}>
                                        <h3 className={styles.pkr}> PKR <span className={styles.specPrice}> {item?.amount_per_user} </span> </h3>
                                        <span className={styles.details}> Expired on : {item?.formated_end_date} </span>
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

export default ExpiredVouchers;
