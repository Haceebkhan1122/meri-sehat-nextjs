import React from 'react'
import styles from '../faqs/faqs.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';

function faqs(props) {

    return (
        <>
            <section className={`${styles.faqSection} faqSection pt-80  pb-80`}>
                <Container>
                    <Row>
                        <Col md={12} className='mx-auto'>
                            <Row>
                                <Col md={12} className='accordianNew'>
                                    <h2 className={styles.headingTop}>Frequently Asked Questions</h2>
                                    <Accordion defaultActiveKey="0" className={styles.accordianCustom}>

                                        <Accordion.Item eventKey={1}>
                                            <Accordion.Header className={styles.accordianCustomHeader}>How do I book an online lab test?</Accordion.Header>
                                            <Accordion.Body className={styles.accordianCustomBody}>
                                                How do I book an online lab test? How do I book an online lab test?
                                            </Accordion.Body>
                                        </Accordion.Item>

                                        <Accordion.Item eventKey={2}>
                                            <Accordion.Header className={styles.accordianCustomHeader}>Are the test results shared online secure?</Accordion.Header>
                                            <Accordion.Body className={styles.accordianCustomBody}>
                                                How do I book an online lab test? How do I book an online lab test?
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={3}>
                                            <Accordion.Header className={styles.accordianCustomHeader}>What if I need help understanding my test results?</Accordion.Header>
                                            <Accordion.Body className={styles.accordianCustomBody}>
                                                How do I book an online lab test? How do I book an online lab test?
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={4}>
                                            <Accordion.Header className={styles.accordianCustomHeader}>Can I book multiple tests at the same time?</Accordion.Header>
                                            <Accordion.Body className={styles.accordianCustomBody}>
                                                How do I book an online lab test? How do I book an online lab test?
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={5}>
                                            <Accordion.Header className={styles.accordianCustomHeader}>Is there a specific time for home sample collection?</Accordion.Header>
                                            <Accordion.Body className={styles.accordianCustomBody}>
                                                How do I book an online lab test? How do I book an online lab test?
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={6}>
                                            <Accordion.Header className={styles.accordianCustomHeader}>How long does it take to get my test results?</Accordion.Header>
                                            <Accordion.Body className={styles.accordianCustomBody}>
                                                How do I book an online lab test? How do I book an online lab test?
                                            </Accordion.Body>
                                        </Accordion.Item>

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