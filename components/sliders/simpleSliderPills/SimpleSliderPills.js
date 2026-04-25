import React, { useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import { AnchorLink } from '@/components/ancerWithUnderline';
import { RightArrowWithBorder } from '@/components/rightArrowWithBorder';
import { HeadingDesc } from '@/components/HeadingDesc';
// import './simpleSlider.css';
import prevArrow from '../../../public/svg/prev-icon-new.svg'
import nextArrow from '../../../public/svg/next-icon-new.svg'
import Image from 'next/image';


function SimpleSliderPills(props) {
    const {
        viewAllLink,
        sliderTitle,
        sliderDesc,
        children,
        className,
        sliderChildrenOnDesktop,
        sliderBoxWidth,
        adaptiveHeight,
        infinite,
        rows,
        slidesPerRow
    } = props;

    const slider = useRef();
    const settings = {
        className: 'gallery',
        centerMode: true,
        // centerPadding: '60px',
        rows: 2,
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        loop: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    swipeToSlide: true,
                    variableWidth: true,
                    draggable: true,
                    adaptiveHeight: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    adaptiveHeight: adaptiveHeight || false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    adaptiveHeight: adaptiveHeight || false
                }
            }
        ]
    };

    const next = () => {
        // call slider next function here
        slider.current.slickNext();
    };

    const previous = () => {
        // call slider previous function here
        slider.current.slickPrev();
    };

    return (
        <Container className="simple_slider_sec slide-head">
            <Row className={className}>
                <Col lg={3} md={12} className="pe-0">
                    <div style={{ paddingTop: '25px' }} className="heading_cont">
                        <h2
                            dir="auto"
                            className="slider_title"
                            dangerouslySetInnerHTML={{
                                __html: sliderTitle || ''
                            }}
                        />
                        {sliderDesc && (
                            <HeadingDesc
                                text={
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: sliderDesc || ''
                                        }}
                                    />
                                }
                            />
                        )}
                        <div className="slider_btns mt-5">
                            <div
                                className="prev_btn"
                                onClick={previous}
                                aria-hidden="true"
                                role="button"
                            >
                                <Image src={prevArrow} alt="prevArrow" />
                            </div>
                            <div
                                className="next_btn"
                                onClick={next}
                                aria-hidden="true"
                                role="button"
                            >
                                <Image src={nextArrow} alt="nextArrow" />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={9} md={12}>
                    {viewAllLink && (
                        <div className="browseAll">
                            <RightArrowWithBorder />
                            <AnchorLink to={viewAllLink}
                                // text={i18n.t('browse_all')} 
                                text="Browse All"
                            />
                        </div>
                    )}
                    <Slider
                        {...settings}
                        ref={(reference) => (slider.current = reference)}
                    >
                        {children}
                    </Slider>
                </Col>
            </Row>
        </Container>
    );
}

export default SimpleSliderPills;
