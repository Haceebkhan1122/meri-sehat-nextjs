import React from 'react'
import styles from '../consultNowSection/consultNowSection.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import parse from 'html-react-parser';

function consultNowSection(props) {

    return (
        <>
            <section className={`${styles.consultNowSection} pb-80 pt-90 consultBtnWidth`}>
                <Container>
                    <Row>

                        <Col md={6} lg={6} className='ms-auto my-auto'>
                            <h2>{props?.widgetData?.data?.[0]?.heading && parse(props?.widgetData?.data?.[0]?.heading)}</h2>
                            <Image src={props?.widgetData?.data?.[0]?.image} className={`${styles.imageRight} img-fluid d-block d-lg-none`} width={636} height={607} />
                            <p className='mt-4 pt-2 mb-4 pb-3'> {props?.widgetData?.data?.[0]?.description && parse(props?.widgetData?.data?.[0]?.description)} </p>
                        </Col>

                        <Col md={6} lg={6} className='ms-auto'>
                            <Image src={props?.widgetData?.data?.[0]?.image} className={`${styles.imageRight} img-fluid d-none d-lg-block`} width={636} height={607} />
                        </Col>
                        <Col md={1} lg={1}>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default consultNowSection