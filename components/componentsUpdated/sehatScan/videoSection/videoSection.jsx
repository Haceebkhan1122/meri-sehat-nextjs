import React, { useState } from 'react';
import styles from '../videoSection/videoSection.module.scss'
import { Container, Row, Col } from "react-bootstrap";
import ReactPlayer from 'react-player'

function videoSection(props) {
    const [currentVideo, setCurrentVideo] = useState(props?.widgetData?.data?.[0]?.redirect_url);

    const handleThumbnailClick = (videoUrl) => {
        setCurrentVideo(videoUrl);
    };

    return (
        <>
            <section data-aos="fade-up" data-aos-duration="3000" className={`${styles.videoSectionSehatScan} SehatScanvideo pt-80 pb-80`}>
                <Container>
                    <Row>
                        <Col md={12} className='mx-auto'>
                            <h2 className='mb-5 text-center'>{props?.widgetData?.heading}</h2>
                            <div className={styles.videoBox}>
                                <ReactPlayer controls={true} playing={false} url={currentVideo} className={`${styles.ifameplayBox} ifameplayBox`} height={775} />
                            </div>
                            <Row className="hk_remain_videos">
                                {props?.widgetData?.data?.map((video, index) => (
                                    <Col lg="4" xs={4} key={index}>
                                        <div className={`${styles.thumbnailVideo}`} onClick={() => handleThumbnailClick(video?.redirect_url)}>
                                            {currentVideo == video?.redirect_url && (
                                                <div className={styles.nowPlaying}>Now Playing</div>
                                            )}
                                            {currentVideo !== video?.redirect_url && (
                                                <div className={styles.playicon}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="106" height="106" viewBox="0 0 106 106" fill="none">
                                                        <g filter="url(#filter0_b_151_124235)">
                                                            <path d="M52.9992 8.83337C28.6192 8.83337 8.83252 28.62 8.83252 53C8.83252 77.38 28.6192 97.1667 52.9992 97.1667C77.3792 97.1667 97.1658 77.38 97.1658 53C97.1658 28.62 77.3792 8.83337 52.9992 8.83337Z" fill="#0F345A" fill-opacity="0.4" />
                                                        </g>
                                                        <path d="M44.1655 37.5409V68.4576C44.1655 70.2684 46.2414 71.3284 47.6989 70.2242L68.3247 54.7659C69.5172 53.8826 69.5172 52.1159 68.3247 51.2326L47.6989 35.7742C46.2414 34.6701 44.1655 35.7301 44.1655 37.5409Z" fill="white" />
                                                        <defs>
                                                            <filter id="filter0_b_151_124235" x="-20.0569" y="-20.056" width="146.112" height="146.112" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="14.4447" />
                                                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_151_124235" />
                                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_151_124235" result="shape" />
                                                            </filter>
                                                        </defs>
                                                    </svg>
                                                </div>

                                            )}
                                            <img src={video.image} alt={`Video`} width="100%" height="100%" className={`${styles.imgthumbnail} img-fluid `} />
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                          
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default videoSection