import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import styles from './hiw_bkj.module.scss';
import Slider from 'react-slick';
import docImage from '/public/png/new-images/banner-current.png';
import { useState } from 'react';
import Image from 'next/image';

const HowitWorksBkj = (props) => {
    const {widgetData} = props;
    const [activeSlide, setActiveSlide] = useState(0);
    let index = 0;

    const settings = {
        arrow: false,
        infinite: true,
        loop: true,
        speed: 500,
        slidesToShow: 1,
        dots: true,
        slidesToScroll: 1,
        // autoplay: true,
        beforeChange: (current, next) => setActiveSlide(next),
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToScroll: 1,
                    autoplay: true,
                    beforeChange: (current, next) => setActiveSlide(next),
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToScroll: 1,
                    autoplay: true,
                    beforeChange: (current, next) => setActiveSlide(next), // Update active slide index
                },
            },
        ],
    };

    return (
        <section className={`${styles.banner_bkj_wraper} banner_bkj_wraper`}>
            <Container>
                <Row className='h-100 justify-content-center'>
                    <Col lg={12} className={styles.coll__hiwww}>
                        <h1> {widgetData?.heading}  </h1>
                        <div className={`${styles.wraper_slider_bkj} wraper_slider_bkj`}>
                            <Slider {...settings} className={""}>
                                {widgetData?.data.map((item) => {
                                    return (<>
                                        <Col lg={12}>
                                            <Row className={""}>
                                                <Col lg={5} className="my-auto">
                                                    <div className={`${styles.bkj_hiw_wrape}`} style={{background : item?.card_1_color}}>
                                                        <Image
                                                            src={item?.card_1_icon}
                                                            width={112}
                                                            height={112}
                                                            alt="instant Consultant"
                                                            className={`${styles.ico_sm_ico} img-fluid`}
                                                        />
                                                        <h3>{item?.heading}</h3>
                                                    </div>
                                                </Col>
                                                <Col lg={1}> </Col>
                                                <Col lg={5} className="my-auto">
                                                    <Image
                                                        width={511}
                                                        height={358}
                                                        alt={""}
                                                        src={item?.image}
                                                        className={`${styles.sec_inco_im} img-fluid`}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>)
                                })}
                            </Slider >
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default HowitWorksBkj;
