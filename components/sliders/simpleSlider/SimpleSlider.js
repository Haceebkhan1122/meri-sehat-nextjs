import React, { useEffect, useRef, useState } from "react";
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
import Link from "next/link";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";
import Cookies from "js-cookie";

function SimpleSlider(props) {
  const [fromFad, setFromFad] = useState(false);
  const [inPricing, setInPricing] = useState(false);

  let router = useRouter();

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
    buttonRedirect,
    buttonText,
  } = props;


  const slider = useRef();
  const settings = {
    className: "gallery",
    dots: false,
    arrows: true, autoplay: true,
    infinite: true,
    // rows: rows  || 1,
    // slidesPerRow: slidesPerRow || 1,
    draggable: true,
    // infinite: infinite || true,
    swipeToSlide: true,
    speed: 500,
    // slidesToShow: sliderChildrenOnDesktop || 3,
    slidesToShow: 3,
    slidesToScroll: 1,
    // variableWidth: false,
    // adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // infinite: false,
          // swipeToSlide: true,
          // variableWidth: true,
          // draggable: true,
          // adaptiveHeight: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // adaptiveHeight: adaptiveHeight || false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          // adaptiveHeight: adaptiveHeight || false 
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



  useEffect(() => {
    if (router.pathname == "/find-a-doctor") {
      setFromFad(true)
    }
    if (router.pathname == "/pricing") {
      setInPricing(true)
    }
  }, [router.pathname]);


  const handleShowCityModal = () => {
    Cookies.set('requestConsultModalShow', '1')
    window.location.href = "/find-a-doctor"
  }

  return (
    <Container className={inPricing ? "simple_slider_sec pricing_page_slider pricing_page_container" : router.pathname == "/sehat-a-z" ? "simple_slider_sec" : "simple_slider_sec pricing_page_slider"}>
      <Row className={className}>
        <Col lg={3} md={12} className="_pe-0">
          <div className="heading_cont">
            <Row className={className}>
              <Col xs={8} lg={12}>
                <h2
                  dir="auto"
                  className="slider_title mb-10 mt-3"
                  dangerouslySetInnerHTML={{
                    __html: sliderTitle || "",
                  }}
                />
              </Col>
              <Col style={{ height: 'auto', marginTop: '10px' }} xs={4} className={(fromFad && isMobile) ? "d-none" : "d-lg-none d-block text-end"}>
                <a
                  href={buttonRedirect || ""}
                  class="text-uppercase view_all_btn ms-auto"
                >
                  {buttonText}
                </a>
              </Col>
              <Col xs={12} className={fromFad ? "d-lg-none d-block text-end mobile_fad_hr" : "d-lg-none d-block text-end"}>
                <hr></hr>
              </Col>
            </Row>

            {/* parse({sliderDesc}) */}
            {router.pathname !== "/sehat-a-z" && parse(` ${sliderDesc} `)}
            <div className="d-none d-lg-block">
              {fromFad ? (
                <>
                  <a
                    onClick={handleShowCityModal}
                    className={fromFad ? "requ__fad_sliderBtn" : "text-uppercase view_all_btn mt-4 "}
                  >
                    {buttonText}
                  </a>
                </>
              ) : (
                <a
                  href={(buttonRedirect || "")}
                  className={fromFad ? "requ__fad_sliderBtn" : "text-uppercase view_all_btn mt-4 "}
                >
                  {buttonText}
                </a>
              )}

            </div>
          </div>
        </Col>
        <Col lg={9} md={12} className={fromFad ? "wraper__fad_slides" : inPricing ? "wraper__pricing_page test" : ""}>
          {viewAllLink && (
            <div className="browseAll">
              <RightArrowWithBorder />
              <AnchorLink to={viewAllLink} differentSite={true} text="View All" />
            </div>
          )}
          <div className={fromFad ? "wraper__fad_slides_btns" : "slider_btns"}>
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
          <Slider className="slider_dr01"
            {...settings}
            ref={(reference) => (slider.current = reference)}
          >
            {children}
          </Slider>
        </Col>
        {fromFad ? (<>
          <div className="boxButton d-lg-none d-block">
            <a
              onClick={handleShowCityModal}
              className="buttonReq"
            >
              REQUEST A CONSULT
            </a>

          </div>
        </>) : (<></>)}

      </Row>
    </Container>
  );
}

export default SimpleSlider;