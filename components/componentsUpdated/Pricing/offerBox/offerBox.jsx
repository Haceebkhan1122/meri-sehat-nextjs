
import React from 'react'
import styles from './offerBox.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import LimitedOfferBox from '../../SehatA-Z/limitedOfferBox/limitedOfferBox';
function offerBox({ imageRight }) {
    return (
        <section className={`${offerBox} offerBoxPricing`}>
            <Container>
                <Row>
                    <Col md={12} className='mx-auto'>
                        <Row>
                            <Col md={6}>
                                <LimitedOfferBox imageRight={imageRight} />
                                ddd
                            </Col>
                            <Col md={6}>
                                <LimitedOfferBox imageRight={imageRight} />

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default offerBox