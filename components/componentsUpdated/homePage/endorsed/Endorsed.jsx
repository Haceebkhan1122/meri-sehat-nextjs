
import React, { useState } from 'react';

import styles from '../endorsed/endorsed.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Slider from "react-slick";
import ReactPlayer from 'react-player'
import parse from 'react-html-parser';

function Endorsed(props) {

    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                },
            },
        ],
    };

    return (
        <>
            <section className={`${styles.endorsedSlider} sliderEndorsed`}>
                <Container>
                    <Row>
                        <Col md={12} className='mx-auto'>
                            <Slider {...settings} className={`${styles.endorsedSlider} slick-endorsed mb-5`}>
                                {props?.widgetData?.data?.length > 0 ? props?.widgetData?.data?.map((item) => {
                                    return (
                                        <>
                                            {!item?.redirect_url ? (
                                                <>
                                                    <div className={`${styles.endorsedSlidBoxMain} endorsedSlidBoxMain`}>
                                                        <div className={`${styles.endorsedSlidBox} ${styles.endorsedSlidBoxSlid1} endorsedSlidBoxSlid1Wr text-center`} style={{ backgroundColor: item?.card_1_color }}>
                                                            <h2>{item?.heading}</h2>
                                                            <div className={`${styles.endorsedSlidBoxDr} endorsedSlidBoxDr`}>
                                                                <div className={`${styles.slidImage} slidImage `}>
                                                                    <Image src={item?.image || ""} width={872} height={140} className='img-fluid'></Image>
                                                                </div>
                                                            </div>
                                                            <h5>{item?.description && parse(item?.description)}</h5>
                                                            {props?.widgetData?.slug == "corporate-wellness-v3" && (
                                                                <div className={styles.wrapeStarEndro}>
                                                                    <Image src={item?.card_1_icon || ""} alt='' width={258} height={54} />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className={`${styles.endorsedSlidBoxMain} endorsedSlidBoxMain`}>
                                                        <div className={`${styles.endorsedSlidBox} ${styles.endorsedSlidBoxSlid2}`}>
                                                            <div className={styles.endorsedSlidVideoBox}>
                                                                <ReactPlayer controls={true} url={item?.redirect_url} className={styles.video__story} height={775} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )
                                }) : props?.workshop?.widgets?.[1]?.data?.map((item) => {
                                    return (
                                        <>
                                            {!item?.redirect_url ? (
                                                <>
                                                    <div className={`${styles.endorsedSlidBoxMain} endorsedSlidBoxMain`}>
                                                        <div className={`${styles.endorsedSlidBox} ${styles.endorsedSlidBoxSlid1} endorsedSlidBoxSlid1Wr text-center`} style={{ backgroundColor: item?.card_1_color }}>
                                                            <h2>{item?.heading}</h2>
                                                            <div className={`${styles.endorsedSlidBoxDr} endorsedSlidBoxDr`}>
                                                                <div className={`${styles.slidImage} slidImage `}>
                                                                    <Image src={item?.image || ""} width={872} height={140} className='img-fluid'></Image>
                                                                </div>
                                                            </div>
                                                            <h5>{item?.description && parse(item?.description)}</h5>
                                                            <div className='hk_details_cwp'>
                                                                <div className={styles.wrapeStarEndro}>
                                                                    <Image src={item?.card_1_icon || ""} alt='' width={258} height={54} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className={`${styles.endorsedSlidBoxMain} endorsedSlidBoxMain`}>
                                                        <div className={`${styles.endorsedSlidBox} ${styles.endorsedSlidBoxSlid2}`}>
                                                            <div className={styles.endorsedSlidVideoBox}>
                                                                <ReactPlayer controls={true} url={item?.redirect_url} className={styles.video__story} height={775} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )
                                })}
                            </Slider>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Endorsed