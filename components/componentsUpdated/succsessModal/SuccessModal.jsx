import React from 'react'
import styles from "./successModal.module.scss"
import { Modal } from 'antd';
import { useRouter } from 'next/router';




export default function SuccessModal({ setFormsubmitSuccsess, formsubmitSuccsess }) {
    const router = useRouter(); // useRouter hook for accessing the current route
    const currentPath = router.pathname;
    return (
        <Modal
            centered
            open={formsubmitSuccsess}
            onOk={() => setFormsubmitSuccsess(false)}
            onCancel={() => setFormsubmitSuccsess(false)}
            className={`${styles.modalConfirm} ${currentPath == "/book-a-nurse" && "nursrModal"} modalConfirmworkshop`}
        >
            <div>
                <div className={styles.boxImage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="73" height="73" viewBox="0 0 73 73" fill="none">
                        <path d="M59.5852 36.5001C59.5852 48.8376 49.5822 58.8405 37.2447 58.8405C24.9072 58.8405 14.9043 48.8376 14.9043 36.5001C14.9043 24.1626 24.9072 14.1597 37.2447 14.1597C49.5822 14.1597 59.5852 24.1626 59.5852 36.5001Z" fill="#DDF9D1" />
                        <path d="M45.125 27.5642L32.9152 40.1831L27.8746 34.9948L25.3301 37.6215L32.9188 45.4366L47.6705 30.1909L45.125 27.5642Z" fill="#59D129" />
                        <path d="M36.5 7.81128L36.5 1.4998" stroke="#59D129" stroke-width="2" stroke-linecap="round" />
                        <path d="M36.5 71.5L36.5 65.1885" stroke="#59D129" stroke-width="2" stroke-linecap="round" />
                        <path d="M50.8447 11.6548L54.0005 6.18889" stroke="#59D129" stroke-width="2" stroke-linecap="round" />
                        <path d="M19 66.8105L22.1557 61.3446" stroke="#59D129" stroke-width="2" stroke-linecap="round" />
                        <path d="M22.1553 11.6548L18.9995 6.18889" stroke="#59D129" stroke-width="2" stroke-linecap="round" />
                        <path d="M54 66.8105L50.8443 61.3446" stroke="#59D129" stroke-width="2" stroke-linecap="round" />
                        <path d="M61.3457 22.156L66.8116 19.0003" stroke="#59D129" stroke-width="2" stroke-linecap="round" />
                        <path d="M6.18945 54L11.6554 50.8443" stroke="#59D129" stroke-width="2" stroke-linecap="round" />
                        <path d="M11.6543 22.156L6.1884 19.0003" stroke="#59D129" stroke-width="2" stroke-linecap="round" />
                        <path d="M66.8105 54L61.3446 50.8443" stroke="#59D129" stroke-width="2" stroke-linecap="round" />
                        <path d="M65.1885 36.5L71.5 36.5" stroke="#59D129" stroke-width="2" stroke-linecap="round" />
                        <path d="M1.5 36.5L7.81148 36.5" stroke="#59D129" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </div>
                {currentPath === '/corporate-wellness-program' ? (
                    <>
                        <h4>Your request has been submitted!</h4>
                        <p>Our team will reach out to you shortly.</p>
                    </>
                ) : currentPath == "/book-a-nurse" ? (
                    <>
                        <h4>We have received your request</h4>
                        <p>Our team will be in touch with you shortly.</p>
                    </>
                ) : (
                    <>
                        <h4>You’re one step closer to wellness!</h4>
                        <p>Thank you for your interest, our team
                            will reach out to you shortly.</p>
                    </>
                )}

                <p className={`${styles.helpline} helpNo`}>For help or queries, call us at
                    <span> <a href="tel:021111111111">(021)-111-111-111</a></span>
                </p>
            </div>
        </Modal>
    )
}
