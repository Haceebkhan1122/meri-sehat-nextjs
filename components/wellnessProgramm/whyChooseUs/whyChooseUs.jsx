import React, { useEffect, useState } from 'react'
import { Col, Row } from "react-bootstrap";
import whyChoose from "../../../public/svg/imagenew1.svg";
import { Progress } from 'antd';
import Image from 'next/image';

function whyChooseUs({ corporateData }) {
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
        <div className='whyChoose mt100 pb100'>
            <Row>
                <Col lg={6}>
                    <img src={widgets[1]?.data[0]?.image} className='img-fluid image_chosing_us' />
                </Col>
                <Col lg={6} className='my-auto'>
                    <div className='pl65'>
                        <h2>{widgets[1]?.heading}</h2>
                        <div className='d-flex align-items-center mb-4 boxPerc mt-5 box1 mb4'>
                            <div className='boxPercentage '>
                                {widgets[1]?.data[0]?.card_1_head}%
                            </div>
                            <div className='boxProgress'>
                                <h3>{widgets[1]?.data[0].card_1_desc}</h3>
                                <Progress percent={60} />
                            </div>
                        </div>
                        <div className='d-flex align-items-center mb-4 boxPerc box2 mb4'>
                            <div className='boxPercentage '>
                            {widgets[1]?.data[0]?.card_2_head}%
                            </div>
                            <div className='boxProgress'>
                                <h3>{widgets[1]?.data[0]?.card_2_desc}</h3>
                                <Progress percent={80} />
                            </div>
                        </div>
                        <div className='d-flex align-items-center mb-4 boxPerc box3 mb4'>
                            <div className='boxPercentage '>
                            {widgets[1]?.data[0]?.card_3_head}%
                            </div>
                            <div className='boxProgress'>
                                <h3>{widgets[1]?.data[0]?.card_3_desc}</h3>
                                <Progress percent={70} />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default whyChooseUs