import React, { useEffect, useState } from 'react'
import styles from './callNowBtn.module.scss';
import Image from 'next/image';
import API, { APIV3 } from "@/utils/httpService";
import { check_online_doctor } from "../../../utils/endpoints";
import Router, { useRouter } from "next/router";
import { isMobile } from "react-device-detect";
import Cookies from 'js-cookie';

const CallNowBtnDoctor = ({ redirectCwpWorksop, consultNowHandler, QrModalHandler, text, href, pageName, buttonColor, tryNowFunc, startScanFun, userData, tryNowData, isUserAuthenticate, LoginModalHandler, tryNowJourney }) => {
    const router = useRouter();
    const [onlineDoctorImages, setOnlineDoctorImages] = useState([]);
    const [onlineDoctorsCount, setOnlineDoctorsCount] = useState(0);
    const disabledButton = '#abb9ca';

    useEffect(() => {
        if (router.pathname == "/doctor-now") {
            APIV3.get(check_online_doctor).then((response) => {
                if (response?.status == 200) {
                    setOnlineDoctorImages(response?.data?.data?.doctor_images);
                    setOnlineDoctorsCount(response?.data?.data?.online_doctors);
                } else {
                    setOnlineDoctorsCount(response?.data?.data?.online_doctors);
                }
            });
        }
    }, []);

    const handleRouteDoctorNow = () => {
        Cookies.set("redirectionUrl", "subscribed-user");
        Router.push("/subscribed-user")
    }

    return (
        <div className={`${styles.wraper_call_now_btn} test`}>
            {pageName == "sehat-scan-v3" ? (
                <>
                    <button
                        onClick={
                            !isMobile
                                ? QrModalHandler
                                : (
                                    !isUserAuthenticate
                                        ? LoginModalHandler
                                        : (
                                            pageName === "sehat-scan-v3" &&
                                                ((!isUserAuthenticate || (isUserAuthenticate && tryNowData?.is_avail_try_now === false)) &&
                                                    userData?.user?.subscription_recent == null)
                                                ? tryNowFunc
                                                : tryNowData !== null &&
                                                userData?.user?.subscription_recent &&
                                                startScanFun
                                        )
                                )
                        }
                        style={{ backgroundColor: buttonColor }}
                        className={`${styles.btnCallNow} buttonWithBgColor_hover`}
                        href={href}
                    >
                        {text}

                    </button>
                </>
            ) : (
                <>
                    {pageName !== "ambulatory" ? (
                        <>
                            <button

                                disabled={onlineDoctorsCount == 0 && pageName == "doctor-now-v3"}
                                onClick={pageName == "doctor-now-v3" ? handleRouteDoctorNow : pageName == "corporate-wellness-program-workshop" ? () => redirectCwpWorksop(href) : pageName == "at-home" ? () => QrModalHandler() : null}
                                style={{ backgroundColor: onlineDoctorsCount > 0 && pageName == "doctor-now-v3" ? buttonColor : pageName == "at-home" ? buttonColor : disabledButton }} className={`${styles.btnCallNow} test01 ${onlineDoctorsCount > 0 && pageName == "doctor-now-v3" ? 'buttonWithBgColor_hover' : ''}`} href={href}>
                                <span className='callIcon'></span>
                                {text}
                                <span className='arrowIcon'></span>
                            </button>
                        </>
                    ) : (
                        <>
                            {isMobile ? (
                                <>
                                    <a style={{ backgroundColor: buttonColor }} className={`${styles.btnCallNow} buttonWithBgColor_hover`} href={href}>
                                        <span className='callIcon'></span>
                                        {text}
                                        <span className='arrowIcon'></span>
                                    </a>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => QrModalHandler()} className={`${styles.btnCallNow} buttonWithBgColor_hover`} href={href}>
                                        <span className='callIcon'></span>
                                        {text}
                                        <span className='arrowIcon'></span>
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
            <div className={pageName === "doctor-now-v3" ? `${styles.bottom_banner}` : "d-none"}  >
                {/* <div className={styles.doctors_svgs}>
                    {onlineDoctorImages?.length > 0 &&
                        onlineDoctorImages?.map((item) => (
                            <div className={styles.img_wrape_doc}>
                                <Image src={item?.image_url} width={40} height={40} crossorigin="anonymous" alt='Doctor Image' className={styles.img_doctor_callnow} />
                            </div>
                        ))}
                </div> */}
                <div className='d-flex align-items-center'>
                    {onlineDoctorsCount > 0 ? (
                        <>
                            {/* <p> {onlineDoctorsCount} doctors currently online </p> */}
                            <p> Doctors Online </p>
                            <div className={styles.circleGreen} />
                        </>

                    ) : (
                        <>
                            <p> No doctors available </p>
                            <div className={styles.circleRed} />
                        </>

                    )}
                </div>
            </div>
        </div>
    )
}

export default CallNowBtnDoctor;
