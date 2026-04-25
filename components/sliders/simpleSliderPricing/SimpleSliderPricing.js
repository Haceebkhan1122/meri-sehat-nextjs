import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import { AnchorLink } from "@/components/ancerWithUnderline";
import { RightArrowWithBorder } from "@/components/rightArrowWithBorder";
// import './simpleSlider.css';
import { HeadingDesc } from "@/components/HeadingDesc";
import prevArrow from "../../../public/svg/prev-icon-new.svg";
import nextArrow from "../../../public/svg/next-icon-new.svg";
import Image from "next/image";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function SimpleSliderPricing(props) {
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

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
  } = props;

  const slider = useRef();
  const settings = {
    className: "gallery",
    dots: false,
    arrows: true,
    // rows: rows  || 1,
    // slidesPerRow: slidesPerRow || 1,
    draggable: true,
    infinite: infinite || true,
    swipeToSlide: false,
    speed: 500,
    slidesToShow: sliderChildrenOnDesktop || 3,
    slidesToScroll: 1,
    variableWidth: sliderBoxWidth || false,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          variableWidth: true,
          draggable: true,
          adaptiveHeight: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          adaptiveHeight: adaptiveHeight || false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          adaptiveHeight: adaptiveHeight || false,
        },
      },
    ],
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
    <Container className="simple_slider_sec">
      <Row className={className}>
        <Col lg={3} md={12} className="pe-0">
          <div className="heading_cont">
            <h2
              dir="auto"
              className="slider_title"
              dangerouslySetInnerHTML={{
                __html: sliderTitle || "",
              }}
            />
            {/* parse({sliderDesc}) */}
            {parse(`<p>${sliderDesc}</p>`)}
          </div>
          <button className="text-uppercase view_all_btn mt-4">
            {i18nData?.view_all}
          </button>
        </Col>
        <Col lg={9} md={12}>
          {viewAllLink && (
            <div className="browseAll">
              <RightArrowWithBorder />
              <AnchorLink to={viewAllLink} differentSite={true} text={i18n.t("browse_all")} />
            </div>
          )}
          <div className="slider_btns ">
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

export default SimpleSliderPricing;
