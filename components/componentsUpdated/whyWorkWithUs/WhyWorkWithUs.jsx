
import { Col, Container, Row } from 'react-bootstrap'
import styles from "./whyWorkWithUs.module.scss"
import cim1 from "../../../public/svg/newPages/cim1.svg";
import cim2 from "../../../public/svg/newPages/cim2.svg";
import cim3 from "../../../public/svg/newPages/cim3.svg";
import Image from 'next/image';
import React, { useState } from "react";
import Slider from "react-slick";
function WhyWorkWithUs(props) {

    const [current, setCurrent] = useState(0);
    const slides = [
        {
            id: 1,
            heading: "Innovative Technology",
            content: "We work on cutting edge Artificial Intelligence Transdermal Imaging technology",
            image1: cim1,
            image2: cim2,
            image3: cim3,
        },
        {
            id: 2,
            heading: "Innovative Technology",
            content: "We work on cutting edge Artificial Intelligence Transdermal  Imaging technology",
            image1: cim1,
            image2: cim2,
            image3: cim3,

        },
        {
            id: 3,
            heading: "Innovative Technology",
            content: "We work on cutting edge Artificial Intelligence Transdermal  Imaging technology",
            image1: cim1,
            image2: cim2,
            image3: cim3,

        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        arrow: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (index) => setCurrent(index),
        responsive: [
            {
                breakpoint: 600, // for mobile
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    return (
        <div className={`${styles.sliderBox} sliderCareer`}>
            <Container>
                <Row>
                    <Col lg={10} className='mx-auto'>
                        <h2 className='text-center mb-5'>Why work with us</h2>
                        <div className="sliderWhyWork">
                            <Slider {...settings}>
                                {slides.map((slide) => (
                                    <div key={slide.id}>
                                        <div className='d-flex boxImages'>
                                            <Image src={slide.image1} className='img-fluid img1'></Image>
                                            <Image src={slide.image2} className='img-fluid  '></Image>
                                            <Image src={slide.image3} className='img-fluid img1'></Image>
                                        </div>
                                        <h3>{slide.heading}</h3>
                                        <p>{slide.content}</p>
                                    </div>
                                ))}
                            </Slider>

                            {/* 👇 yahan text show kareinge */}
                            <p className='total'>
                                {current + 1}/{slides.length}
                            </p>
                        </div>

                    </Col>

                </Row>
            </Container>

        </div>
    )
}

export default WhyWorkWithUs
