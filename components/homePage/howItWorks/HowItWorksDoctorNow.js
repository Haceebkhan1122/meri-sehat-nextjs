import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import cards from "../../../public/png/cards.png";
import cards2 from "../../../public/png/cards2.png";
import cards3 from "../../../public/png/cards3.png";
import fadCardIcons1 from "../../../public/png/fad_how_itwork1.png";
import fadCardIcons2 from "../../../public/png/fad_how_itwork2.png";
import fadCardIcons3 from "../../../public/png/fad_how_itwork3.png";
import videoThumbnail1 from "../../../public/png/video_thumbnail1.png";
import videoThumbnail2 from "../../../public/png/video_thumbnail2.png";
import videoThumbnail3 from "../../../public/png/video_thumbnail3.png";
import Slider from "react-slick";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ImageLoader from "../../ImageLoader";
import { useRouter } from "next/router";
import GoogleSvg from "public/svg/google__fad.svg";
import StarSvg from "public/svg/star__fad.svg";
import { isMobile } from "react-device-detect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function HowItWorksDoctorNow(props) {
  const [videoModal, setVideoModal] = useState(false);
  const { widgetData = [], key } = props;
  const [data, setData] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [fromFad, setFromFad] = useState(false);
  let router = useRouter();

  useEffect(() => {
    if (widgetData?.data?.length > 0) {
      setData(widgetData?.data);
    }
  }, [widgetData]);

  useEffect(() => {
    if (router.pathname === "/find-a-doctor") {
      setFromFad(true);
    } else {
      setFromFad(false);
    }
  }, [router.pathname]);

  const settings = {
    arrow: false,
    infinite: true,
    loop: true,
    speed: 500,
    slidesToShow: 1,
    dots: true,
    slidesToScroll: 1,
    autoplay: true,
    beforeChange: (current, next) => setActiveSlide(next), // Update active slide index
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToScroll: 1,
          autoplay: true,

          beforeChange: (current, next) => setActiveSlide(next), // Update active slide index
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToScroll: 1,
          autoplay: true,

          beforeChange: (current, next) => setActiveSlide(next), // Update active slide index
        },
      },
    ],
  };

  // useEffect(() => {

  //     let currentIndex = 0;
  //     let animating;
  //     let swipePanels = gsap.utils.toArray(".swipe-section .panel");

  //     let reversedPanels = [...swipePanels].reverse();
  //     reversedPanels.forEach((panel, index) => {
  //         gsap.set(panel, { zIndex: index });
  //     });

  //     let intentObserver = ScrollTrigger.observe({
  //         type: "wheel,touch",
  //         onUp: () => !animating && gotoPanel(currentIndex - 1, false),
  //         onDown: () => !animating && gotoPanel(currentIndex + 1, true),
  //         tolerance: 10,
  //         preventDefault: true
  //     });
  //     intentObserver.disable();

  //     function gotoPanel(index, isScrollingDown) {
  //         animating = true;
  //         if ((index === swipePanels.length && isScrollingDown) || (index === -1 && !isScrollingDown)) {
  //             intentObserver.disable();
  //             return;
  //         }

  //         let target = isScrollingDown ? swipePanels[currentIndex] : swipePanels[index];
  //         gsap.to(target, {
  //             yPercent: isScrollingDown ? -100 : 0,
  //             duration: 0.75,
  //             onComplete: () => (animating = false)
  //         });
  //         setActiveSlide(index);

  //         currentIndex = index;
  //     }

  //     ScrollTrigger.create({
  //         trigger: ".swipe-section",
  //         pin: true,
  //         start: "top top",
  //         onEnter: () => {
  //             intentObserver.enable();
  //             gotoPanel(currentIndex + 1, true);
  //         },
  //         onEnterBack: () => {
  //             intentObserver.enable();
  //             gotoPanel(currentIndex - 1, false);
  //         }
  //     });

  //     let horizontalSections = document.querySelectorAll(".horizontal .panel");
  //     gsap.to(horizontalSections, {
  //         xPercent: -100 * (horizontalSections.length - 1),
  //         ease: "none",
  //         scrollTrigger: {
  //             trigger: '.horizontal',
  //             pin: true,
  //             scrub: 1,
  //             end: "+=3500"
  //         }
  //     });

  // }, []);

  return (
    <>
      <section
        className="health_common  mt-80 mb-5 pb-5"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <Container>
          <Col lg={12} className={fromFad ? "d-block d-lg-none" : "d-block"}>
            <h2 className="mb-3 heading-mobile">{widgetData?.heading}</h2>
            <hr className="mb-4"></hr>
          </Col>

          <Col lg={11} className="slider_doctorNow ms-auto dd">
            {fromFad ? (<>
              <Row>
                <Col lg={6} className={fromFad ? "ps-3" : ""}>
                  <h2 className="mb-3 heading-mobile d-none d-lg-block ">{widgetData?.heading}</h2>
                  <hr className="mb-4 d-none d-lg-block "></hr>
                  <Slider
                    {...settings}
                    className={fromFad ? "fad__slider__btns_wraper_mob" : ""}
                  >
                    {widgetData?.data?.length > 0 &&
                      widgetData?.data?.map((item, index) => {
                        return (
                          <>
                            <Col lg={12} key={index}>
                              <Row
                                className={` ${activeSlide === index
                                  ? `slider${index + 1}-active`
                                  : ""
                                  }`}
                              >
                                <Col lg={12} className="ps-0 ms-auto or2">
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
                                            src={fromFad ? fadCardIcons1 : cards}
                                            alt="instant Consultant"
                                            className="img-fluid  m-auto"
                                            width={310}
                                            height={90}
                                          />
                                        </>
                                      )) ||
                                        (index === 1 && (
                                          <>
                                            <Image
                                              src={fromFad ? fadCardIcons2 : cards2}
                                              alt="instant Consultant"
                                              className="img-fluid  m-auto"
                                              width={311}
                                              height={90}
                                            />
                                          </>
                                        )) ||
                                        (index === 2 && (
                                          <>
                                            <Image
                                              src={fromFad ? fadCardIcons3 : cards3}
                                              alt="instant Consultant"
                                              className="img-fluid  m-auto"
                                              width={311}
                                              height={90}
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
                                    {fromFad && !isMobile && (
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
                                    )}

                                  </div>
                                  {/* <div className='video_section d-none d-lg-block'>
                                                        <ReactPlayer url={item?.redirect_url} />
                                                    </div> */}
                                  {/* {item?.image ? (
                                    <div className="video_section d-none d-lg-block">
                                      <Image
                                        width={500}
                                        height={500}
                                        alt={item?.alt ? item?.alt : null}
                                        src={item?.image}
                                        className={fromFad ? " mt30" : ""}
                                      />
                                    </div>
                                  ) : (
                                    <div className="video_sectionLoader d-none d-lg-block">
                                      <ImageLoader />
                                    </div>
                                  )} */}

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
                <Col md={6} className={isMobile ? "text-center" : "text-right"}>

                  {isMobile ? (
                    <>
                      {widgetData?.data?.length > 0 && (
                        <Image
                          width={282}
                          height={320}
                          alt={widgetData.data[0]?.alt || null}
                          src={widgetData.data[0]?.image}
                          className="ms-auto mt-5 pt-5"
                        />


                      )}
                    </>
                  ) : (<>
                    {widgetData?.data?.length > 0 && (
                      <Image
                        width={450}
                        height={450}
                        alt={widgetData.data[0]?.alt || null}
                        src={widgetData.data[0]?.image}
                        className="ms-auto"
                      />


                    )}
                  </>)}
                </Col>
              </Row>
            </>) : (<>
              <Slider
                {...settings}
                className={fromFad ? "fad__slider__btns_wraper_mob" : ""}
              >
                {widgetData?.data?.length > 0 &&
                  widgetData?.data?.map((item, index) => {
                    return (
                      <>
                        <Col lg={12} key={index}>
                          <Row
                            className={` ${activeSlide === index
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
                                        src={fromFad ? fadCardIcons1 : cards}
                                        alt="instant Consultant"
                                        className="img-fluid  m-auto"
                                        width={310}
                                        height={90}
                                      />
                                    </>
                                  )) ||
                                    (index === 1 && (
                                      <>
                                        <Image
                                          src={fromFad ? fadCardIcons2 : cards2}
                                          alt="instant Consultant"
                                          className="img-fluid  m-auto"
                                          width={311}
                                          height={90}
                                        />
                                      </>
                                    )) ||
                                    (index === 2 && (
                                      <>
                                        <Image
                                          src={fromFad ? fadCardIcons3 : cards3}
                                          alt="instant Consultant"
                                          className="img-fluid  m-auto"
                                          width={311}
                                          height={90}
                                        />
                                      </>
                                    ))}
                                </div>
                              </div>
                              {/* {fromFad && (
                              <div className="googleWrapper">
                                <Image
                                  src={GoogleSvg}
                                  alt=""
                                  className="google__svg_img"
                                />
                                <p> 4.2 (25 Reviews) </p>
                                <Image
                                  src={StarSvg}
                                  alt=""
                                  className="star__svg_img"
                                />
                              </div>
                            )} */}
                              {fromFad && isMobile && item?.image && (
                                <div className="for_mobile_fad_image">
                                  <Image
                                    width={282}
                                    height={290}
                                    alt={item?.alt ? item?.alt : null}
                                    src={item?.image}
                                  />
                                </div>
                              )}
                            </Col>
                            <Col lg={6} className="or1 ">
                              <div
                                className="payment_solution d-block d-lg-none "
                                onClick={() => setVideoModal(true)}
                              >
                                {fromFad && !isMobile && (
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
                                )}

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
                              {/* <div className='video_section d-none d-lg-block'>
                                                        <ReactPlayer url={item?.redirect_url} />
                                                    </div> */}
                              {item?.image ? (
                                <div className="video_section d-none d-lg-block">
                                  <Image
                                    width={500}
                                    height={500}
                                    alt={item?.alt ? item?.alt : null}
                                    src={item?.image}
                                    className={fromFad ? " mt30" : ""}
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
            </>)}



          </Col>
        </Container>
      </section>
    </>
  );
}

export default HowItWorksDoctorNow;
