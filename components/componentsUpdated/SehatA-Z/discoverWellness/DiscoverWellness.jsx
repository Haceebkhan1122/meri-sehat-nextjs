import React from 'react'
import styles from './discoverWellness.module.scss';
import SliderGetHelp from '../../doctorNow/sliderGetHelp/SliderGetHelp';
import { Col, Container, Row } from 'react-bootstrap';

const DiscoverWellness = () => {
    return (
        <section className={`${styles.discoverWellness} discoverWellness`}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center gx-0'>
                    <Col lg={10}>
                        <h1> Discover wellness </h1>
                        <SliderGetHelp page="sehat" />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default DiscoverWellness;
