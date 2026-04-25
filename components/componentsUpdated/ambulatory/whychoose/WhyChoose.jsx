import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import parse from 'html-react-parser';
import Image from 'next/image';
import styles from "./whychoose.module.scss"
import Slider from "react-slick";

const WhyChoose = (props) => {
    var settings = {
        autoplay: false, // Enable autoplay
        autoplaySpeed: 2000,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true, // Enable center mode
        centerPadding: '0px', // Optional: Add padding to the center item
        responsive: [
            {
                breakpoint: 1024, // For devices with screen width <= 1024px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: '20px' // Adjust padding for smaller screens
                }
            },
            {
                breakpoint: 768, // For devices with screen width <= 768px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '40px' // Adjust padding for smaller screens
                }
            },
            {
                breakpoint: 480, // For devices with screen width <= 480px
                settings: {
                    slidesToShow: 1.0,
                    slidesToScroll: 1,
                    centerPadding: '20px' // Adjust padding for smaller screens
                }
            }
        ]
    };

    return (
        <>

            <section className={`${styles.whychooseSection} ${props?.pageName === "at-home" && "whychooseSection01 "}`}>
                <Container>
                    <Row>
                        <Col lg={props?.pageName === "at-home" ? "8" : "12"} className='text-center mx-auto'>
                            <h2>{props?.widgetData?.heading}  </h2>
                            <p className={`${styles.pera} d-lg-none d-block`}> {props?.widgetData?.description && parse(props?.widgetData?.description)} </p>

                        </Col>

                        <Col lg={12} className={`${styles.spacingMob} ${props?.pageName === "at-home" && "spacingMob"}`}>
                            <div className={`${styles.SliderBox} ${props?.pageName === "at-home" && "sliderBoxNursing "} sliderwhychoose`} style={{ background: props?.widgetData?.data[0]?.card_1_color }}>

                                {props?.pageName === "at-home" ? (<>
                                    <div className='row'>
                                        {props?.widgetData?.data?.map((item) => {
                                            return (
                                                <Col lg={4} xs={12} className='middleredefineBox'>
                                                    <div className={`${styles.boxSlid01} boxSlid01aft`}>
                                                        <Image src={item?.image} width={80} height={80} className='img-fluid'></Image>
                                                        {/* <Image src={item?.image} /> */}
                                                        <h3>{item?.heading}</h3>
                                                        <p>{item?.description}</p>
                                                    </div>
                                                </Col>
                                            )
                                        })}
                                    </div>
                                </>
                                ) : (
                                    <>
                                        <Slider {...settings} >

                                            {props?.widgetData?.data?.map((item) => {
                                                return (
                                                    <div>
                                                        <div className={`${styles.boxSlid01} boxSlid01aft`}>
                                                            <Image src={item?.image} width={80} height={80} className='img-fluid'></Image>
                                                            {/* <Image src={item?.image} /> */}
                                                            <h3>{item?.heading}</h3>
                                                            <p>{item?.description}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}


                                        </Slider>
                                    </>)}

                            </div>
                        </Col>
                    </Row>
                </Container >
            </section >
        </>
    )

}

export default WhyChoose