import React from 'react'
import styles from '../defeatdiabetes/defeatdiabetes.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import ButtonMain from '../../../../components/componentsUpdated/buttonMain/buttonMain'

function defeatdiabetes(props) {

    return (
        <>
            <section className={`${styles.marginTop} defeatbuttonWidth`}>
                <Container>
                    <Row>
                        <Col lg={12} className='mx-auto'>
                            <div className={styles.defeatdiabetesSection} style={{ backgroundColor: props?.widgetData?.data?.[0]?.card_1_color }}>
                                <Row className='h-100'>
                                    <Col lg={1} className='or3' ></Col>
                                    <Col lg={6} className={`${styles.or2} my-auto`}>
                                        <div className={styles.spacingBox}>
                                            <h2>{props?.widgetData?.data?.[0]?.heading}</h2>
                                            <p className='mb-5 mt-4'>{props?.widgetData?.data?.[0]?.description}</p>
                                            <ButtonMain backgroundcolor={props?.widgetData?.data?.[0]?.card_1_inner_color} text={props?.widgetData?.data?.[0]?.button_text} redirection={props?.widgetData?.data?.[0]?.redirect_url} />
                                        </div>
                                    </Col>
                                    <Col lg={4} className={`${styles.or1} text-center my-auto `}>
                                        <Image src={props?.widgetData?.data?.[0]?.image} width={415} height={415} className='img-fluid' alt='image defeat' />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default defeatdiabetes