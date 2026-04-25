import React, { useState } from 'react'
import styles from './mostViewedTopics.module.scss';
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';
import iconredirect from '../../../../public/svg/newPages/iconredirect.svg'
import Link from 'next/link';
import parse from 'html-react-parser';
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const MostViewedTopics = (props) => {


    const [showTooltip, setShowTooltip] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const handleMouseEnter = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setShowTooltip(true);

        const newTimeoutId = setTimeout(() => {
            setShowTooltip(false);
        }, 3000);

        setTimeoutId(newTimeoutId);
    };

    const router = useRouter();
    const handleRedirect = (item) => {


        const Authorization = Cookies.get("Authorization");
        if (Authorization) {
            const url = `${item.redirect_url}?service=${item.sub_head}`;
            window.location.href = url;

        } else {
            Cookies.set("nursinglogin", 1);
            window.location.href = "/phone-number";
        }
    };

    return (
        <section className={`${styles.mostViewedTopics} mostViewedTopics`} style={{ backgroundColor: props?.widgetData?.slug === "careers-v3" && props?.widgetData?.data?.[0]?.card_1_inner_color }}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center'>
                    <Col lg={8} xs={12}>
                        <h1 className='alignements'> {props?.widgetData?.heading} </h1>
                        <p className='text-center mb-5 pb-3'>
                            {props?.widgetData?.description && parse(props?.widgetData?.description)}
                        </p>
                    </Col>
                    <Col lg={12} xs={12} className='newBoxMobileSlide'>
                        <Row className=''>
                            {props?.widgetData?.data?.map((item) =>
                                <Col lg={3} xs={6} className='boxM' >

                                    {props?.pageName == "at-home" ? (
                                        <>
                                            <div className={`${styles.singleViewed} single-bgcolor nursingBoxes`} style={{ backgroundColor: props?.widgetData?.slug == "at-home" ? item?.card_1_color : item?.card_1_inner_color }}>
                                                <div className={`${styles.icondetail1} icondetail`}>
                                                    <div className={`${styles.tooltipBox} tooltipBox position-relative`}  >
                                                        <div
                                                            className={`${styles.tooltipBoxicon}`}
                                                            onMouseEnter={handleMouseEnter}
                                                            onTouchStart={handleMouseEnter}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                                <g clipPath="url(#clip0_8160_2449)">
                                                                    <rect width="32" height="32" rx="16" fill="white" />
                                                                    <path d="M14.6667 9.33341H17.3334V12.0001H14.6667V9.33341ZM14.6667 14.6667H17.3334V22.6667H14.6667V14.6667ZM16.0001 2.66675C8.64008 2.66675 2.66675 8.64008 2.66675 16.0001C2.66675 23.3601 8.64008 29.3334 16.0001 29.3334C23.3601 29.3334 29.3334 23.3601 29.3334 16.0001C29.3334 8.64008 23.3601 2.66675 16.0001 2.66675ZM16.0001 26.6667C10.1201 26.6667 5.33341 21.8801 5.33341 16.0001C5.33341 10.1201 10.1201 5.33341 16.0001 5.33341C21.8801 5.33341 26.6667 10.1201 26.6667 16.0001C26.6667 21.8801 21.8801 26.6667 16.0001 26.6667Z" fill="#0F345A" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_8160_2449">
                                                                        <rect width="32" height="32" rx="16" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>

                                                            {showTooltip && (
                                                                <div className={styles.tooltip_text}>
                                                                    <div className={styles.iconBoxSvg}></div>
                                                                    <p>{item?.description && parse(item?.description)}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Image width={150} height={150} src={item?.image} alt='' className={`${styles.img_mostViewed} img-fluid`} />
                                                <h3> {item?.heading} </h3>
                                                <button onClick={() => handleRedirect(item)} className={styles.linkBtn}>
                                                    {item?.button_text} <Image src={iconredirect} alt="Redirect Icon" />
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link href={item?.redirect_url ? item.redirect_url : "#"}>
                                                <div className={`${styles.singleViewed} single-bgcolor ${props?.widgetData?.slug == "careers-v3" && "careerBoxHei"}`} style={{ backgroundColor: props?.widgetData?.slug === "careers-v3" ? item?.card_1_color : item?.card_1_inner_color }}>
                                                    <Image width={150} height={150} src={item?.image} alt='' className={`${styles.img_mostViewed} img-fluid`} />
                                                    <h3 className='fwCareer'> {item?.heading} </h3>
                                                    <p> {item?.description} </p>
                                                </div>
                                            </Link>
                                        </>
                                    )}

                                </Col>
                            )}
                        </Row>
                    </Col>

                </Row>
            </Container>
        </section>
    )
}

export default MostViewedTopics
