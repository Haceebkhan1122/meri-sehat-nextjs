import React from 'react'
import styles from './benefitsWaqfa.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import doc from '/public/png/new-images/banner-current.png';

const BenefitsWaqfa = (props) => {
    const { widgetData } = props;

    return (
        <section className={`${styles.benefitWaqfa} benefitWaqfa`}>
            <Container>
                <Row className='justify-content-center'>
                    <Col lg={12}>
                        <h1> {widgetData?.heading} </h1>
                        <Row className={styles.mob_slider_ban}>
                            {widgetData?.data?.map((item) => {
                                return (<>
                                    <Col lg={3} xs={7}>
                                        <div className={styles.waqfaWrape}>
                                            <Image src={item?.image} alt='wrape' className={`${styles.img_benefit} img-fluid`} width={133} height={139} />
                                            <div className={styles.info_bene}>
                                                <h3> {item?.heading} </h3>
                                                <p> {item?.description} </p>
                                            </div>
                                        </div>
                                    </Col>
                                </>)
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default BenefitsWaqfa
