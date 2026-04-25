import React, { useEffect, useState } from 'react'
import styles from './areUDoctor.module.scss';
import Image from 'next/image';
import Router, { useRouter } from "next/router";
import areUDocImg from '/public/svg/newPages/areUDocImg.svg';
import { Col, Container, Row } from 'react-bootstrap';
import Slider from 'react-slick';

const AreUDoctor = (props) => {

    const router = useRouter();

    return (
        <>
            <section className={`${styles.areUDoctor} areUDoctor`} style={{ background: props?.widgetData?.data[0]?.card_1_inner_color }}>
                <Container className='h-100'>
                    <Row className='h-100 justify-content-center'>
                        <Col lg={12}>
                            <div className={`${styles.cont__fad} areUDoctor_fad`}>
                                <Col lg={6} className={`${styles.col__left} areUDoctor_ord`}>
                                    <h2> {props?.widgetData?.data?.[0]?.heading} </h2>
                                    <p> {props?.widgetData?.data?.[0]?.description} </p>
                                    <button className='buttonWithBgColor_hover' onClick={() => { Router.push("https://dr.merisehat.pk/signup-number") }}> {props?.widgetData?.data?.[0]?.button_text} </button>
                                </Col>
                                <Col lg={6} className='text-center'>
                                    {props?.widgetData?.data?.[0]?.image && <Image src={props?.widgetData?.data?.[0]?.image} width={471.998} height={501.231} alt='' className={`${styles.right_botm_pam_img} areUDoctor_img`} />}
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>)
}

export default AreUDoctor;
