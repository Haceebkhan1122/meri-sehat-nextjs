import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import Image from 'next/image';
import ic01 from '../../../public/svg/ic01.svg'
import ic02 from '../../../public/svg/ic02.svg'
import ic03 from '../../../public/svg/ic03.svg'
import ic04 from '../../../public/svg/ic04.svg'
import ic05 from '../../../public/svg/ic05.svg'
import ic06 from '../../../public/svg/ic06.svg'

function WhatWeProvide({ corporateData }) {

    const [widgets, setWidgets] = useState([])

    useEffect(() => {
        if (corporateData) {
            let widjets = corporateData.widgets.map((item) => {
                return item;
            })
            setWidgets(widjets)
        }
    }, [])


    return (
        <div className='serviceWeProvide mt100'>
            <Row>
                <Col lg={12} className='text-center'>
                    <h2 className='mb-4'>{widgets[3]?.heading}</h2>
                </Col>
                <Col lg={2} xs={6} className='text-center'>
                    <div className='boxImage'>
                        <img src={widgets[3]?.data[0]?.image} className='img-fluid' />
                    </div>
                    <h5>{widgets[3]?.data[0]?.heading}</h5>
                </Col>
                <Col lg={2} xs={6} className='text-center'>
                    <div className='boxImage'>
                        <img src={widgets[3]?.data[1]?.image} className='img-fluid' />
                    </div>
                    <h5>{widgets[3]?.data[1]?.heading}</h5>
                </Col>
                <Col lg={2} xs={6} className='text-center'>
                    <div className='boxImage'>
                        <img src={widgets[3]?.data[2]?.image} className='img-fluid' />
                    </div>
                    <h5>{widgets[3]?.data[2]?.heading}</h5>
                </Col>
                <Col lg={2} xs={6} className='text-center'>
                    <div className='boxImage'>
                        <img src={widgets[3]?.data[3]?.image} className='img-fluid' />
                    </div>
                    <h5>{widgets[3]?.data[3]?.heading}</h5>
                </Col>
                <Col lg={2} xs={6} className='text-center'>
                    <div className='boxImage'>
                        <img src={widgets[3]?.data[4]?.image} className='img-fluid' />
                    </div>
                    <h5>{widgets[3]?.data[4]?.heading}</h5>
                </Col>
                <Col lg={2} xs={6} className='text-center'>
                    <div className='boxImage'>
                        <img src={widgets[3]?.data[5]?.image} className='img-fluid' />
                    </div>
                    <h5>{widgets[3]?.data[5]?.heading}</h5>
                </Col>
            </Row>
        </div>
    )
}

export default WhatWeProvide;