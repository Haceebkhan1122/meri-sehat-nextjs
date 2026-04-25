import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import amb01 from "../../../../public/svg/newPages/amb01.svg"
import Image from 'next/image';

import styles from "./whatwedo.module.scss"
const WhatWeDo = (props) => {
    return (
        <>
            <section className={`${styles.whatwedo}`}>
                <Container>
                    <Row>
                        <Col lg={5}>
                            <h2>{props?.widgetData?.data[0]?.heading}  </h2>
                            <p>{props?.widgetData?.data[0]?.description}     </p>
                            <div className='d-lg-none d-block'>
                                <div className={`${styles.imageBox}`}>
                                    <Image src={amb01} alt="amb01" className='image' />
                                    <div className={`${styles.imageText}`}>100% secure & protected</div>
                                </div>
                            </div>
                            <ul className=''>
                                {props?.widgetData?.data?.slice(1)?.map((item) =>

                                    <li><span></span>{item?.heading}

                                    </li>

                                )}

                            </ul>
                        </Col>
                        <Col lg={2}></Col>
                        <Col lg={5} className='d-lg-block d-none'>
                            <div className={`${styles.imageBox}`}>
                                <Image src={props?.widgetData?.data[0]?.image} width="560" height="716" alt="amb01" className='image' />
                                {/* <div className={`${styles.imageText}`}>100% secure & protected</div> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )

}

export default WhatWeDo