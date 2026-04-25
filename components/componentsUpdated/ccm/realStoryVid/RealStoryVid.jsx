import React, { useState } from 'react'
import styles from './realStoryVid.module.scss';
import {Container, Row, Col} from 'react-bootstrap'
import ReactPlayer from 'react-player';
import Image from 'next/image';

const RealStoryVid = (props) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const handleThumbnailClick = () => {
        setIsVideoPlaying(true);
    };

    return (
        <section className={`${styles.realStoryVid} realStoryVid`} style={{ background: props?.widgetData?.data?.[0]?.card_1_color }}>
        <Container className='h-100'>
            <Row className='h-100 justify-content-center'>
                <Col lg={12}>
                    <h1> {props?.widgetData?.heading}</h1>
                        {!isVideoPlaying ? (
                            <div onClick={handleThumbnailClick} className={"video__story_thumb video__story_thumbccm"} style={{ overflow: "hidden" }} >
                                {props?.widgetData?.data[0]?.image && (
                                    <Image
                                        src={props?.widgetData?.data[0]?.image}
                                        alt="Video Thumbnail"
                                        crossorigin="anonymous"
                                        width={648}
                                        height={330}
                                    />
                                )}
                                <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="199.984px" viewBox="0 0 50 50" fill="none" className='svg_thumb'>
                                    <path d="M19.8559 34.1042L34.2592 24.8449L19.8559 15.5857V34.1042ZM25 45.4211C22.1536 45.4211 19.4787 44.881 16.9753 43.8007C14.4718 42.7205 12.2942 41.2544 10.4423 39.4026C8.59049 37.5507 7.12445 35.3731 6.0442 32.8696C4.96395 30.3662 4.42383 27.6913 4.42383 24.8449C4.42383 21.9986 4.96395 19.3237 6.0442 16.8203C7.12445 14.3168 8.59049 12.1392 10.4423 10.2873C12.2942 8.43548 14.4718 6.96943 16.9753 5.88918C19.4787 4.80894 22.1536 4.26881 25 4.26881C27.8463 4.26881 30.5212 4.80894 33.0246 5.88918C35.5281 6.96943 37.7057 8.43548 39.5576 10.2873C41.4094 12.1392 42.8755 14.3168 43.9557 16.8203C45.036 19.3237 45.5761 21.9986 45.5761 24.8449C45.5761 27.6913 45.036 30.3662 43.9557 32.8696C42.8755 35.3731 41.4094 37.5507 39.5576 39.4026C37.7057 41.2544 35.5281 42.7205 33.0246 43.8007C30.5212 44.881 27.8463 45.4211 25 45.4211ZM25 41.3058C29.5953 41.3058 33.4876 39.7112 36.6769 36.5219C39.8662 33.3326 41.4609 29.4403 41.4609 24.8449C41.4609 20.2496 39.8662 16.3573 36.6769 13.168C33.4876 9.97869 29.5953 8.38404 25 8.38404C20.4046 8.38404 16.5123 9.97869 13.323 13.168C10.1337 16.3573 8.53905 20.2496 8.53905 24.8449C8.53905 29.4403 10.1337 33.3326 13.323 36.5219C16.5123 39.7112 20.4046 41.3058 25 41.3058Z" fill="white" fill-opacity="0.7" />
                                </svg>
                            </div>
                        ) : (
                            <ReactPlayer
                                url={props?.widgetData?.data[0]?.redirect_url}
                                controls={true}
                                width={636}
                                height={330}
                                playing={true}
                                className={styles.video__story}
                            />
                        )}
                </Col>
            </Row>
        </Container>
    </section>
    )
}

export default RealStoryVid
