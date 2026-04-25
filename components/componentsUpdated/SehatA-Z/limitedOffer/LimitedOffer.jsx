import React from 'react'
import styles from './limitedOffer.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Slider from 'react-slick';
import LimitedOfferBox from '../limitedOfferBox/limitedOfferBox';

const SliderLimitedOffer = (props) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // dots: true
                },
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    infinite: false, slidesToScroll: 1,
                    // dots: true
                }
            },
        ]
    };


    return (
        <section data-aos="fade-up" data-aos-duration="3000" className={`${styles.sliderLimitedOffer}  pt-5 pb-5 sliderLimitedOffer`}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center gx-0'>
                    <Col lg={12}>
                        <div className={styles.wraping_sliding_limited}>
                            <Slider {...settings} className='wraping_sliding_limited'>
                                {props?.widgetData?.data?.map((item) => (
                                    <LimitedOfferBox widgetData={item} />
                                ))}
                            </Slider>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default SliderLimitedOffer;
