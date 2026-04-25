import React, { useEffect } from 'react'
import styles from './storiesLove.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import ReactPlayer from 'react-player'
import Image from 'next/image';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import closeBtn from '../../../../public/svg/close-icon.svg'
import Slider from "react-slick";

const StoriesLove = (props) => {

    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1.075,
                    slidesToScroll: 2,
                    initialSlide: 1,
                    autoplay: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: false,
                    infinite: true,
                    centerMode: true,
                    centerPadding: "30px",
                }
            }
        ]
    };
    const [show, setShow] = useState(false);
    const [currentModalVideo, setCurrentModalVideo] = useState(null);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = (video) => {
        setCurrentModalVideo(video)
        setShow(true);
    }


    return (
        <section className={`${styles.storiesLove} ${props?.widgetData?.slug == "at-home" && "mt-0"}  storiesLove `} style={{ backgroundColor: props?.widgetData?.slug == "at-home" ? null : props?.widgetData?.data?.[0]?.card_1_color }}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center gx-0'>
                    <h1>{props?.widgetData?.heading}</h1>
                    <Col lg={12}>
                        <Row className=''>
                            <div className='slider-container01'>
                                <Slider {...settings} className={styles.slider_container01}>
                                    {props?.widgetData?.data?.map((item) => {
                                        return (
                                            <Col lg={3} data-aos="fade-right" data-aos-duration="3000">
                                                <div className={`${styles.singleStory} storySpacing`}>
                                                    <div className={styles.infoStory}>
                                                        <h2>{item?.heading}</h2>
                                                        <h4>{item?.description}</h4>
                                                    </div>
                                                    <Image src={item?.image || ""} alt="Video Stories" width={312} height={560} className={styles.video__story} />
                                                    {props?.widgetData?.slug !== "corporate-wellness-v3" && <span className={styles.playBtn} onClick={() => props?.widgetData?.slug !== "corporate-wellness-v3" && handleShow(item?.redirect_url)}>  </span>}
                                                </div>
                                            </Col>
                                        )
                                    })}
                                </Slider>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} centered onHide={() => handleClose()} className={`${styles.wraperModal_videoStoryLove} wraperModal_videoStoryLove`}>
                <Modal.Body>
                    <div className={`${styles.wraper__modal} p-relative`}>
                        <Image className={`${styles.closeBtn}`} src={closeBtn} alt="labImage" width={25} height={25} onClick={handleClose} />
                        <ReactPlayer controls={true} url={currentModalVideo} className={styles.video__story} />
                    </div>
                </Modal.Body>
            </Modal>
        </section>
    )
}

export default StoriesLove;
