import React from 'react'
import styles from './pathBetter.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { isMobile } from "react-device-detect";

const PathBetter = ({widgetData}) => {
    const router = useRouter();
    return (
        <section className={`${styles.pathBetterWraper} pathBetterWraper`}>
            <Container>
                <Row className='justify-content-center'>
                    <Col lg={12}>
                        <div className={styles.rowinggg} style={{background: widgetData?.data?.[1]?.card_1_color}}>
                            <Col lg={8} xs={7}>
                                <h2> {widgetData?.data[1]?.heading}  </h2>
                                <p> {widgetData?.data[1]?.description} </p>
                            </Col>
                            <Col lg={4} xs={4}>
                                <div className={styles.consult_btn}>
                                    <button onClick={()=>  router.push(`${widgetData?.data?.[1]?.redirect_url}`)}> {widgetData?.data[1]?.button_text} </button>
                                    {!isMobile && <span className={styles.arrow_bt}></span>}
                                </div>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default PathBetter
