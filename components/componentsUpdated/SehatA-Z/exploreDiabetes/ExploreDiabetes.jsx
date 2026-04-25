import React from 'react'
import styles from './exploreDiabetes.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import SingleCardExplore from './singleCardExplore/SingleCardExplore';

const ExploreDiabetes = () => {
    const cards = [1, 2, 3, 4, 5, 6];

    return (
        <section className={`${styles.exploreDiabetesSec} exploreDiabetesSec`}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center'>
                    <h1> Explore Diabetes </h1>
                    <Col lg={12}>
                        <Row className=''>
                            {cards.map((item) => {
                                return (<>
                                    <Col lg={6}>
                                        <SingleCardExplore />
                                    </Col>
                                </>)
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ExploreDiabetes;
