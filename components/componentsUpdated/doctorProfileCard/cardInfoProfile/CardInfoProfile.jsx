import React from 'react'
import styles from './cardInfoProfile.module.scss';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const CardInfoProfile = ({ clinicsInfo, index, doctorData }) => {
    const checkAuth = Cookies.get('Authorization');
    const router = useRouter();

    const handleAppointmentClick = () => {
        if (checkAuth !== undefined && checkAuth !== "undefined") {
            Cookies.set('clinic_info', JSON.stringify({
                clinicsInfoId: clinicsInfo?.id,
                doctorId: doctorData.id
            }));
            router.push('/book-appointment');
        } else {
            window.location.href = "/phone-number"
        }
    };

    return (
        <>
            <div onClick={handleAppointmentClick} className={`${index === 0 ? styles.saveClas : ''} ${styles.cardInfoProfile}`}>
                {clinicsInfo?.is_physical == false && (
                    <>
                        <div className={styles.save_time}>
                            <span> Save time & MONEY </span>
                        </div>
                    </>
                )}
                <div className={styles.left}>
                    <div className={styles.wr}>
                        <Image alt='image' src={clinicsInfo?.icon ? clinicsInfo?.icon : ''} width={30} height={30} />
                        <h3> {clinicsInfo?.name}</h3>
                    </div>
                    <h4> Rs.{clinicsInfo?.consultation_fee} </h4>
                </div>
                {clinicsInfo?.name == "Video Consultation" && (
                    <div className={`${styles.circleProf} circleProf`}>
                        <span className={styles.arrow_rrr}>  </span>
                    </div>
                )}
                {clinicsInfo?.name !== "Video Consultation" && (
                    <div className={`${styles.circleProf} circleProf clinicss`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                            <path d="M15.6247 30.2503L13.833 28.4587L22.083 20.2087L13.833 11.9587L15.6247 10.167L25.6663 20.2087L15.6247 30.2503Z" fill="#0F345A" />
                        </svg>
                    </div>
                )}
            </div >
        </>

    )
}

export default CardInfoProfile
