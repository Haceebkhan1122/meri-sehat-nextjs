import React from 'react'
import styles from './trustByHealth.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';

const TrustByHealth = (props) => {
    return (
        <section className={`${styles.trustedByHealth} pb-80 pt-80 trustedByHealth`} style={{ background: props?.widgetData?.data?.[0]?.card_1_color }}>
            <Container>
                <Row>
                    <Col md={12} className='text-center mb-5'><h2>{props?.widgetData?.heading}</h2></Col>
                    <Col md={12} lg={12} className='mx-auto text-center'>
                        <div className={styles.topLogoes}>
                            {props?.widgetData?.data?.slice(1).map((item) => {
                                return (
                                    <Col lg={3}>
                                        <div className={styles.singleStory} style={{ background: item?.card_1_inner_color }}>
                                            <div className={styles.infoStory}>
                                                <h2>{item?.heading}</h2>
                                                <h4>{item?.description}</h4>
                                            </div>
                                            <Image src={item?.image || ""} alt="Video Stories" width={312} height={560} className={`${styles.video__story} img-fluid`} />
                                        </div>
                                    </Col>
                                )
                            })}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default TrustByHealth;
