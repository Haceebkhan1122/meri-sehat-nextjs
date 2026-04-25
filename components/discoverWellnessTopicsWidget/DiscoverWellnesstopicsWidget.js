/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useState } from "react";
import { Container, Col } from "react-bootstrap";
import { SectionHeadingMed } from "../SectionHeadingMed";
import { CardWithHeaderImage } from "../cardWithHeaderImage";
import { useRouter } from "next/router";
// import './discoverWellnessTopics.css';
import Slider from "react-slick";
import arrowLeft from "../../public/svg/arrowleft.svg";
import arrowRight from "../../public/svg/arrowRight.svg";
import Image from "next/image";
import Arrow from "../../public/svg/right-arrow-border.svg";
import { useSelector } from "react-redux";
import Link from "next/link";

function DiscoverWellnesstopicsWidget(props) {
    const { widgetData = [] } = props;
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);
    const [i18nData, setI18nData] = useState(null);
    let i18nDataTwo = useSelector((state) => state.translation.i18n);


    useEffect(() => {
        if (typeof window !== "undefined") {
            setI18nData(i18nDataTwo);
        }
    }, [i18nDataTwo]);

    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                <Image src={arrowLeft} alt="left arrow" />
            </div>
        );
    }
    function SamplePrevArrow(props) {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick}>
                <Image src={arrowRight} alt="right arrow" />
            </div>
        );
    }

    useEffect(() => {
        import("react-device-detect").then((item) => {
            setIsMobile(item.isMobile);
        });
    }, []);

    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        speed: 500,
        slidesToScroll: 1,
        initialSlide: 0,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    var settings2 = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        speed: 500,
        slidesToScroll: 1,
        initialSlide: 0,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const pushToArticle = useCallback((url) => {
        if (url) {
            router.push(url);
        } else {
            return;
        }
    }, []);
    return (
        <>
            {router?.pathname === '/wellness' ? (
                <>
                    <section
                        data-reference_widget_id={widgetData?.id}
                        data-widget_id={widgetData?.widget_id}
                        className="discoverWellnessTopics dynamic-widget hk_for_home for_specially_wellness_page"
                        data-aos="fade-up" data-aos-duration="800">
                        <Container>
                            <div className='row'>
                                <Col lg={3} md={3} sm={12}>
                                    <div className="d-flex forBorder-wellness justify-content-between  ">
                                        <SectionHeadingMed text={widgetData?.heading} />
                                    </div>
                                </Col >
                                <div className='d-block d-lg-none hrnew'>
                                    <hr></hr>
                                </div>
                                <Col lg={9} md={9} sm={12} className='for_visible_on_right'>
                                    <div className='borderTop mt-3'>
                                        <Slider {...settings2} className="for_hk_slidee">
                                            {widgetData?.data?.map((cardData, index) => (
                                                <div key={index}>
                                                    <CardWithHeaderImage
                                                        btnText={'read_more_capital'}
                                                        onClick={() => pushToArticle(cardData?.data?.redirect_url)}
                                                        cardData={cardData}
                                                    />
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                </Col>
                            </div>

                        </Container>
                    </section>
                </>
            ) : (
                <>
                    <section
                        data-reference_widget_id={widgetData?.id}
                        data-widget_id={widgetData?.widget_id}
                        className="discoverWellnessTopics dynamic-widget hk_for_home"
                        data-aos="fade-up" data-aos-duration="800">
                        <Container>
                            <div className=''>
                                <Col lg={12} md={12}>
                                    <div className="d-flex forBorder-wellness justify-content-between ">
                                        <SectionHeadingMed text={widgetData?.heading} />
                                        {isMobile ? (
                                            <a href={widgetData?.redirect_url || ''} className="btn_icon_box">
                                                <Image src={Arrow} width={30} height={30} alt="arrow" />
                                                <span className="additionLineNoHover">
                                                    {i18nData?.view_all}
                                                </span>
                                            </a>
                                        ) : <a href={widgetData?.redirect_url || ''} className="btn_icon_box">
                                            <Image src={Arrow} width={30} height={30} alt="arrow" />
                                            <span className="underline_ancer">
                                                {i18nData?.view_all}
                                            </span>
                                        </a>}

                                    </div >
                                </Col>
                                <Col lg={12} md={12}>
                                    <div className='borderTop mt-3'>
                                        <Slider {...settings} className="for_hk_slidee sliderHomeScreen">
                                            {widgetData?.data?.map((cardData, index) => (
                                                <div key={index}>
                                                    <CardWithHeaderImage
                                                        btnText={'read_more_capital'}
                                                        onClick={() => pushToArticle(cardData?.data?.redirect_url)}
                                                        cardData={cardData}
                                                    />
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                </Col>

                            </div >
                        </Container>
                    </section>
                </>
            )}

        </>
    );
}

export default DiscoverWellnesstopicsWidget;
