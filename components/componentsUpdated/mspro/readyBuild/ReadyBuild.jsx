import React from 'react'
import styles from './readyBuild.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import rightImm from '/public/png/new-images/img_right_rr.png';

const ReadyBuild = (props) => {
    return (
        <section className={`${styles.readyBuild}  readyBuild`}>
            <div className={`${styles.sec__con} sec__con`} style={{background : props?.widgetData?.data?.[0]?.card_1_inner_color}}>  </div>
                <Container className='h-100'>
                    <Row className='h-100 justify-content-center'>
                        <Col lg={12}>
                            <h1 className={styles.head_read}> {props?.widgetData?.heading} </h1>
                            <Row className={`h-100 justify-content-center gx-0 ${styles.ro_reahccc}`}>
                                <Col lg={6}>
                                    <div className={styles.left_sec}>
                                        <ul>
                                            {props?.widgetData?.data?.slice(1)?.map((item) => {
                                                return (<>
                                                    <li> {item?.heading} </li>
                                                </>)
                                            })}
                                        </ul>
                                        <button style={{ background: props?.widgetData?.data?.[0]?.card_1_color }} > {props?.widgetData?.data?.[0]?.button_text} </button>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className={styles.right_sec} style={{ background: props?.widgetData?.data?.[1]?.card_1_color }}>
                                        <Image src={props?.widgetData?.data?.[0]?.image} width={566} height={743} alt='' className={`${styles.img_right_ready} img-fluid`} />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
        </section>
    )
}

export default ReadyBuild;
