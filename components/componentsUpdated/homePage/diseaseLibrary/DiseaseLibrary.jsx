import React from 'react'
import styles from '../diseaseLibrary/diseaseLibrary.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Link from 'next/link';
import Router from 'next/router';

function DiseaseLibrary(props) {

    return (
        <>
            <section className={`${styles.diseaseLibSection} diseaseLibSection01  mb-80`}>
                <Container className='h-100'>
                    <Row className='h-100 align-items-center'>
                        <Col lg={6} className='my-auto padding-bottom:39px;'>
                            <h2>{props?.widgetData?.data?.[0]?.heading}</h2>
                            <p>{props?.widgetData?.data?.[0]?.description}</p>
                                <button style={{
                                    backgroundColor: props?.widgetData?.data?.[0]?.card_1_inner_color
                                }} className='button03 button_disease blueWithBgColor_hover' 
                                onClick={() => Router.push(`${props?.widgetData?.data?.[0]?.redirect_url || ''}`)}>
                                    {props?.widgetData?.data?.[0]?.button_text}
                                </button>
                        </Col>
                        <Col lg={6} ></Col>
                    </Row>
                </Container>
                <div className={`${styles.diseaseLibSectionimage}`}>
                    <Image src={props?.widgetData?.data?.[0]?.image} width={948} height={840} className='img-fluid' />
                </div>
            </section>
        </>
    )
}

export default DiseaseLibrary