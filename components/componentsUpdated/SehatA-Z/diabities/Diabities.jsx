import React, { useState } from 'react'
import styles from './diabities.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import playIcon from '../../../../public/svg/newPages/playIcon.svg'
import ReactPlayer from 'react-player';
import Image from 'next/image';

const DiabitiesSehat = () => {
    const [currentVideo, setCurrentVideo] = useState("https://www.youtube.com/embed/FaH6KvspXJ0?autoplay=1&mute=0&controls=1&origin=https%3A%2F%2Fpre.merisehat.pk&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=7");

    const videos = [
        {
            url: 'https://www.youtube.com/embed/FaH6KvspXJ0?autoplay=1&mute=0&controls=1&origin=https%3A%2F%2Fpre.merisehat.pk&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=7',
            thumbnail: 'https://img.youtube.com/vi/FaH6KvspXJ0/0.jpg'
        },

        {
            url: 'https://www.youtube.com/embed/5rNsS14iVWk?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fpre.merisehat.pk&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=9',
            thumbnail: 'https://img.youtube.com/vi/5rNsS14iVWk/0.jpg'
        },

        {
            url: 'https://www.youtube.com/embed/ckIwADH38w8?autoplay=0&mute=0&controls=0&origin=https%3A%2F%2Fpre.merisehat.pk&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=11',
            thumbnail: 'https://img.youtube.com/vi/ckIwADH38w8/0.jpg'
        },
    ];

    const handleThumbnailClick = (videoUrl) => {
        const autoplayUrl = `${videoUrl}?autoplay=1&mute=0&controls=1&origin=https%3A%2F%2Fpre.merisehat.pk&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=7`;
        setCurrentVideo(autoplayUrl);
    };

    return (
        <section className={`${styles.diabitiesSehat} diabitiesSehat`}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center'>
                    <Col lg={12} className='h-100'>
                        <Row className=''>
                            <Col lg={4}>
                            <div className={styles.wrap_info}>
                                <h1> What is Diabetes? </h1>
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.  </span>
                            </div>
                            </Col>
                            <Col lg={7}>
                                <div className={`${styles.videoDiabities} videoDiabities`}>
                                    <ReactPlayer url={currentVideo} className={`${styles.videoVido} videoVido`} />
                                </div>
                            </Col>
                            <Col lg={1}>
                                <div className={styles.collageVideo}>
                                    {videos.map((video, index) => (
                                        <Col lg="4" key={index}>
                                            <div className={currentVideo.includes(video.url) ? `${styles.singleColl} ${styles.activeVid}` : styles.singleColl } onClick={() => handleThumbnailClick(video.url)}>
                                                {!currentVideo.includes(video.url) && <Image src={playIcon} className={`${styles.imgplayIcon} img-fluid `}></Image>}
                                                <img src={video.thumbnail} alt={`Thumbnail ${index + 1}`} className={`${styles.singleVidImg} img-fluid`} />
                                            </div>
                                        </Col>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default DiabitiesSehat;
