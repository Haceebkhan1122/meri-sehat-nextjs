import React from 'react'
import styles from './doctorsRecommendCards.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import Slider from "react-slick";
import useMediaQuery from '@mui/material/useMediaQuery';

const DoctorsRecommendCards = ({ recommendedDoctors }) => {
    const isMobile = useMediaQuery('(max-width:768px)');

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2.2,
        slidesToScroll: 1,
        autoplay: true,
        arrow: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2.1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <section className={`${styles.doctorsRecommendCards} doctorsRecommendBox `}>
            <Container className='p-0'>
                <Row>
                    <Col lg={12}>
                        <h1> <span className={styles.starSvg}></span> Our recommended doctors </h1>
                        {isMobile
                            ?
                            <>
                                <Slider {...settings} className={`${styles.wrapeCards} sliderRD`}>

                                    {recommendedDoctors?.map((doctors) => {
                                        return (
                                            <>
                                                <div className={styles.doc_card_caring}>
                                                    <Link href={doctors?.redirect_url || ''}>
                                                        <div className={`${styles.rateWraper} rateWraper`}>
                                                            <span className={styles.rateTe}> {doctors?.average_rating}</span>
                                                            <span className={styles.starSvg}></span>
                                                        </div>
                                                        <img src={doctors?.image} width={312} height={424} alt={`text_`} className={`${styles.single_doc_svg} img-fluid`} />
                                                        <div className={`${styles.infoWrape} infoWrape`}>
                                                            <h2> Dr. {doctors?.name} </h2>
                                                            <p> {doctors?.specialities?.[0]} </p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </>
                                        )
                                    })}

                                </Slider>
                            </>
                            :
                            <>
                                <div className={`${styles.wrapeCards}`} >
                                    {recommendedDoctors?.map((doctors) => {
                                        return (
                                            <>
                                                <div className={styles.doc_card_caring}>
                                                    <Link href={doctors?.redirect_url || ''}>
                                                        <div className={`${styles.rateWraper} rateWraper`}>
                                                            <span className={styles.rateTe}> {doctors?.average_rating}</span>
                                                            <span className={styles.starSvg}></span>
                                                        </div>
                                                        <img src={doctors?.image} width={312} height={424} alt={`text_`} className={`${styles.single_doc_svg} img-fluid`} />
                                                        <div className={`${styles.infoWrape} infoWrape`}>
                                                            <h2> Dr. {doctors?.name} </h2>
                                                            <p> {doctors?.specialities?.[0]} </p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>

                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default DoctorsRecommendCards
