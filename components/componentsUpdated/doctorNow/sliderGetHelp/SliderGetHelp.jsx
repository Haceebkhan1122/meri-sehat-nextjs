import React, { useState, useEffect } from 'react'
import styles from './sliderGetHelp.module.scss';
import Slider from 'react-slick';
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';
import arrowImg from '/public/svg/newPages/arrowBtnReduce.svg';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Router from 'next/router';

const SliderGetHelp = (props) => {

    const [sliderSettings, setSliderSettings] = useState({
        dots: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        // centerMode: true,
        centerPadding: '0',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '40px',
                    infinite: true,
                    draggable: true,
                    swipe: true,
                },
            },
        ],
    });

    useEffect(() => {
        // Target specific page by checking the URL path
        if (window.location.pathname == '/download') {
            setSliderSettings((prevSettings) => ({
                ...prevSettings,
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToScroll: 1,
                            slidesToShow: 1,
                            centerMode: true,
                            centerPadding: '0px',
                            infinite: false,
                            draggable: false,
                            swipe: false,
                        },
                    },
                ],
            }));
        }
    }, []);

    const handleRedirect = () => {
        Cookies.set("redirectionUrl", "subscribed-user");
        Router.push("/subscribed-user")
    }

    return (
        <Container className='p-0'>
            <Row className=''>
                <Col lg={12} className='mx-auto'>
                    <div className={`${styles.wrape__slidergetHelp} wrape__slidergetHelp`}>
                        <Slider {...sliderSettings}>
                            {
                                props?.widgetData?.data?.map((item) => {
                                    return (<>
                                        <div onClick={handleRedirect}>
                                            <div className={`${styles.slide_doc_help} slide_doc_help`}>
                                                <div className={`${styles.doctorCardHelp} doctorCardHelp`}>
                                                    <Image src={item?.image} width={303.821} height={370} alt="" className={styles.doctorCardHelpImg} />
                                                    {props.page == "sehat" && <Image src={arrowImg} alt='' className={`${styles.arrow_svg} img-fluid`} />}
                                                </div>
                                                <span> {item?.heading} </span>
                                                <p>{item?.description}</p>
                                            </div>
                                        </div>
                                    </>)
                                })
                            }
                        </Slider>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default SliderGetHelp;
