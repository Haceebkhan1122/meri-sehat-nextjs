import React from 'react'
import styles from './healthArticles.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import SliderHealthArticles from '../healthArticlesSlider/HealthArticlesSlider';

const HealthArticles = (props) => {

    return (
        <>
        <section className={`${styles.healthArticles} healthArticles`}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center gx-0'>
                    <h1> {props?.widgetData?.heading} </h1>
                    <Col lg={12}>
                        <SliderHealthArticles props={props} />
                    </Col>
                </Row>
            </Container>
        </section>
        </>
    )
}

export default HealthArticles;
