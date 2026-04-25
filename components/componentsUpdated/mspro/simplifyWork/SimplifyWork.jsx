import React from 'react'
import styles from './simplifyWork.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';

const SimplifyWork = (props) => {
    return (
        <section className={`${styles.simplifyWork} simplifyWork`} style={{ background: props?.widgetData?.data?.[0]?.card_1_color }}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center'>
                    <Col lg={12}>
                        <h1> {props?.widgetData?.heading} </h1>
                        <Col lg={12}>
                            <Row className='gx-0'>
                                {props?.widgetData?.data?.map((item, index) => {
                                    return (<>
                                        <Col lg={4} key={index}>
                                            <div className={styles.wraper_box_simp} style={{background : item?.card_1_inner_color}}>
                                                <Image src={item?.card_1_icon || ""} alt='' width={80} height={80} />
                                                <h3> {item?.heading} </h3>
                                                <p> {item?.description} </p>
                                            </div>
                                        </Col>
                                    </>)
                                })}
                            </Row>
                        </Col>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default SimplifyWork
