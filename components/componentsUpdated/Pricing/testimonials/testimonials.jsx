
import React from 'react';
import styles from '../testimonials/testimonials.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Slider from "react-slick";


function Testimonial(props) {


    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,

    };

    return (
        <>
            <section data-aos="fade-up" data-aos-duration="3000" className={`${styles.endorsedSlider} sliderTestimonials sliderEndorsed pb-80 pt-80`}>
                <Container>
                    <Row>
                        <Col md={12} className='mx-auto'>
                            <Slider {...settings} className={`${styles.endorsedSlider} slick-endorsed`}>
                                {props?.widgetData?.data?.map((item) => {
                                    return (
                                        <div>
                                            <div className={`${styles.endorsedSlidBox} ${styles.endorsedSlidBoxSlid1} text-center mobileHeight`} style={{ backgroundColor: props.widgetData?.data?.[0]?.card_1_color }}>
                                                <h2>{item?.heading}</h2>
                                                <Row>
                                                    <Col lg={8} className='mx-auto'>
                                                        <div className={`${styles.endorsedSlidBoxDr} sliderBtno1`}>
                                                            <div className={`${styles.slidImage} `}>
                                                                <Image src={item?.image} width={640} height={100} className='img-fluid'></Image>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <h5 className='mobileBoxHead'>{item?.description}</h5>
                                            </div>
                                        </div>
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

export default Testimonial