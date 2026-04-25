import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { Col, Container, Row } from "react-bootstrap";
import Image from 'next/image';
import slid01 from '../../../public/svg/slid01.svg';
import slid02 from '../../../public/svg/slid02.svg';
import slid03 from '../../../public/svg/slid03.svg';
import slid04 from '../../../public/svg/slid04.svg';

function Statistics({corporateData}) {
    const [widgets, setWidgets] = useState([])
    const [widgetsData, setWidgetsData] = useState([])
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

    useEffect(() => {
        if (corporateData) {
            let widjets = corporateData.widgets.map((item) => {
                return item;
            })
            let widjetsData = widjets[4].data.map((item) => {
                return item;
            })
            setWidgets(widjets)
            setWidgetsData(widjetsData)
        }
    }, [])

    useEffect(() => {
        setNav1(sliderRef1.current);
        setNav2(sliderRef2.current);
    }, []);

    const settingsNav1 = {
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        focusOnSelect: true,
        asNavFor: nav2,
        dots: true,
        arrows: false
    };

    const settingsNav2 = {
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        focusOnSelect: true,
        asNavFor: nav1,
        rows: 1,
    };

    return (
        <div className="slider-container mainsliderAsnav mt100">
            <Row>
                <Col lg={12}>
                    <h2 className="text-center mb-4">{widgets[4]?.heading}</h2>
                </Col>
                <Col md={6} className="navSlide pe-0 or2">
                    <Slider {...settingsNav2} ref={sliderRef2}>
                        {widgetsData?.map((item) => {
                            return (<>
                                <div className="mainSlide">
                                    <div className="mainSlideBox">
                                        <div>
                                            <h3>{item.heading}</h3>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </>)
                        })}
                    </Slider>
                </Col>
                <Col md={6} className="sliderTwo or1">
                    <Slider {...settingsNav1} ref={sliderRef1}>
                        <div className="mainSlider">
                            <img src={widgets[4]?.data[0]?.image} className='img-fluid' />
                        </div>
                        <div className="mainSlider">
                            <img src={widgets[4]?.data[1]?.image} className='img-fluid' />
                        </div>
                        <div className="mainSlider">
                            <img src={widgets[4]?.data[2]?.image} className='img-fluid' />
                        </div>
                        <div className="mainSlider">
                            <img src={widgets[4]?.data[3]?.image} className='img-fluid' />
                        </div>
                    </Slider>
                </Col>
            </Row>
        </div>
    );
}

export default Statistics;
