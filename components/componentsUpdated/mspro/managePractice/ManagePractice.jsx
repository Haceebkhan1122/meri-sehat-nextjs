import React from 'react'
import styles from './managePractice.module.scss';
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image';
import { isMobile } from 'react-device-detect';
import Slider from 'react-slick';

const ManagePractice = (props) => {

    const settings = {
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "40px",
    };

    return (
        <section className={`${styles.managePractice} managePractice`} style={{ background: props?.widgetData?.data?.[0]?.card_1_color }}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center'>
                    <Col lg={12}>
                        <h1> {props?.widgetData?.heading} </h1>
                        {isMobile ?
                            <div className={`${styles.wraperManageSlider} wraperManageSlider`}>
                                <Slider {...settings}>
                                {props?.widgetData?.data?.map((item) => {
                                    return (<>
                                    <div className={styles.single_card_mana} style={{ background: item?.card_1_inner_color }}>
                                        <h3> {item?.heading}  </h3>
                                        <p> {item?.description} </p>
                                        {item?.image !== null && <Image src={item?.image || ""} alt="" width={343} height={263} className={` ${styles.img_manage} img-fluid `} />}
                                    </div>
                                    </>)
                                })}
                                </Slider>
                            </div>
                            : <Row>
                                {props?.widgetData?.data?.map((item) => {
                                    return (<>
                                        <Col lg={4}>
                                            <div className={styles.single_card_mana} style={{ background: item?.card_1_inner_color }}>
                                                <h3> {item?.heading}  </h3>
                                                <p> {item?.description} </p>
                                                {item?.image !== null && <Image src={item?.image || ""} alt="" width={343} height={263} className={` ${styles.img_manage} img-fluid `} />}
                                            </div>
                                        </Col>
                                    </>)
                                })}
                            </Row>}
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ManagePractice;
