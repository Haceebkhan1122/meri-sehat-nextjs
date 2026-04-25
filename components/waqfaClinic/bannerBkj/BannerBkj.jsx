import React from 'react'
import styles from './bannerBkj.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import Slider from 'react-slick';


const BannerBkj = (props) => {
    const { widgetData } = props;

    const settings = {
        arrows: false,
        // autoplay : true,
        autoplaySpeed: 3000,
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1,
                },
            },
        ],
        speed: 500,
    };

    return (
        <section className={`${styles.banner_bkj_wraper} banner_bkj_wraper`}>
            <Container>
                <Row className='justify-content-center'>
                    <Col lg={12}>
                        <div className={`${styles.wraperSlider} wraperSlider`} style={{background : widgetData?.data?.[0]?.card_1_color }}>
                            <Slider {...settings}>
                                {widgetData?.data?.map((item) => {
                                    return (<>
                                        <div className={styles.main_wrape}>
                                            <Col lg={6} className={`${styles.col_mob} my-auto`}>
                                                <div className={styles.banner_bkj}>
                                                    <div className={styles.wrape_top}>
                                                        <Image src={item?.card_1_icon} alt='' width={133} height={132} className={`${styles.icon_banner_img} img-fluid `}/>
                                                        <h2> {item?.heading} </h2>
                                                    </div>
                                                    <p> {item?.description} </p>
                                                </div>
                                            </Col>
                                            <Col lg={6} className=''>
                                                <Image src={item?.image} alt='' width={457} height={414} className={`img-fluid ${styles.bannerRightImage}`} />
                                            </Col>
                                        </div>
                                    </>)
                                })}
                            </Slider>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default BannerBkj
