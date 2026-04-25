import React from 'react'
import Slider from 'react-slick';
import styles from './sliderFooter.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import walletSliderImage from '../../../../public/svg/newPages/walletSliderImage.svg';
import walletSliderBgimage from '../../../../public/png/new-images/wallerBg.png';

import Image from 'next/image';
import Link from 'next/link';

const SliderFooter = (props) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <section className={`${styles.sliderFooter} sliderFooter`}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center'>
                    <Col lg={12}>
                        <div className={`${styles.wraping_sliding_banner} boxSlider`}>
                            <Slider {...settings} className='slider__fad_banner' >
                                <div key={1} >
                                    <div className={`${styles.wraper_banner_footer} boxSlideCta`}
                                        style={{
                                            backgroundImage: 'url(https://ms-images.s3.ap-southeast-1.amazonaws.com/call-by-reference-card-custom/xUFST60CewH8vas4ctmD23krnyXKgPNwynuEplHT.png)',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            borderRadius: '30px 20px 20px 30px',
                                            // background: '#0F345A',
                                        }}
                                    >
                                        <Row className='align-items-center h-100 w-100'
                                        >
                                            <Col lg={1}></Col>
                                            <Col lg={8} className='my-auto'>
                                                <div className={`${styles.info_banner} info_banner infobannernew`}>
                                                    <h3>Worried about your<br></br> sugar levels? </h3>
                                                    <button className={`${styles.reqDemoBtn} hovering_green_btn_MA`}>BOOK A LAB TEST</button>

                                                    <Image
                                                        src={walletSliderImage}
                                                        alt="slide"
                                                        width={282}
                                                        height={300}
                                                        className={`${styles.img__banner_fad} imageHomeSlider img-fluid`}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={3}></Col>
                                        </Row>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </Col>
                </Row>
            </Container >
        </section >
    )
}

export default SliderFooter;
