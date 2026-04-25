import React from 'react'
import styles from '../videoSection/videoSection.module.scss'
import { Container, Row, Col } from "react-bootstrap";
function VideoSection() {
    return (
        <section className={`${styles.videoSection} videoSectionPricing  pt-80`}>
            <Container>
                <Row>
                    <Col md={12} className='mx-auto'>
                        <h2 className='text-center'>How does this work?</h2>
                        <div className={`${styles.videoBox} videoBoxPricing  `}>
                            <iframe src="https://www.youtube.com/embed/PbNBrEnYnjM?si=sQWhdEx1pvQkHcA9" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default VideoSection