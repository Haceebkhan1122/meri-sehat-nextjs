import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import offerPrecisionImg from '/public/png/new-images/offer_presc_img.png';
import ac01 from '/public/svg/newPages/ac01.svg'
import ac02 from '/public/svg/newPages/ac02.svg'
import ac03 from '/public/svg/newPages/ac03.svg'
import ac04 from '/public/svg/newPages/ac04.svg'
import styles from './offerPrecision.module.scss';

const OfferPrecision = (props) => {

    return (
        <section className={`${styles.OfferPrecision} OfferPrecision`}>
            <Container>
                <Row className='justify-content-center'>
                    <Col lg={12} className='h-100'>
                        <Row>
                            <h1 className={`${styles.head_offer} head_offer`}>{props?.widgetData?.heading}</h1>
                            <Col lg={6} className={styles.offer_left_col}>
                                {props?.widgetData?.data?.[0]?.image !== null && <Image src={props?.widgetData?.data?.[0]?.image} width={1022.528} height={599} className='img-fluid'></Image>}
                            </Col>
                            <Col lg={6} className={`my-auto ${styles.offer_right_col}`}>
                                <Accordion defaultActiveKey="0" className='accordianOfferPrecision'>
                                    {props?.widgetData?.data?.slice(1)?.map((item, index) => {
                                        return (<>
                                            <Accordion.Item eventKey={`${item}_${index}`}>
                                                <Accordion.Header className='headingAccordian'><span>{item?.image && <Image src={item?.image} width={48} height={48} className='img-fluid'></Image>}</span><span className='textAccordian'>{item?.heading}</span></Accordion.Header>
                                                <Accordion.Body className='bodyAccordian'>
                                                    <p>{item?.description}</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </>)
                                    })}
                                </Accordion>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default OfferPrecision;
