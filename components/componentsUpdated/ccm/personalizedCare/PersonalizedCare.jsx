import React from 'react'
import styles from './personalizedCare.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import { isMobile } from 'react-device-detect';

const PersonalizedCare = (props) => {
    return (
        <section className={`${styles.personalizedCare} personalizedCare`} style={{ background: props?.widgetData?.data?.[0]?.card_1_color }}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center'>
                    {isMobile && <h1> {props?.widgetData?.data?.[0]?.heading} </h1>}
                    <Col lg={6} className={styles.col_pers_left}>
                        {!isMobile && <h1> {props?.widgetData?.data?.[0]?.heading} </h1>}
                        <Row>
                            {props?.widgetData?.data?.slice(1)?.map((item) => {
                                return (<>
                                    <Col lg={6} xs={6}>
                                        <div className={styles.single_box_pers}>
                                            <Image src={item?.image} alt='image' width={648} height={741} className={` ${styles.card_icon} img-fluid `} />
                                            <h3> {item?.description} </h3>  
                                        </div>
                                    </Col>
                                </>)
                            })}
                        </Row>
                    </Col>
                    <Col lg={6} className={styles.col_pers_right}>
                        <Image src={props?.widgetData?.data?.[0]?.image} alt='image' width={648} height={741} className='img-fluid' />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default PersonalizedCare;
