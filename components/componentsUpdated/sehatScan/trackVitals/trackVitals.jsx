import React, { useState } from 'react'
import styles from '../trackVitals/trackVitals.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import ButtonMain from '../../buttonMain/buttonMain'
import QRModal from '../../qRModal/QRModal';

function trackVitals(props) {
    const [qRModalIsShow, setQRModalIsShow] = useState(false);

    return (
        <>
            <section style={{ backgroundColor: props?.widgetData?.data[0]?.card_1_color }} className={`${styles.trackVitalsSection}  trackVitals pt-80 pb-80`}>
                <Container>
                    <Row>
                        <Col md={6} lg={6} className={`${styles.spacingTrack} ${styles.or22}    `}>
                            {props?.pageName === "ambulatory" ? (
                                <>
                                    <h1 className={`mt11 mb-3 pb-2`}>{props?.widgetData?.data[0]?.heading}</h1>
                                </>
                            ) : (
                                <> <h2 >{props?.widgetData?.data[0]?.heading}</h2></>
                            )}


                            <p>{props?.widgetData?.data[0]?.description}</p>
                            <div className={`${styles.boxesTrack} ${props?.pageName === "ambulatory" ? "" : "row"}  boxesTrack01`}>
                                {props?.widgetData?.data?.slice(1)?.map((item) =>

                                    <>
                                        {props?.pageName === "ambulatory" ? (
                                            <>
                                                <li>
                                                    <div className={`${styles.mainBx} mainBoxTrack`}>
                                                        <div>
                                                            <Image width={60} height={60} src={item?.image} className='img-fluid'></Image>
                                                            <p>{item?.heading}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <Col lg={4} md={4} xs={4}>
                                                    <li>
                                                        <div className={`${styles.mainBx} mainBoxTrack`}>
                                                            <div>
                                                                <Image width={60} height={60} src={item?.image} className='img-fluid'></Image>
                                                                <p>{item?.heading}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </Col>
                                            </>
                                        )}

                                    </>
                                )}
                            </div>
                            <Row>
                                <Col lg={8} className='pe-md-1'>
                                    {props.pageName == "ambulatory" ? (
                                        <>
                                            <ButtonMain pageName={props.pageName} redirection={props?.widgetData?.data[0]?.redirect_url} backgroundcolor={props?.widgetData?.data[0]?.card_1_inner_color} text={props?.widgetData?.data[0]?.button_text} />
                                        </>
                                    ) : (
                                        <>
                                            <ButtonMain redirection={props?.widgetData?.data[0]?.redirect_url} backgroundcolor={props?.widgetData?.data[0]?.card_1_inner_color} text={props?.widgetData?.data[0]?.button_text} />
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6} className={`${styles.or11} ${styles.mobImage02}  imagesizeNew   text-right`}>
                            <Image width={761} height={729} src={props?.widgetData?.data[0]?.image} className={`${styles.image} img-fluid`}  ></Image>
                        </Col>
                    </Row>
                </Container>
            </section>
            <QRModal pageName={props.pageName} qRModalIsShow={qRModalIsShow} setQRModalIsShow={setQRModalIsShow} />
        </>
    )
}

export default trackVitals