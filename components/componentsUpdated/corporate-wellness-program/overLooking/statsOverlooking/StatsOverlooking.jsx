import React, { useRef } from 'react'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'
import styles from './statsOverlooking.module.scss';
import Image from 'next/image';
import img_overlook from '/public/png/new-images/over_svg.png';
import {isMobile} from 'react-device-detect';

const StatsOverlooking = (props) => {

    let perProgressVal = `${props?.widgetData?.widgetData?.data?.[1]?.heading.split("")[0]} ${props?.widgetData?.widgetData?.data?.[1]?.heading.split("")[1]}`
    let perProgress = perProgressVal.replace(/\s+/g, '');

    return (
        <section className={`${styles.statsOverlooking} statsOverlooking`}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center'> 
                    <Col lg={12}>
                        <Row className='justify-content-center align-items-end'>
                            <Col lg={3} className='h-100'>
                                <div className={styles.box1} style={{background : props?.widgetData?.widgetData?.data?.[0]?.card_1_inner_color}}>
                                    <h1> {props?.widgetData?.widgetData?.data?.[0]?.heading} </h1>
                                    <p> {props?.widgetData?.widgetData?.data?.[0]?.description} </p>
                                    <Image src={props?.widgetData?.widgetData?.data?.[0]?.image || ""} width={191} height={219} alt='' className={`${styles.img_overlook} img-fluid`} />
                                </div>
                            </Col>
                            {isMobile 
                                &&
                                <div className={styles.wrape_mobile_box_staeps}>
                                    <Col xs={6}>
                                        <div className={styles.box2}>
                                            <h1> {props?.widgetData?.widgetData?.data?.[1]?.heading} </h1>
                                            <h3> {props?.widgetData?.widgetData?.data?.[1]?.description} </h3>
                                            <ProgressBar now={perProgress} className={`${styles.progressBar} progress_overLook`} />
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className={styles.box3}>
                                            <Image src={props?.widgetData?.widgetData?.data?.[2].image || ""} width={191} height={219} alt='' className={`${styles.img_overlook} img-fluid`} />
                                            <div className={styles.wrape_info}>
                                                <h1> {props?.widgetData?.widgetData?.data?.[2]?.heading} </h1>
                                                <p> {props?.widgetData?.widgetData?.data?.[2]?.description}  </p>
                                            </div>
                                        </div>
                                    </Col>
                                </div>
                            }
                            {!isMobile 
                                &&
                                (<>
                                <Col lg={3}>
                                <div className={styles.box2}>
                                    <h1> {props?.widgetData?.widgetData?.data?.[1]?.heading} </h1>
                                    <h3> {props?.widgetData?.widgetData?.data?.[1]?.description} </h3>
                                    <ProgressBar now={perProgress} className={`${styles.progressBar} progress_overLook`}/>
                                </div>
                            </Col>
                            <Col lg={3}>
                                <div className={styles.box3}>
                                    <div className={styles.cells}>
                                        <Image src={props?.widgetData?.widgetData?.data?.[2].image || ""} width={191} height={219} alt='' className={`${styles.img_overlook} ${styles.img_overlookBox3} img-fluid`} />
                                    </div>
                                    <div className={styles.wrape_info}>
                                        <h1> {props?.widgetData?.widgetData?.data?.[2]?.heading} </h1>
                                        <p> {props?.widgetData?.widgetData?.data?.[2]?.description}  </p>
                                    </div>
                                </div>
                            </Col></>)}
                            <Col lg={3}>
                                <div className={styles.box4}>
                                    {!isMobile && <Image src={props?.widgetData?.widgetData?.data?.[3].image || ""} width={191} height={219} alt='' className={`${styles.img_overlookBox4} img-fluid`} />}
                                    <div className={styles.info_preee}>
                                        <h1> {props?.widgetData?.widgetData?.data?.[3]?.heading} </h1>
                                        <p> {props?.widgetData?.widgetData?.data?.[3]?.description}</p>
                                    </div>
                                    {isMobile && <Image src={props?.widgetData?.widgetData?.data?.[3].image || ""} width={191} height={219} alt='' className={`${styles.img_line_up} img-fluid`} />}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default StatsOverlooking
