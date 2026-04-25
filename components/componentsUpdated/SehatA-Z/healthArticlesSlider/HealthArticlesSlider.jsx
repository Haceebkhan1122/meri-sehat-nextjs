import React from 'react'
import styles from './healthArticlesSlider.module.scss';
import Slider from 'react-slick';
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';

const SliderHealthArticles = ({ props }) => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        // centerMode: true,
        centerPadding: '0px',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '22px',
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    centerPadding: '0px',
                    infinite: true,
                    dots: false,
                }
            },
        ]
    };

    return (
        <Container className='p-0'>
            <Row className='gx-0'>
                <Col lg={12} className='mx-auto'>
                    <div className={`${styles.wrape_sliderHealthArticles} wrape_sliderHealthArticles`}>
                        <Slider {...settings}>
                            {props?.widgetData?.data?.map((items) => (
                                <div className='sliderHealth'>
                                    <Link href={items?.data?.redirect_url || ''}>
                                        <div className={`${styles.slide_doc_sehat} slide_doc_sehat`}>
                                            <div className={`${styles.doctorCardHelp} doctorCardHelp`}>
                                                <Image width={424} height={260} src={items?.data?.image} alt="" className={styles.doctorCardHelpImg} />
                                                <div className={styles.round}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                                                        <path d="M25.0007 32.2923L22.6257 29.959L30.2923 22.2923H3.33398V18.959H30.2923L22.6673 11.2923L25.0007 8.95898L36.6673 20.6257L25.0007 32.2923Z" fill="white" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className={styles.bottom_info_health}>
                                                <span> {items?.data?.label?.value} </span>
                                                <h3>{items?.data?.name} </h3>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}

                        </Slider>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default SliderHealthArticles;
