import React, { useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { SectionHeadingMed } from "../SectionHeadingMed";
import Slider from "react-slick";
import arrowLeft from "../../public/svg/arrowleft.svg";
import arrowRight from "../../public/svg/arrowRight.svg";
import Image from "next/image";
import LabPackagesModal from '../../components/labPackagesModal/LabPackagesModal';


function LabPackages({ getCartId, labsPackage, instructionsModalPackage, setInstructionsModalPackage, widgetData }) {
  const [modalData, setModalData] = useState({})

  const handleModal = (e, item) => {
    e.preventDefault();
    setInstructionsModalPackage(true)
    setModalData(item)
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <Image src={arrowRight} alt="left arrow" />
      </div>
    );
  }

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <Image src={arrowLeft} alt="right arrow" />
      </div>
    );
  }

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
          infinite: false,
          rows: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2, infinite: false,
          initialSlide: 2, rows: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2, infinite: false,
          slidesToScroll: 1, rows: 2,
        },
      },
    ],
  };


  return (
    <>
      <div className="lab_package">
        {/* <div className='d-none-mob '>
          <Container>
            <Row>
              <Col lg={3} md={3} sm={12} className="position-relative">
                <Button className='btn-lab-test mt-4'> {widgetData?.heading} sdsdsd</Button>
              </Col>
            </Row>
          </Container>
        </div> */}
        <section
          className="discoverWellnessTopics dynamic-widget hk_for_home for_specially_wellness_page labTest-Packages"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <Container>
            <Row>
              <Col lg={3} md={3} sm={12}>
                <div className="forBorder-wellness justify-content-between  ">
                  <SectionHeadingMed text="Lab Packages" />
                  <div className="d-block d-lg-none hrnew">
                    <hr />
                  </div>
                  <p>{widgetData?.description}</p>
                </div>
              </Col>
              <Col
                lg={9}
                md={9}
                sm={12}
                className="for_visible_on_right lab_packages_wrapper"
              >
                <div
                  className={`mt-0 ${labsPackage?.length <= 2 ? "d-flex" : ""
                    } `}
                >
                  {/* if lab packages length not greater than 2 for both web and mob */}
                  {labsPackage?.length <= 2 &&
                    labsPackage?.map((item) => (
                      <div class="card cardWithHeaderImage homepageCard col-md-4 me-3">
                        <div class="header_img mt100Insverse">
                          <Image
                            alt="cardImage"
                            width={268}
                            height={190}
                            src={item?.image || ""}
                            class="img-fluid"
                          />
                        </div>
                        <div class="card_body px-0 pb-0 pss-0">
                          <div>
                            <h3 dir="auto" class="topicHeading">
                              {item?.name}
                            </h3>
                          </div>
                          <p className="lab_package_intro">
                            {item?.introduction}
                          </p>
                          <div className="d-flex align-items-center">
                            <span className="blueTextArea">
                              {item?.lab_package?.length} tests included
                            </span>
                            <p className="labtest-scanHeading __save">
                              SAVE {item?.discount_percent}%
                            </p>
                          </div>
                          <div className="border-bottom d-flex align-items-center justify-content-between pb-2 mb-3 priceAreaCard">
                            <s> {item?.amount}</s>
                            <span>
                              PKR <b> {item?.final_price}</b>
                            </span>
                          </div>
                          <div class="btn_container mb-3 mt-3">
                            <button
                              type="button"
                              class=" forBtnResponsive text-uppercase"
                              onClick={(e) => handleModal(e, item)}
                            >
                              <span className="underline_ancer text-white">
                                VIEW TESTS
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* if lab packages length greater than 2 then slider show only in web view*/}
                  <div className="d-lg-block d-none">
                    <Slider {...settings2} className="for_hk_slidee">
                      {labsPackage?.length > 2 &&
                        labsPackage?.map((item) => (
                          <>
                            <div class="card cardWithHeaderImage homepageCard">
                              <div class="header_img mt100Insverse">
                                <Image
                                  alt="cardImage"
                                  width={268}
                                  height={190}
                                  src={item?.image || ""}
                                  class="img-fluid"
                                />
                              </div>

                              <div class="card_body px-0 pb-0 pss-0">
                                <div>
                                  <h3 dir="auto" class="topicHeading">
                                    {item?.name}
                                  </h3>
                                </div>
                                <p className="lab_package_intro">
                                  {item?.introduction}
                                </p>
                                <div className="d-flex align-items-center">
                                  <span className="blueTextArea">
                                    {item?.lab_package?.length} tests included
                                  </span>
                                  <p className="labtest-scanHeading __save">
                                    SAVE {item?.discount_percent}%
                                  </p>
                                </div>
                                <div className="border-bottom d-flex align-items-center justify-content-between pb-2 mb-3 priceAreaCard">
                                  <s>PKR {item?.amount}</s>
                                  <span>
                                    PKR <b>{item?.final_price}</b>
                                  </span>
                                </div>
                                <div class="btn_container mb-3 mt-3">
                                  <button
                                    type="button"
                                    class=" forBtnResponsive text-uppercase"
                                    onClick={(e) => handleModal(e, item)}
                                  >
                                    <span className="underline_ancer text-white">
                                      VIEW TESTS
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                    </Slider>
                  </div>

                  {/* if lab packages length greater than 2 then this wrapper show only mobile without slider*/}
                  <div className="d-block d-lg-none">
                    <div className="for_hk_slidee hk_mob_lab_pack_withitems ">
                      {labsPackage?.length > 2 &&
                        labsPackage?.map((item) => (
                          <>
                            <div class="card cardWithHeaderImage homepageCard col-md-6 me-3">
                              <div class="header_img mt100Insverse">
                                <Image
                                  alt="cardImage"
                                  width={268}
                                  height={190}
                                  src={item?.image || ""}
                                  class="img-fluid"
                                />
                              </div>
                              <div class="card_body px-0 pb-0 pss-0">
                                <div>
                                  <h3 dir="auto" class="topicHeading">
                                    {item?.name}
                                  </h3>
                                </div>
                                <p className="lab_package_intro">
                                  {item?.introduction}
                                </p>
                                <div className="d-flex align-items-center">
                                  <span className="blueTextArea">
                                    {item?.lab_package?.length} tests included
                                  </span>
                                  <p className="labtest-scanHeading __save">
                                    SAVE {item?.discount_percent}%
                                  </p>
                                </div>
                                <div className="border-bottom d-flex align-items-center justify-content-between pb-2 mb-3 priceAreaCard">
                                  <s>PKR {item?.amount}</s>
                                  <span>
                                    PKR <b>{item?.final_price}</b>
                                  </span>
                                </div>
                                <div class="btn_container mb-3 mt-3">
                                  <button
                                    type="button"
                                    class=" forBtnResponsive text-uppercase"
                                    onClick={(e) => handleModal(e, item)}
                                  >
                                    <span className="underline_ancer text-white">
                                      VIEW TESTS
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="card cardWithHeaderImage homepageCard col-md-6 me-3">
                              <div class="header_img mt100Insverse">
                                <Image
                                  alt="cardImage"
                                  width={268}
                                  height={190}
                                  src={item?.image || ""}
                                  class="img-fluid"
                                />
                              </div>
                              <div class="card_body px-0 pb-0 pss-0">
                                <div>
                                  <h3 dir="auto" class="topicHeading">
                                    {item?.name}
                                  </h3>
                                </div>
                                <p className="lab_package_intro">
                                  {item?.introduction}
                                </p>
                                <div className="d-flex align-items-center">
                                  <span className="blueTextArea">
                                    {item?.lab_package?.length} tests included
                                  </span>
                                  <p className="labtest-scanHeading __save">
                                    SAVE {item?.discount_percent}%
                                  </p>
                                </div>
                                <div className="border-bottom d-flex align-items-center justify-content-between pb-2 mb-3 priceAreaCard">
                                  <s>PKR {item?.amount}</s>
                                  <span>
                                    PKR <b>{item?.final_price}</b>
                                  </span>
                                </div>
                                <div class="btn_container mb-3 mt-3">
                                  <button
                                    type="button"
                                    class=" forBtnResponsive text-uppercase"
                                    onClick={(e) => handleModal(e, item)}
                                  >
                                    <span className="underline_ancer text-white">
                                      VIEW TESTS
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                  <LabPackagesModal
                    getCartIdData={getCartId && getCartId}
                    instructionsModalPackage={instructionsModalPackage}
                    setInstructionsModalPackage={setInstructionsModalPackage}
                    notes={modalData}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
}
export default LabPackages;
