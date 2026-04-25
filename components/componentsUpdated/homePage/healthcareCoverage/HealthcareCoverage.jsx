import React from 'react'
import styles from '../healthcareCoverage/healthcareCoverage.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import ButtonMain from '../../buttonMain/buttonMain'
import parse from 'react-html-parser';
import Lottie from "lottie-react";
import doctorNow from "../../../../public/json/doctor-now.json";
import Inusrance from "../../../../public/json/insurance.json";
import VitalScan from "../../../../public/json/vital-scan.json";


function HealthcareCoverage(props) {

    return (
        <>
            <section className={`${styles.healthCovrageSection} healthCovrageSection01 pt-80 pb-80`}>
                <Container>
                    <Row>
                        {props?.widgetData?.slug == "ms-pro-v3" && <h1> {props?.widgetData?.heading} </h1>}
                        {(props?.widgetData?.slug !== "ms-pro-v3") && <Col md={12} lg={12} className='mx-auto text-center'>
                            <h2>{props?.widgetData?.data[0]?.heading}</h2>
                            <p>{props?.widgetData?.data[0]?.description && parse(props?.widgetData?.data[0]?.description)}</p>
                            <ButtonMain backgroundcolor={props?.widgetData?.data?.[0]?.card_1_inner_color} text={props?.widgetData?.data[0]?.button_text} redirection={props?.widgetData?.data?.[0]?.redirect_url} />
                        </Col>}
                        <Col md={12} lg={12} className='mx-auto'>
                            <div className={`${styles.healthCovrageBox}`}
                                style={{ background: props?.widgetData?.data?.[0]?.card_1_color }}
                            >
                                <ul>
                                    {props?.widgetData?.data.slice(1)?.map((item) => {
                                        return (
                                            <>
                                                <li data-aos="fade-right" data-aos-duration="3000">
                                                    {!item?.animation_text ? (
                                                        <Image src={item?.image} width={80} height={80} className='img-fluid' />
                                                    ) : (
                                                        <>
                                                            {item?.animation_text == "doctor-now.json" && (
                                                                <div className={`${styles.LottieWrapper}`}>
                                                                    <Lottie style={{ width: 250, height: 250 }} animationData={doctorNow} loop={true} />
                                                                </div>
                                                            )}
                                                            {item?.animation_text == "insurance.json" && (
                                                                <div className={`${styles.LottieWrapper}`}>
                                                                    <Lottie style={{ width: 250, height: 250 }} animationData={Inusrance} loop={true} />
                                                                </div>
                                                            )}
                                                            {item?.animation_text == "vital-scan.json" && (
                                                                <div className={`${styles.LottieWrapper}`}>
                                                                    <Lottie style={{ width: 250, height: 250 }} animationData={VitalScan} loop={true} />
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                    <h4>{item?.heading}</h4>
                                                    <p>{item?.description}</p>
                                                </li>
                                            </>
                                        )
                                    })}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default HealthcareCoverage