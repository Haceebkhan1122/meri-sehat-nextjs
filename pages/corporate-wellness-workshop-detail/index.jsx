import React from 'react'
import styles from "./corporate-wellness-workshop-detail.module.scss"

import { Container, Row, Col } from "react-bootstrap";
import LeftBox from '../../components/componentsUpdated/corporate-wellness-workshop-detail/leftBox/LeftBox';
import RightBox from '../../components/componentsUpdated/corporate-wellness-workshop-detail/rightBox/RightBox';

import SliderFooter from '../../components/componentsUpdated/doctorNow/sliderFooter/SliderFooter'
export default function index() {
    return (
        <>
            <section className={`${styles.mainListingSec}  wellnessWorkshoDetail`}>
                <div className={`${styles.boxmobilehead} d-flex d-lg-none bg-white`}>
                    <div className={`${styles.backBtn}`}>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24" fill="none">
                                <g clip-path="url(#clip0_8672_36684)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.9283 11H10.2348L16.9794 5.4L15.2932 4L5.6582 12L15.2932 20L16.9794 18.6L10.2348 13H24.9283V11Z" fill="#0F345A" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_8672_36684">
                                        <rect width="28.9051" height="24" fill="white" transform="translate(0.839844)" />
                                    </clipPath>
                                </defs>
                            </svg> Workshops</p>
                    </div>
                </div>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className={`${styles.backBtn} d-none d-lg-flex`}>
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24" fill="none">
                                        <g clip-path="url(#clip0_8672_36684)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.9283 11H10.2348L16.9794 5.4L15.2932 4L5.6582 12L15.2932 20L16.9794 18.6L10.2348 13H24.9283V11Z" fill="#0F345A" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_8672_36684">
                                                <rect width="28.9051" height="24" fill="white" transform="translate(0.839844)" />
                                            </clipPath>
                                        </defs>
                                    </svg> Workshops</p>
                            </div>
                        </Col>
                        <Col lg={7}>
                            <LeftBox />
                        </Col>
                        <Col lg={5}>
                            <RightBox />
                        </Col>

                    </Row>
                </Container>
            </section>
            <section className={`bg-white`}>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <SliderFooter />
                        </Col>
                    </Row>
                </Container>

            </section>
        </>
    )
}
