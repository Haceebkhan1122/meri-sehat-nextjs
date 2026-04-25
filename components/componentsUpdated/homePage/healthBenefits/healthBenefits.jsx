import React, { useState } from 'react'
import styles from '../healthBenefits/healthBenefits.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import ButtonMain from '../../buttonMain/buttonMain'
import Slider from "react-slick";


function healthBenefits(props) {

    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        autoplay: true,
        infinite: true,
        loop: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1.1,
                    slidesToScroll: 1,
                    centerPadding: '5%',
                    infinite: true,
                    loop: true
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: '4%',
                },
            },
            {
                breakpoint: 1415,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerPadding: '4%',
                },
            },
            {
                breakpoint: 1550,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerPadding: '2%',
                },
            },
            {
                breakpoint: 1919,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerPadding: '5%',
                },
            },
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerPadding: '7%',
                },
            }, {
                breakpoint: 2500,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerPadding: '7%',
                },
            },
            {
                breakpoint: 3000,
                settings: {
                    slidesToShow: 4,
                    centerPadding: '7%', // Adjust this value to control the margin from the left side
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 4000,
                settings: {
                    slidesToShow: 4,
                    centerPadding: '7%', // Adjust this value to control the margin from the left side
                    slidesToScroll: 1,
                },
            }
        ],
    };

    return (
        <section className={`${styles.healthBenefitsSection} fff healthSection pt-80`}>
            <Container>
                <Row>
                    <Col md={12} lg={12} className='ms-auto'>
                        <h2>{props?.widgetData?.heading}</h2>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md={12} lg={12} className='ms-auto'>
                        <div className='slider-container'>
                            <Slider {...settings} className={`${styles.healthBenefitSlider} slick-sliderNew`}>
                                {props?.widgetData?.data?.map((item) => {
                                    return (
                                        <div key={item?.id}>
                                            <div className={`${styles.healthBenefitsSlid} healthBenefitsSlids`} >
                                                <div className={`${styles.boxSlid} boxSlides`} style={{ backgroundColor: item?.card_1_color }}>
                                                    <h3>{item?.heading}</h3>
                                                    <p>{item?.description}</p>
                                                    <div className={`${styles.positionCustom} text-center`}>
                                                        <Image src={item?.image} width={282} height={286} className='img-fluid mx-auto' />
                                                        <ButtonMain backgroundcolor={item?.card_1_inner_color} text={item?.button_text} redirection={item?.redirect_url} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </Slider>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default healthBenefits