import React from 'react'
import styles from './downloadAppCta.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';

const DownloadAppCta = (props) => {
    return (
        <section className={`${styles.downloadAppWrapper} downloadAppWrapper`} style={{ background: props?.widgetData?.data[0]?.card_1_color }}>
            <section className="downloadApp pt-4">
                <Container>
                    <Row>
                        <Col lg={10} className="mx-auto">
                            {props?.widgetData?.data?.map((item) => (
                                <>
                                    <div className="bg_download_btn mb-5">
                                        <Row className="align-items-center">
                                            <Col md={7} lg={7} xs={8} className="">
                                                <h6><a href={item?.redirect_url || ''} target="blank" className="click">{item?.button_text} </a > {item?.heading}</h6>
                                            </Col>
                                            <Col md={3} lg={3} xs={4} className="ms-auto">
                                                <a href={item?.redirect_url || ''} target="blank" className="click"> <Image src={item?.image} width={205} height={59} alt="Arrow shape" className="img-fluid" /></a>
                                            </Col>
                                        </Row>
                                    </div>
                                </>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </section>
        </section>
    )
}

export default DownloadAppCta;
