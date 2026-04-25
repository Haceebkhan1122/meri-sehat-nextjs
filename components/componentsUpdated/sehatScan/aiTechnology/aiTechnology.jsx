import React, { useState } from 'react'
import styles from '../aiTechnology/aiTechnology.module.scss'
import Accordion from 'react-bootstrap/Accordion';
import parse from 'html-react-parser';
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from 'next/router';

function aiTechnology(props) {
    const router = useRouter();
    const currentPath = router.pathname;
    const [activeKey, setActiveKey] = useState(null);
    return (
        <>
            <section className={`${styles.aiTechnologySection} aiTechnologySectionMain pt-80 pb-80`} style={{
                backgroundColor:
                    props?.widgetData?.slug == "corporate-wellness-program-workshop" || props?.widgetData?.slug == "at-home" ? props?.widgetData?.data?.[0]?.card_1_color : null,
                marginTop: props?.widgetData?.slug == "corporate-wellness-program-workshop" ? '80px' : null,
            }}>
                <Container>
                    <Row>
                        <Col md={12} lg={12} className='mx-auto'>
                            <Row className='h-100 justify-content-center'>
                                <Col md={12} className='text-center'>
                                    <h1>{props?.widgetData?.heading}</h1>
                                    {currentPath === '/corporate-wellness-program-workshop' ? (
                                        <></>
                                    ) : (
                                        <>   <p className={`${styles.mb_60} mt-4 `}>{props?.widgetData?.description && parse(props?.widgetData?.description)}</p></>
                                    )}

                                </Col>
                                <Col md={6} lg={6} className={`${styles.textCenter} nursingor2`}>
                                    <Image
                                        width={579}
                                        height={725}
                                        src={props?.widgetData?.data[0]?.image}
                                        className={`${styles.imageBox} img-fluid`}
                                    />
                                </Col>
                                <Col md={6} lg={6} className="my-auto nursingor3">
                                    {props?.widgetData?.data?.slice(1).map((item, index) => (
                                        <Accordion
                                            key={index}
                                            activeKey={activeKey === index ? `${index}` : null}
                                            className="accordianAiTechnology"
                                            onSelect={(eventKey) => setActiveKey(activeKey === index ? null : index)} // Toggle the active accordion
                                        >
                                            <Accordion.Item eventKey={`${index}`}>
                                                <Accordion.Header className="headingAccordian">
                                                    <span>
                                                        <Image width={48} height={48} src={item?.image} className="img-fluid" />
                                                    </span>
                                                    <span className="textAccordian">{item?.heading}</span>
                                                </Accordion.Header>
                                                <Accordion.Body className="bodyAccordian">
                                                    <p>{item?.description}</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    ))}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default aiTechnology