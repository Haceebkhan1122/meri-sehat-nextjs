import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import style from '../../findADoctor/style.module.scss'

import cards from "../../../public/png/cards.png";
import cards2 from "../../../public/png/cards2.png";
import cards3 from "../../../public/png/cards3.png";
import videoThumbnail1 from "../../../public/png/video_thumbnail1.png";
import videoThumbnail2 from "../../../public/png/video_thumbnail2.png";
import videoThumbnail3 from "../../../public/png/video_thumbnail3.png";
import howItWorksImg from "../../../public/svg/howItWorksImg.svg";
import iconRight from "../../../public/svg/right-arrow-border.svg";

import Slider from "react-slick";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ImageLoader from "../../ImageLoader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function HowItWorksFaD(props) {
  const [videoModal, setVideoModal] = useState(false);
  const { widgetData = [], key } = props;
  const [data, setData] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (widgetData?.data?.length > 0) {
      setData(widgetData?.data);
    }
  }, [widgetData]);

  const settings = {
    arrow: false,
    infinite: true,
    loop: true,
    speed: 500,
    slidesToShow: 1,
    dots: true,
    slidesToScroll: 1,
    autoplay: false,
    beforeChange: (current, next) => setActiveSlide(next), // Update active slide index
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToScroll: 1,
          beforeChange: (current, next) => setActiveSlide(next), // Update active slide index
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToScroll: 1,
          beforeChange: (current, next) => setActiveSlide(next), // Update active slide index
        },
      },
    ],
  };
 

  return (
    <>
      <section
        className={`${style.howItWorksFad} health_common  mt-80 mb-5 pb-5 `}
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <Container>
          <Col lg={6}>
            <h2 className={`${style.headindFindaDR}mb-3 heading-mobile`}>Steps to request a consult</h2>
            <hr className="mb-4"></hr>
            
          </Col>
          
          <Col lg={11} className="slider_doctorNow ms-auto">
            <Slider {...settings}>
              {widgetData?.data?.length > 0 &&
                widgetData?.data?.map((item, index) => {
                  return (
                    <>
                      <Col lg={12} key={index}>
                        <Row
                          className={` ${
                            activeSlide === index
                              ? `slider${index + 1}-active`
                              : ""
                          }`}
                        >
                          <Col lg={6} className="ps-0 ms-auto or2">
                            <div className="box_how_it_works">
                              <div className="d-flex mb-5 flex-col">
                                <div className="mobile_img">
                                  {item?.sub_head ? (
                                    <Image
                                      src={item?.sub_head}
                                      width={70}
                                      height={70}
                                      alt="instant Consultant"
                                      className="img-fluid me-4"
                                    />
                                  ) : null}
                                </div>
                                {/* <p >Click <span className='fw-600'>Consult Now</span> and complete your payment</p> */}
                                <p>{item?.heading}</p>
                              </div>
                              <hr></hr>
                              <div className="text-center mt-5">
                                {(index === 0 && (
                                  <>
                                    <Image
                                      src={cards}
                                      alt="instant Consultant"
                                      className="img-fluid  m-auto"
                                    />
                                  </>
                                )) ||
                                  (index === 1 && (
                                    <>
                                      <Image
                                        src={cards2}
                                        alt="instant Consultant"
                                        className="img-fluid  m-auto"
                                      />
                                    </>
                                  )) ||
                                  (index === 2 && (
                                    <>
                                      <Image
                                        src={cards3}
                                        alt="instant Consultant"
                                        className="img-fluid  m-auto"
                                      />
                                    </>
                                  ))}
                              </div>
                            </div>
                          </Col>
                          <Col lg={6} className="or1 ">
                            <div
                              className="payment_solution d-block d-lg-none "
                              onClick={() => setVideoModal(true)}
                            >
                              <div className="box_image">
                                {(index === 0 && (
                                  <>
                                    <Image
                                      src={videoThumbnail1}
                                      alt="instant Consultant"
                                      className="img-fluid  11"
                                    />
                                  </>
                                )) ||
                                  (index === 1 && (
                                    <>
                                      <Image
                                        src={videoThumbnail2}
                                        alt="instant Consultant"
                                        className="img-fluid  22"
                                      />
                                    </>
                                  )) ||
                                  (index === 2 && (
                                    <>
                                      <Image
                                        src={videoThumbnail3}
                                        alt="instant Consultant"
                                        className="img-fluid 33 "
                                      />
                                    </>
                                  ))}
                              </div>
                              <Row className="payment_solution_box align-items-center">
                                {/* <Col xs={9}>
                                                                <p>Easy payment solution</p>
                                                                <span className='vid_time'>01:20</span>
                                                            </Col> */}
                                <Col xs={3}>
                                  {/* <Image src={playbtn}  ></Image> */}
                                </Col>
                              </Row>
                            </div>
                            
                             <div className="video_section d-none d-lg-block">
                                <Image
                                  width={500}
                                  height={500}
                                  alt={item?.alt ? item?.alt : null}
                                  src={howItWorksImg}
                                />
                              </div>
                            {item?.image ? (
                              <div className="video_section d-none d-lg-block">
                                <Image
                                  width={500}
                                  height={500}
                                  alt={item?.alt ? item?.alt : null}
                                  src={howItWorksImg}
                                />
                              </div>
                            ) : (
                              <div className="video_sectionLoader d-none d-lg-block">
                                <ImageLoader />
                              </div>
                            )}

                            {/* <Modal
                                                        centered
                                                        style={{
                                                            top: 20,
                                                        }}
                                                        open={videoModal}
                                                        onOk={() => setVideoModal(false)}
                                                        onCancel={() => setVideoModal(false)}
                                                        className='modal_video'
                                                    >
                                                        <div className='video_mobile  '>
                                                            <ReactPlayer url={item?.redirect_url} />
                                                        </div>
                                                    </Modal> */}
                          </Col>
                        </Row>
                      </Col>
                    </>
                  );
                })}
            </Slider>
          </Col>
        </Container>
      </section>
    </>
  );
}

export default HowItWorksFaD;
