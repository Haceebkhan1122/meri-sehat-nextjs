import React from 'react'
import styles from './ourStatistics.module.scss';
import { Col, Container, ProgressBar, Row } from 'react-bootstrap';
import starIcon from '../../../../public/svg/newPages/starIcon.svg'
import Image from 'next/image';
import DocImg from '/public/svg/newPages/doc-statistics.png';
import parse from 'html-react-parser';

const OurStatistics = (props) => {
    return (
        <section className={`${styles.ourStatistics} ourStatistics ourStatistics_pricing`}>
            <Container className='h-100'>
                <Row className={
                    props?.page === "pricing" ? "h-100 justify-content-center" :
                        "h-100 justify-content-center gx-0"
                }>
                    <Col lg={12}>
                        <h1>{props?.widgetData?.heading}  </h1>
                        <div className={`${styles.boxes} ${styles.wrape_info}  ${styles.wrape_infoPricingPage} row  justify-content-center align-items-end`}>
                            <Col lg={3} data-aos="fade-right" data-aos-duration="3000">
                                <div className={`${styles.box1} box1DrNow`} style={{ background: props?.widgetData?.data[0]?.card_1_color }}>
                                    <div>
                                        <h2> {props?.widgetData?.data?.[0]?.heading} </h2>
                                        <p> {props?.widgetData?.data?.[0]?.description} </p>
                                    </div>
                                    {props?.widgetData?.data?.[0]?.image && <Image src={props?.widgetData?.data?.[0]?.image} width={202} height={175} className='img-fluid' />}
                                </div>
                            </Col>
                            <Col data-aos="fade-right" data-aos-duration="3000" lg={2} xs={6} className='or4'>
                                <div className={`${styles.box2} box2DrNow`} style={{ background: props?.widgetData?.data[1]?.card_1_color }}>
                                    {props?.widgetData?.data?.[1]?.image && <Image src={props?.widgetData?.data?.[1]?.image} width={32} height={32} className='img-fluid' />}
                                    <h2> {props?.widgetData?.data?.[1]?.heading} </h2>
                                    <h3> {props?.widgetData?.data?.[1]?.card_1_head} </h3>
                                    <p> {props?.widgetData?.data?.[1]?.card_1_desc} </p>
                                    <ProgressBar now={parseInt(props?.widgetData?.data?.[1]?.card_2_head, 10)} className={`${styles.progressBar} progress_statistics`} />
                                </div>
                            </Col>
                            <Col data-aos="fade-up" data-aos-duration="3000" lg={2} xs={6} className='or3'>
                                <div className={`${styles.box3} box3DrNow`} style={{ background: props?.widgetData?.data[2]?.card_1_color }}>
                                    {props?.widgetData?.data?.[2]?.image && <Image src={props?.widgetData?.data?.[2]?.image} width={94.585} height={24.891} className='img-fluid' />}
                                    <h2>  {props?.widgetData?.data?.[2]?.heading} </h2>
                                    <span>  {props?.widgetData?.data?.[2]?.description} </span>
                                </div>
                            </Col>
                            <Col data-aos="fade-left" data-aos-duration="3000" lg={2} xs={6} className='or5'>
                                <div className={`${styles.box22} box4DrNow`} style={{ background: props?.widgetData?.data?.[3]?.card_1_color }}>
                                    <h2> {props?.widgetData?.data?.[3]?.heading}  </h2>
                                    <span> {props?.widgetData?.data?.[3]?.description}  </span>
                                    {props?.widgetData?.data?.[3]?.image && <Image src={props?.widgetData?.data?.[3]?.image} alt='' width={118} height={150} className={styles.doc__img_sta} />}
                                </div>
                            </Col>
                            <Col data-aos="fade-left" data-aos-duration="3000" lg={3} xs={6} className='or6'>
                                <div className={`${styles.boxPrem} box5DrNow`} style={{ background: props?.widgetData?.data[4]?.card_1_color }}>
                                    <h2 className={styles.title_prem}> {props?.widgetData?.data?.[4]?.heading} </h2>
                                    <div className={styles.box__pre_sh}>
                                        <div className={`${styles.box_ra1} box5f1`} style={{ background: props?.widgetData?.data[4]?.card_2_inner_color }}>
                                            <h2> {props?.widgetData?.data?.[4]?.card_2_head}  </h2>
                                            <p>{props?.widgetData?.data?.[4]?.card_2_desc && parse(props?.widgetData?.data?.[4]?.card_2_desc)} </p>
                                        </div>
                                        <div className={`${styles.box_ra2} box5f2`} style={{ background: props?.widgetData?.data[4]?.card_1_inner_color }}>
                                            <h2> {props?.widgetData?.data?.[4]?.card_1_head} </h2>
                                            <p> {props?.widgetData?.data?.[4]?.card_1_desc && parse(props?.widgetData?.data?.[4]?.card_1_desc)} </p>
                                        </div>
                                    </div>
                                    <div className={`${styles.box__bottom} box5f3`} style={{ background: props?.widgetData?.data[4]?.card_3_inner_color }}>
                                        <h3> {props?.widgetData?.data?.[4]?.card_3_head}  </h3>
                                        <span>{props?.widgetData?.data?.[4]?.card_3_desc}</span>
                                    </div>
                                </div>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
export default OurStatistics;
