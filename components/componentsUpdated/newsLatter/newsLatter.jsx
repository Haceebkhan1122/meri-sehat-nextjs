import React from 'react'
import styles from '../newsLatter/newsLatter.module.scss'
import arrow from '../../../public/svg/newPages/arrow.svg'
import Image from 'next/image';

function newsLatter({ page }) {
    return (
        <div className={page === "home" ? styles.newsLatterBox : "d-none" }>
            <div className={styles.nNumber}><p>+92</p></div>
            <div className={styles.nInput}>
                <form>
                    <input type="tel" placeholder='Enter your mobile number to try now' className='form-control' />
                </form>
            </div>
            <div className={styles.nButton}>
                <button>
                    <Image src={arrow} alt='paymeny-mobile' className={styles.arrow} />
                </button>
            </div>
        </div >
    )
}

export default newsLatter