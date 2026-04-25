
import team from "../../../public/png/team.png";
import Image from 'next/image';
import parse from 'html-react-parser';
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';

import styles from "./cultureCollaboration.module.scss"
const CultureCollaboration = (props) => {
    return (
        <>
            <div className={styles.cultureCol}>
                <Container>
                    <Row>
                        <Col lg={12} className='text-center'>
                            <h2>{props?.widgetData?.heading}  </h2>
                            <p>{props?.widgetData?.description && parse(props?.widgetData?.description)}     </p>
                            <Link className={styles.btnRoles} href="#open-position">{props?.widgetData?.data[0]?.button_text}</Link>
                        </Col>
                    </Row>
                </Container>
                <Image src={props?.widgetData?.data[0]?.image} className='img-fluid' width={2600} height={2600}></Image>
            </div>
        </>
    )

}

export default CultureCollaboration
