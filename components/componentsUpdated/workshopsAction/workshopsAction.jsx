import React, { useState } from 'react'

import { Container, Row, Col } from "react-bootstrap";
import styles from './workshopsAction.module.scss';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import parse from 'html-react-parser';
import moImage from "../../../public/png/new-images/moImage.png"
const WorkshopsAction = (props) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const handleThumbnailClick = () => {
        setIsVideoPlaying(true);
    };
    return (
        <>
            <Container>
                <div className={`${styles.workshops}`}>
                    <Row>
                        <div className={`${styles.workshopHeading}`}>
                            <h4>
                                {props.widgetData.heading}
                            </h4>
                            <p style={{ width: '60%', paddingTop: '30px', margin: 'auto' }}>
                                {props.widgetData.description && parse(props.widgetData.description)}
                            </p>
                        </div>
                    </Row>
                    <Row className={`${styles.boxesRow} boxSpacingMob`}>
                        <Col lg={4} xs={6} className={`${styles.sp01}`}>
                            <div className={`${styles.workshopBoxes}`} style={{ background: props.widgetData.data[0].card_1_color }}>
                                <h2 style={{ color: props.widgetData.data[0].card_1_inner_color }} >{props.widgetData.data[0].card_1_head}</h2>
                                <p style={{ color: props.widgetData.data[0].card_1_inner_color }}>{props.widgetData.data[0].card_1_desc}</p>
                            </div>
                        </Col>
                        <Col lg={4} xs={6} className={`${styles.sp01}`}>
                            <div>
                                <Image src={props.widgetData.data[1].image} width={424} height={352} alt='middleBox' className={`${styles.imgMaintenance} img-fluid`} />
                            </div>
                        </Col>

                        <Col lg={4} xs={6} className={`${styles.sp01} d-lg-none d-block`} >
                            <div className={`${styles.workshopBoxes}`} style={{ background: props.widgetData.data[4].card_1_color }}>
                                <h2 style={{ color: props.widgetData.data[4].card_1_inner_color }} >{props.widgetData.data[4].heading}</h2>
                                <p style={{ color: props.widgetData.data[4].card_1_inner_color }}>{props.widgetData.data[4].description}</p>
                            </div>
                        </Col>
                        <Col lg={4} xs={6} className={`${styles.sp01}`}>
                            <div className={`${styles.workshopBoxes} ff position-relative`} style={{ background: props.widgetData.data[2].card_1_color }}>
                                <h2 style={{ color: props.widgetData.data[2].card_1_inner_color }} >{props.widgetData.data[2].heading}</h2>
                                <p style={{ color: props.widgetData.data[2].card_1_inner_color }}>{props.widgetData.data[2].description}</p>

                                <Image src={props.widgetData.data[2].image} className={`${styles.imageMobile} img-fluid dd`} width={250} height={261}></Image>
                            </div>
                        </Col>
                    </Row>
                    <Row className={`${styles.boxesSecondRow} `} >
                        <Col lg={8} className='video__story_thumb1 '>
                            {!isVideoPlaying ? (
                                <div onClick={handleThumbnailClick} className="video__story_thumb">
                                    {props?.widgetData?.data[4]?.image && (
                                        <Image
                                            src={props?.widgetData?.data[3]?.image}
                                            alt="Video Thumbnail"
                                            crossorigin="anonymous"
                                            width={872}
                                            height={439}

                                        />
                                    )}
                                </div>
                            ) : (
                                <ReactPlayer
                                    url={props.widgetData.data[3].redirect_url}
                                    controls={true}
                                    width={872}
                                    height={440}
                                    playing={true}
                                    className={styles.video__story}
                                />
                            )}



                        </Col>
                        <Col lg={4} className='d-lg-block d-none'>
                            <div className={`${styles.workshopBoxes}`} style={{ background: props.widgetData.data[4].card_1_color }}>
                                <Image width={133} height={133} src={props.widgetData.data[4].image} />
                                <h2 style={{ color: props.widgetData.data[4].card_1_inner_color }} >{props.widgetData.data[4].heading}</h2>
                                <p style={{ color: props.widgetData.data[4].card_1_inner_color }}>{props.widgetData.data[4].description}</p>
                            </div>
                        </Col>
                    </Row>
                </div>

            </Container>
        </>
    )
}

export default WorkshopsAction; 