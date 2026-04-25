import React from 'react'
import styles from './overLooking.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import StatsOverlooking from './statsOverlooking/StatsOverlooking';

const OverLooking = (props) => {
    return (
        <section className={`${styles.overLooking} overLooking`}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center'>
                    <Col lg={12}>
                        <h1 className={styles.overLookingHead}> {props?.widgetData?.heading} </h1>
                        <StatsOverlooking widgetData = {props} />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default OverLooking;
