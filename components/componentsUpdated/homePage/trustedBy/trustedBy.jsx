import React from 'react'
import styles from '../trustedBy/trustedBy.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Slider from "react-slick";

const TrustedBy = (props) => {


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        loop: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <section className={`${styles.sliderLogoes} pb-80 pt-80 trustedBySection`}>
            <Container>
                <Row>
                    <Col md={12} className='text-center mb-5'><h2>{props?.widgetData?.heading}</h2></Col>
                    <Col md={12} className='mx-auto text-center'>
                        <div className={styles.topLogoes}>
                            <Slider {...settings}>
                                {props?.widgetData?.data?.map((slide) => {
                                    return (
                                        <div className='text-center'>
                                            <Image src={slide?.image} alt='Icon' className='img-fluid' width={80} height={66} />
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

export default TrustedBy;