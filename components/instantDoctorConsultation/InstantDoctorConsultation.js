import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";
import time from "../../public/png/time_mini.png";
import { useSelector } from "react-redux";
import Link from "next/link";
// import { isMobile } from "react-device-detect";
import pricingArrowGreenForward from "../../public/svg/pricing-green-arrow.svg";
import ImageLoader from "../ImageLoader";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";

function InstantDoctorConsultation(props) {
  const { widgetData = [], key } = props;
  const [data, setData] = useState([]);
  const [i18nData, setI18nData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);
  const isMobileMediaQuery = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    import("react-device-detect").then((item) => {
      setIsMobile(item.isMobile);
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

  useEffect(() => {
    setData(widgetData?.data);
  }, [widgetData]);

  const slicingData = widgetData?.data?.slice(1);


  const [fromFad, setFromFad] = useState(true);
  let router = useRouter();

  useEffect(() => {
    if (router.pathname == "/find-a-doctor") {
      setFromFad(true)
    }
    else {
      setFromFad(false)
    }
  }, [router.pathname]);


  return (
    <>
      {isMobileMediaQuery ? (
        <>
          <section className="doctors_waiting mt-0">
            <Container>
              <Row>
                <Col md={6}>
                  <div className={fromFad ? "instant_doc_area card fad-mobile-carding": "instant_doc_area card "}>
                    <Row>
                      <div className="d-flex align-items-center justify-content-around" style={{gap:'8px'}}>
                        <div className={(isMobileMediaQuery) ? "heading_cont me-3 mobile_heading_imgage boxImage" : "heading_cont me-3"}>
                          <Image
                            className="img-fluid"
                            src={widgetData?.data?.[0].image}
                            width={70}
                            height={76}
                            alt={
                              widgetData?.data?.[0].alt
                                ? widgetData?.data?.[0].alt
                                : null
                            }
                          />
                        </div>
                        {/* {isMobileMediaQuery && <div className="imgBackgroundPink"></div>} */}
                        <div className="heading_cont ">
                          <h2 dir="auto" className="slider_title mt-0 mb-2">
                            {widgetData?.data?.[0].heading}
                          </h2>
                          <div className={(isMobileMediaQuery ) ? "banner_24_7" : "banner_24_7"}>
                            <div className="time_area d-flex align-items-center justify-content-center no_direction">
                              <div className="time__ doc_timings or2_urdu">
                                <Image
                                  className="img-fluid"
                                  src={time}
                                  alt="time"
                                  width={12}
                                  height={12}
                                />
                              </div>
                              <div className="time__ doc_timings scale01">
                                <h3 className="ss">
                                  {widgetData?.data?.[0].description}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={(isMobileMediaQuery) ? "" : "blueTickLink"}>
                          <Link href={widgetData?.data?.[0].redirect_url || ""}>
                            <Image
                              src={pricingArrowGreenForward}
                              alt="arrowIcon"
                              className="img-fluid me-0 ms-2"
                              width={40}
                              height={40}
                            />
                          </Link>
                        </div>
                      </div>
                    </Row>
                  </div>
                </Col>
                <Col md={6}>
                  <div className={(isMobileMediaQuery) ? "right_area_instant_home ps-0 mobile_parneting_info_right_mob" : "right_area_instant_home ps-0"}>
                    <h4 className="mb-5">{widgetData?.heading}</h4>
                    {slicingData?.length > 0 &&
                      slicingData?.map((item) => {
                        return (
                          <div className="icon_area_main mb-4">
                            <div className="icon_place">
                              <Image
                                className="img-fluid"
                                src={item?.image}
                                alt={item?.alt ? item?.alt : null}
                                width={60}
                                height={60}
                              />
                            </div>
                            <div className="icon_place">
                              <p>{item?.description}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </>
      ) : (
        <section
          className="doctors_waiting _mt-0"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <Container>
            <Row className="forReversingRow">
              <Col md={6}>
                <div className={fromFad ? "instant_doc_area card instant_doc_area card __fad_forCard" : "instant_doc_area card"}>
                  <Row>
                    {!fromFad && <Col md={7}>
                      <div className="heading_cont">
                        <h2 dir="auto" className="slider_title">
                          {widgetData?.data?.[0].heading}
                        </h2>
                        <div className="banner_24_7">
                          <div className="time_area d-flex align-items-center justify-content-center">
                            <div className="time__ doc_timings">
                              <Image
                                className="img-fluid"
                                src={time}
                                alt="time"
                                width={16}
                                height={16}
                              />
                            </div>
                            <div className="time__ doc_timings">
                              <h3>{widgetData?.data?.[0].description}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>}
                    <Col md={5}>
                      <div className={fromFad ? "heading_cont heading_fad_instant" : "heading_cont"}>
                        {widgetData?.data?.[0].image ? (
                          <Image
                            className="img-fluid"
                            src={widgetData?.data?.[0].image}
                            width={216}
                            height={257}
                            alt={
                              widgetData?.data?.[0].alt
                                ? widgetData?.data?.[0].alt
                                : null
                            }
                          />
                        ) : (
                          <ImageLoader />
                        )}
                      </div>
                    </Col>
                  </Row>
                  {!fromFad && <Col md={12}>
                    <div className="btn_container">
                      <Link
                        href={widgetData?.data?.[0].redirect_url}
                        className={`review-button add-review-btn text-uppercase max-width-300 fw-700 mt-3 mb-3 position-relative simple-btn-mobile instantBannerNewBtn`}
                      >
                        <span className="cons_now">
                          {i18nData?.consult_now}
                          {/* debug */}
                        </span>
                        <span
                          className={`add-review-chevron position-absolute`}
                          style={{
                            height: "53px",
                            left: "auto",
                            right: "0",
                            width: "50px",
                          }}
                        >
                          <FiChevronRight />
                        </span>
                      </Link>
                    </div>
                  </Col>}
                </div>
              </Col>
              <Col md={6}>
                <div className={fromFad ? "right_area_instant_home from_fad_h4" : "right_area_instant_home"}>
                  <h4 className="mb-4">{widgetData?.heading}</h4>
                  {slicingData?.length > 0 &&
                    slicingData?.map((item) => {
                      return (
                        <div
                          className="icon_area_main mb-4"
                          data-aos="fade-up"
                          data-aos-duration="2000"
                        >
                          <div className="icon_place">
                            <Image
                              className="img-fluid"
                              src={item?.image}
                              alt={item?.alt ? item?.alt : null}
                              width={80}
                              height={80}
                            />
                          </div>
                          <div className="icon_place">
                            <p className={fromFad ? "desc_fad_instant" : ""}>{item?.description}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
}

export default InstantDoctorConsultation;
