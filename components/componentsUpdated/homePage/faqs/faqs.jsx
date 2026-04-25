import React from 'react'
import styles from '../faqs/faqs.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import parse from 'html-react-parser';

function faqs(props) {
    return (
        <>
            <section data-aos="fade-up" data-aos-duration="3000" className={`${styles.faqSection} faqSection pt-80  pb-80`}>
                <Container>
                    <Row>
                        <Col md={12} className='mx-auto'>
                            <Row>
                                <Col md={12} className='accordianNew dda'>
                                    <h2 className={`${styles.headingTop} mt-0`}>{props?.widgetData?.heading}</h2>
                                    <Accordion defaultActiveKey="0" className={styles.accordianCustom}>
                                        {props?.widgetData?.data?.map((item, index) => (
                                            <Accordion.Item eventKey={index}>
                                                <Accordion.Header className={styles.accordianCustomHeader}>{item?.question}</Accordion.Header>
                                                <Accordion.Body className={styles.accordianCustomBody}>
                                                    {parse(item?.answer)}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))}
                                    </Accordion>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default faqs;