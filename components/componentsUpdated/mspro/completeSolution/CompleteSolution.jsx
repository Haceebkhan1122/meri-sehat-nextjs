import React, { useEffect, useRef, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import styles from './completeSolution.module.scss';

const CompleteSolution = (props) => {
    const [imageIndex, setImageIndex] = useState(0);

    const handleClick = (item, index) => {
        setImageIndex(index);
    }

    return (
        <section className={`${styles.completeSolution} completeSolution`}>
            <Container>
                <Row className='justify-content-center'>
                    <Col lg={12} className='h-100'>
                        <Row>
                            <h1 className={`${styles.head_offer} head_offer`}>{props?.widgetData?.heading}</h1>
                            <Col lg={6} className={styles.offer_left_col}>
                                {props?.widgetData?.data?.[0]?.image !== null && <Image src={props?.widgetData?.data?.[imageIndex]?.image} width={1022.528} height={599} className='img-fluid'></Image>}
                            </Col>
                            <Col lg={6} className={`my-auto ${styles.offer_right_col}`}>
                                <Accordion defaultActiveKey="0" className='accordianOfferPrecision'>
                                    {props?.widgetData?.data?.map((item, index) => {
                                        return (<>
                                            <Accordion.Item eventKey={`${item}_${index}`} onClick={() => handleClick(item, index)}>
                                                <Accordion.Header className='headingAccordian'><span>{item?.card_1_icon && <Image src={item?.card_1_icon} width={48} height={48} className='img-fluid'></Image>}</span><span className='textAccordian'>{item?.heading}</span></Accordion.Header>
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

export default CompleteSolution;
