import React, { useEffect, useRef, useState } from 'react'
import styles from './ReduceDiabities.module.scss';
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image';
import Slider from 'react-slick';
import arrowImg from '/public/svg/newPages/arrowBtnReduce.svg';
import useMediaQuery from '@mui/material/useMediaQuery';
import parse from 'react-html-parser';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ReduceDiabities = (props) => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const isTablet = useMediaQuery('(min-width:769px) and (max-width:1024px)');
    const [activeLetter, setActiveLetter] = useState('Hypertension');
    const componentHeading = props?.widgetData?.data?.[0]?.heading || "";
    const router = useRouter()

    const indexImg = useRef(0);

    useEffect(() => {
        indexImg.current = 0;
    }, [])


    const settings = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        centerMode: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 2.1,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 2.1,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    centerMode: false,
                    centerPadding: "22px"
                }
            }
        ]
    };

    const handleChange = (item) => {
        let index = 0;
        setActiveLetter(item);
        if (item === "Diabetes") {
            index = 1;
        }
        else if (item === "Cholesterol") {
            index = 2;
        }
        else {
            index = 0;
        }
        // setIndexImg(index);
        indexImg.current = index;
    }


    return (
        <section className={`${styles.reduceDiabities} reduceDiabities`}>
            {(isMobile || isTablet) ?
                <Container className='h-100'>
                    <Row className='h-100 justify-content-center gx-0'>
                        <Col lg={12}>
                            <h2 className={styles.headReduce}> {props?.widgetData?.data?.[indexImg.current]?.heading && parse(props?.widgetData?.data?.[indexImg.current]?.heading)} </h2>
                            <div className={styles.chips}>
                                <ul>
                                    {props?.widgetData?.data?.map((item) => {
                                        let letter = item?.card_1_head;
                                        return (<>
                                            <li
                                                className={`${styles.wrape_single} ${activeLetter === letter ? styles.activeBrowse : ''}`}
                                                key={letter}
                                                onClick={() => { handleChange(letter) }}
                                            >
                                                <input
                                                    type="radio"
                                                    name="alphaCheck"
                                                    id={`alphaCheck_${letter}`}
                                                    checked={activeLetter === letter}
                                                />
                                                <label htmlFor={`alphaCheck_${letter}`}>
                                                    <span> {letter} </span>
                                                </label>
                                            </li>
                                        </>)
                                    })}
                                </ul>
                            </div>
                            <div className={styles.wrapeAllMobileSehat}>
                                <div className={styles.left__sec}>
                                    <div className={styles.wraper_img}>
                                        <Image width={648} height={790} src={props?.widgetData?.data?.[indexImg.current]?.image} alt='' className={`${styles.img_reduce} img-fluid`} />
                                        <div className={styles.info}>
                                            <h3>{props?.widgetData?.data?.[indexImg.current]?.description} </h3>

                                            {router.pathname == "/thrive" ? (
                                                <>
                                                    <Image src={arrowImg} width={88} height={88} alt='' className={`${styles.arrow_svg} img-fluid ee`} />
                                                </>
                                            ) : (
                                                <Image src={props?.widgetData?.data?.[0]?.card_6_icon} alt='' width={88} height={88} className={`${styles.arrow_svg} img-fluid re`} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.wrape_right_reduce}>
                                    <div className={`${styles.slider_reduce} slider_reduce`}>
                                        <Slider {...settings} className='slider_reduce'>
                                            {props?.widgetData?.data.slice(1).map((item, index) => {
                                                return (<>
                                                    <div className='mainSlidSpacing' key={index}>
                                                        <div className={styles.singleSlideReduce}>
                                                            <div className={styles.heading_star}>
                                                                <Image width={97} height={97} src={item?.card_2_icon} alt='' className={`${styles.img_reduce_slider} img-fluid`} />
                                                                <div className={styles.wrape_info_sl}>
                                                                    <h3> {item?.card_2_head} </h3>
                                                                    <h4> {item?.card_2_sub_head} </h4>
                                                                </div>
                                                            </div>
                                                            <p> {item?.card_2_desc}  </p>
                                                        </div>
                                                    </div>
                                                </>)
                                            })}
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                :
                <Container className='h-100'>
                    <Row className='h-100 justify-content-center gx-0'>
                        <Col lg={12}>
                            <Row className={`h-100 gx-0 justify-content-center`}>
                                <Col lg={6} className={`h-100 justify-content-center my-auto`}>
                                    <div className={styles.left__sec}>
                                        <div className={styles.wraper_img}>
                                            <Image width={648} height={790} src={props?.widgetData?.data?.[indexImg.current]?.image} alt='' className={`${styles.img_reduce} img-fluid`} />
                                            <Link href={props?.widgetData?.data?.[indexImg.current]?.redirect_url || ''}>
                                                <div className={styles.info}>
                                                    <h3>{props?.widgetData?.data?.[indexImg.current]?.description} </h3>
                                                    {router.pathname == "/thrive" && (
                                                        <>
                                                            <Image src={arrowImg} width={88} height={88} alt='' className={`${styles.arrow_svg} img-fluid`} />
                                                        </>
                                                    )}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6} className={`h-100`}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div className={styles.wrape_right_reduce}>
                        <h2 className={styles.headReduce}> {props?.widgetData?.data?.[indexImg.current]?.heading && parse(props?.widgetData?.data?.[indexImg.current]?.heading)} </h2>
                        <div className={styles.chips}>
                            <ul>
                                {props?.widgetData?.data?.map((item) => {
                                    let letter = item?.card_1_head;
                                    return (<>
                                        <li
                                            className={`${styles.wrape_single} ${activeLetter === letter ? styles.activeBrowse : ''}`}
                                            key={letter}
                                            onClick={() => { handleChange(letter) }}
                                        >
                                            <input
                                                type="radio"
                                                name="alphaCheck"
                                                id={`alphaCheck_${letter}`}
                                                checked={activeLetter === letter}
                                            />
                                            <label htmlFor={`alphaCheck_${letter}`}>
                                                <span> {letter} </span>
                                            </label>
                                        </li>
                                    </>)
                                })}
                            </ul>
                        </div>
                        <div className={styles.slider_reduce}>
                            <Slider {...settings} className='slider_reduce'>
                                {props?.widgetData?.data.slice(1).map((item, index) => {
                                    return (<>
                                        <div className='mainSlidSpacing' key={index}>
                                            <div className={styles.singleSlideReduce}>
                                                <div className={styles.heading_star}>
                                                    <Image width={97} height={97} src={item?.card_2_icon} alt='' className={`${styles.img_reduce_slider} img-fluid`} />
                                                    <div className={styles.wrape_info_sl}>
                                                        <h3> {item?.card_2_head} </h3>
                                                        <h4> {item?.card_2_sub_head} </h4>
                                                    </div>
                                                </div>
                                                <p> {item?.card_2_desc}  </p>
                                            </div>
                                        </div>
                                    </>)
                                })}
                            </Slider>
                        </div>
                    </div>
                </Container>}
        </section>
    )
}

export default ReduceDiabities;
