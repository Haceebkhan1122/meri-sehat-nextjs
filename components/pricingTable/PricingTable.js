import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { SectionHeadingMed } from "../SectionHeadingMed";
import Arrow from "../../public/svg/right-arrow-border.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Slider from "react-slick";
import Cookies from "js-cookie";
import Accordion from "react-bootstrap/Accordion";
import API from "@/utils/httpService";
import Reddanger from "../../public/svg/Reddanger.svg";
import VitalScan from "../vitalScan/VitalScan";
import LearnMoreModal from "../learnMoreModal/LearnMoreModal";
import { onlySubscription } from "@/utils/endpoints";


function PricingTable(props) {
  const { widgetData = [], key } = props;
  const [i18nData, setI18nData] = useState(null);
  const [openAccordionIds, setOpenAccordionIds] = useState([]);

  let i18nDataTwo = useSelector((state) => state.translation.i18n);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [showVitalScan, setShowVitalScan] = useState(false);
  const [showLearn, setShowLearn] = useState(false);
  const [getInsuranceInfo, setGetInsuranceInfo] = useState({})
  const [onlySubscriptions, setOnlySubscriptions] = useState({});

  const handleAccordionToggle = (e, id) => {
    if (openAccordionIds?.includes(id)) {
      setOpenAccordionIds(openAccordionIds?.filter((accId) => accId !== id));
    } else {
      setOpenAccordionIds([...openAccordionIds, id]);
    }
  };

  const handleCloseVital = () => setShowVitalScan(false);
  const handleShowVital = () => setShowVitalScan(true);

  const handleCloseLearn = () => setShowLearn(false);
  const handleShowLearn = () => setShowLearn(true);

  useEffect(() => {
    import("react-device-detect").then((item) => {
      setIsMobile(item.isMobile);
    });
  }, []);

  const fetchPricingSubsData = async () => {
    const headers = {
      Locale: 1,
    };

    const res = await API.get(onlySubscription, headers)
    if (res?.code == 200) {
      setOnlySubscriptions(res?.data)
    }
  }

  useEffect(() => {
    fetchPricingSubsData();
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);


  function navigateToPricing() {
    router.push("/pricing");
  }

  useEffect(() => {
    var tl = new TimelineMax();

    $(".tabs-block li").on("click", function () {
      var $label = $(".label");
      var $this = $(this);
      var el_width = $this.width();
      var offset_left = $this.offset();
      var initTabNum = $this.data("menu");
      var $article = $(".article");
      var $show = $(".show");

      function step_1() {
        $article.removeClass("show");
      }

      function step_2() {
        $(".num_" + initTabNum).addClass("show");
        $label.removeClass("active-num1 active-num2"); // Remove existing classes
        $label.addClass("active-num" + initTabNum); // Add class based on current section
      }

      if (!tl.isActive()) {
        tl.to($article, 0.05, {
          x: 500,
          ease: Power4.easeInOut,
          onComplete: step_1,
        }).fromTo(
          $(".num_" + initTabNum),
          1,
          {
            onStart: step_2,
            x: -1800,
          },
          { x: 0, ease: Power4.easeInOut, immediateRender: false }
        );

        $label.offset({ left: offset_left.left }).css("width", el_width);

        $(".tabs-block li").removeClass("active");
        $this.addClass("active");
      }
    });

    var initSize = function () {
      var start_element = $(".tabs-block li:first-of-type");
      var $label = $(".label");
      var initWidth = start_element.css("width");
      $label.css("width", initWidth);
    };
    initSize();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const Authorization = Cookies.get("Authorization");

      if (!Authorization) {
        setIsLoggedIn(false);
      }

      else {
        setIsLoggedIn(true);
        API.get("/user")
          .then((res) => setUserData(res?.data?.user))
          .catch((err) => console.log(err))
      }
    }
  }, [])

  const fetchInsuranceInfo = async () => {
    try {
      const resp = await API.get('/health-insurance-info')
      if (resp?.code == 200) {
        setGetInsuranceInfo(resp?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchInsuranceInfo();
  }, [])

  const settings = {
    arrow: true,
    infinite: false,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const checkUser = (e, id, yearly) => {
    const authorization = Cookies.get("Authorization");

    if (authorization && yearly) {
      window.location.href = `/order/${id}?yearly=yearly`;
      // mixpanel.track("Buy a Subscription package Yearly", {
      //   Name: userDetailsInfo?.name,
      //   Email: userDetailsInfo?.email,
      //   Number: userDetailsInfo?.phone,
      // });
    } else if (authorization) {
      window.location.href = `/order/${id}`;
      // mixpanel.track("Buy a Subscription package Monthly", {
      //   Name: userDetailsInfo?.name,
      //   Email: userDetailsInfo?.email,
      //   Number: userDetailsInfo?.phone,
      // });
    } else {
      // router.push("/phone-number", { state: "comingFromPricingPage" });
      window.location.href = "/phone-number";
    }
  };

  const isAuthorized = isLoggedIn && userData?.subscription?.package?.id;
  const isCancel = userData?.subscription?.is_cancel == 1;
  const isYearly = userData?.subscription?.is_yearly == 1;
  const packageId = userData?.subscription?.package?.id;
  const condition2 = isAuthorized && !isYearly && isCancel && packageId;
  const condition3 = isAuthorized && !isYearly && !isCancel && packageId >= 1;
  const isCorporate = userData?.is_corporate == true;


  return (
    <>
      <section
        className="pricingTableHome mt-4 mb-5"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <div className="discoverWellnessTopics dynamic-widget dd">
          <Container>
            <div className="d-flex forBorder-wellness justify-content-between ">
              <SectionHeadingMed text={widgetData?.heading} />
              <button className="btn_icon_box dd" onClick={navigateToPricing}>
                <Image src={Arrow} width={30} height={30} alt="Arrow" />
                <span className="underline_ancer">
                  {i18nData?.view_details}
                </span>
              </button>
            </div>
            <div className="pt-md-5 borderTop">
              <Container className="">
                <Row>
                  <Col md={12} className="text-center position-relative">
                    <ul className="tabs-block nav-tabs m-auto mb-5">
                      <li className="active" data-menu="1">
                        <button>
                          {i18nData?.monthly}
                        </button>
                      </li>
                      <li data-menu="2">
                        <button>
                          {i18nData?.yearly}
                        </button>
                      </li>
                      <div className="label"></div>
                      <span className="off_disc text-uppercase">
                        {`${onlySubscriptions && onlySubscriptions?.discounted_percent_yearly}%`}{" "}
                        {i18nData?.off}
                      </span>
                    </ul>
                    {onlySubscriptions?.monthly?.length > 0 && onlySubscriptions?.monthly?.length > 0 && (
                      <div className="article-block pt-4">
                        <div className="article num_1 show slider_banner_dr bottom_pagination responsive__">
                          {isMobile ? (
                            <Slider {...settings}>
                              {onlySubscriptions?.monthly?.length > 0 && onlySubscriptions?.monthly?.map((item) => {
                                const isAuthorized = isLoggedIn && userData?.subscription?.package?.id;
                                const isCancel = userData?.subscription?.is_cancel == 1;
                                const isYearly = userData?.subscription?.is_yearly == 1;
                                const packageId = userData?.subscription?.package?.id;
                                const condition1 = isAuthorized && isYearly;
                                const isCorporate = userData?.is_corporate == true;
                                const condition2 =
                                  isAuthorized && !isYearly && isCancel && packageId > item?.id;
                                const condition3 =
                                  isAuthorized && !isYearly && !isCancel && packageId >= item?.id;
                                return (
                                  <Col md={4} className="position-relative">
                                    {item.name === "PLUS" || item.name === "پلس" ? (
                                      <div className="popular_hk popular-tag">
                                        <h5>
                                          <span>{i18nData?.most_popular}</span>
                                        </h5>
                                      </div>
                                    ) : null}
                                    <div className={`card bg-white box-shadow pricing-box p-3 text-left ${item.name === "PLUS" || item.name === "پلس" ? 'border_highlight' : ''}`}>
                                      <div className="d-flex align-items-start justify-content-between urduname">
                                        <div className="packges-name">
                                          <span className="text-uppercase">
                                            {item?.name}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="priceAmountt my-2">
                                        <span className="text-uppercase me-2 pkr-text">
                                          {i18nData?.pkr}
                                        </span>
                                        <span className="rs-amount">
                                          {item?.price?.toLocaleString("en-IN")}
                                        </span>
                                      </div>
                                      <div className="checkMarkPoints">
                                        <ul className="ps-0">
                                          {item?.header?.map((listingPackage) => (
                                            <li className={`d-flex mt-2 align-items-center ${listingPackage?.icon?.includes('cross.svg') ? 'greyColor' : ''}`}>
                                              {/* <Image src={listingPackage?.icon} height={15} width={15} /> */}
                                              {isMobile ? <Image width={15} height={15} src={listingPackage?.icon} /> : <Image width={15} height={15} src={listingPackage?.icon} />}
                                              <span className="ms-2">
                                                {listingPackage?.title}
                                              </span>
                                            </li>
                                          ))}
                                        </ul>
                                        {userData?.subscription?.is_weekly == true ? (
                                          <button
                                            onClick={(e) => checkResponsiveUser(e, item, "yearly")}
                                            style={{ maxWidth: "100%" }}
                                            className="text-white w-100 btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn "
                                          >
                                            {i18nData?.buy_now
                                            } 
                                          </button>
                                        ) :
                                          <button
                                            onClick={(e) => checkResponsiveUser(e, item, "yearly")}
                                            style={{ maxWidth: "100%" }}
                                            className={`text-white w-100 btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn ${(condition1 || isCorporate || condition3) && 'pricing_package_disabled'}`}
                                            disabled={condition1 || condition3 || isCorporate}
                                          >
                                            {(condition1 || condition3 || isCorporate) || !isAuthorized ?
                                              i18nData?.buy_now : i18nData?.upgrade_package
                                            }
                                          </button>}
                                      </div>
                                      <Accordion className="mobilePricingTable ">
                                        <Accordion.Item eventKey="1">
                                          <Accordion.Body className="p-0">
                                            <div className="hrmt-0 ss">
                                              <hr />
                                            </div>
                                            <div className="px-0">
                                              {item?.footer?.map((PackageFooter) => (
                                                PackageFooter?.status == true ? (
                                                  <div className="d-flex align-items-start marginBottmArea">
                                                    <div className="icon_area">
                                                      <Image
                                                        src={PackageFooter?.icon}
                                                        alt="vitalss icons"
                                                        className="img-fluid"
                                                        height={15} width={15}
                                                      />
                                                    </div>
                                                    <div className="icon_area">
                                                      <h3 className="d-flex">
                                                        <span style={{ color: PackageFooter?.title == 'Health Insurance' || PackageFooter?.title == "Vital Scan" ? '#19B3B5' : "#0F345A", textDecoration: PackageFooter?.title == "Vital Scan" || PackageFooter?.title == "Health Insurance" ? 'underline' : '' }}>{PackageFooter?.title}</span>
                                                        {PackageFooter?.has_info_icon == true ? <Image onClick={PackageFooter?.title == "Vital Scan" ? handleShowVital : handleShowLearn} width={17} height={17} className="redInfoSign" src={Reddanger} /> : null
                                                        }
                                                      </h3>
                                                      <p>
                                                        {!PackageFooter?.options && (
                                                          PackageFooter?.value_text
                                                        )}
                                                      </p>
                                                      <p className="pt-2">
                                                        {PackageFooter?.has_info_icon == true && PackageFooter?.options !== null && (
                                                          PackageFooter?.options?.map((options) => (
                                                            <div className="d-block">
                                                              <p className="optionsTitle" >{options?.title} - <span className="optionsPkr">PKR {options?.value}</span></p>
                                                            </div>
                                                          ))
                                                        )}
                                                      </p>
                                                    </div>
                                                  </div>
                                                ) : null

                                              ))}
                                            </div>
                                          </Accordion.Body>
                                          {/* desktop-1  */}
                                          <div className="w-100 text-left py-3">
                                            <Accordion.Header
                                              onClick={(e) =>
                                                handleAccordionToggle(
                                                  e,
                                                  "desktop-1"
                                                )
                                              }
                                              className="showHideDetails"
                                            >
                                              <div className="w-100 text-left">
                                                <button
                                                  onClick={(e) =>
                                                    handleAccordionToggle(
                                                      e,
                                                      "desktop-1"
                                                    )
                                                  }
                                                  className="showHideDetails"
                                                >
                                                  {openAccordionIds?.includes(
                                                    "desktop-1"
                                                  )
                                                    ? i18nData?.hide_details
                                                    : i18nData?.show_details}
                                                </button>
                                              </div>
                                            </Accordion.Header>
                                          </div>
                                        </Accordion.Item>
                                      </Accordion>
                                    </div>

                                  </Col>
                                )
                              })}
                            </Slider>
                          ) : (
                            <Row className="">
                              <>
                                {onlySubscriptions?.monthly?.length > 0 && onlySubscriptions?.monthly?.map((item) => {
                                  const isAuthorized = isLoggedIn && userData?.subscription?.package?.id;
                                  const isCancel = userData?.subscription?.is_cancel == 1;
                                  const isYearly = userData?.subscription?.is_yearly == 1;
                                  const packageId = userData?.subscription?.package?.id;
                                  const condition1 = isAuthorized && isYearly;
                                  const isCorporate = userData?.is_corporate == true;
                                  const condition2 =
                                    isAuthorized && !isYearly && isCancel && packageId > item?.id;
                                  const condition3 =
                                    isAuthorized && !isYearly && !isCancel && packageId >= item?.id;
                                  return (
                                    <>
                                      <Col md={4}>
                                        <div className={`card bg-white box-shadow pricing-box p-3 text-left dd ${item.name === "PLUS" || item.name === "پلس" || item?.is_popular ? 'border_highlight' : ''}`}>
                                          {item.name === "PLUS" || item.name === "پلس" ? (
                                            <div className="popular_hk">
                                              <h5 className={`pop_tag text-uppercase pricing__most`}>
                                                {i18nData?.most_popular}
                                              </h5>
                                            </div>
                                          ) : null}
                                          <div className="d-flex align-items-center justify-content-between">
                                            <div className="packges-name">
                                              <span className="text-uppercase">
                                                {item?.name}
                                              </span>
                                            </div>



                                          </div>
                                          <div className="priceAmountt my-2">
                                            <span className="text-uppercase me-2 pkr-text">
                                              {i18nData?.pkr}
                                            </span>
                                            <span className="rs-amount">
                                              {item?.discounted_price?.toLocaleString("en-IN")}
                                            </span>
                                          </div>
                                          <div className="checkMarkPoints">
                                            <ul className="ps-0">
                                              {item?.header?.map((monthlyHeaders) => (
                                                <li className={`d-flex align-items-center ${monthlyHeaders?.icon?.includes('cross.svg') ? 'greyColor' : ''}`}>
                                                  <Image width={15} height={15} src={monthlyHeaders?.icon} alt="icon" />
                                                  <span className="ms-2">
                                                    {monthlyHeaders?.title}
                                                  </span>
                                                </li>
                                              ))}
                                            </ul>
                                            {userData?.subscription?.is_weekly == true ? (
                                              <button
                                                type="submit"
                                                style={{ maxWidth: "100%" }}
                                                className={`text-white w-100 btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn ${(condition1 || condition2 || isCorporate || condition3) ? 'pricing_package_disabled' : ''}`}
                                                onClick={(e) =>
                                                  checkUser(e, item?.id)
                                                }
                                              >
                                                {i18nData?.buy_plan}
                                              </button>
                                            ) : (
                                              <button
                                                type="submit"
                                                style={{ maxWidth: "100%" }}
                                                className={`text-white w-100 btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn ${(condition1 || condition2 || isCorporate || condition3) ? 'pricing_package_disabled' : ''}`}
                                                onClick={(e) =>
                                                  checkUser(e, item?.id)
                                                }
                                                disabled={(condition1 || condition2 || condition3 || isCorporate)}
                                              >
                                                {(condition1 || condition2 || condition3 || isCorporate) || !isAuthorized ?
                                                  i18nData?.buy_plan : i18nData?.upgrade_package
                                                }
                                              </button>
                                            )}
                                            <Accordion className="mobilePricingTable">
                                              <Accordion.Item eventKey="1">
                                                <Accordion.Body className="p-0">
                                                  <div className="hrmt-0 ss">
                                                    <hr />
                                                  </div>
                                                  <div className="px-0">
                                                    {item?.footer?.length > 0 && item?.footer?.map((PackageFooter, index) => (
                                                      PackageFooter?.status ? (
                                                        <div key={index} className="d-flex align-items-start marginBottmArea">
                                                          <div className="icon_area">
                                                            <Image
                                                              src={PackageFooter?.icon}
                                                              alt="vitalss icons"
                                                              className="img-fluid"
                                                              height={15}
                                                              width={15}
                                                            />
                                                          </div>
                                                          <div className="icon_area">
                                                            <h3>
                                                              <span
                                                                style={{
                                                                  color:
                                                                    PackageFooter?.title === 'Health Insurance' || PackageFooter?.title === 'Vital Scan'
                                                                      ? '#19B3B5'
                                                                      : '#0F345A',
                                                                  textDecoration:
                                                                    PackageFooter?.title === 'Vital Scan' || PackageFooter?.title === 'Health Insurance'
                                                                      ? 'underline'
                                                                      : '',
                                                                }}
                                                              >
                                                                {PackageFooter?.title}
                                                              </span>
                                                              {PackageFooter?.has_info_icon && (
                                                                <Image
                                                                  onClick={
                                                                    PackageFooter?.title === 'Vital Scan' ? handleShowVital : handleShowLearn
                                                                  }
                                                                  width={17}
                                                                  height={17}
                                                                  className="redInfoSign"
                                                                  src={Reddanger}
                                                                />
                                                              )}
                                                            </h3>
                                                            <p>{!PackageFooter?.options && PackageFooter?.value_text}</p>
                                                            {PackageFooter?.has_info_icon && PackageFooter?.options && (
                                                              <div className="pt-2">
                                                                {PackageFooter.options.map((option, optIndex) => (
                                                                  <div key={optIndex} className="d-block">
                                                                    <p className="optionsTitle">
                                                                      {option?.title} - <span className="optionsPkr">PKR {option?.value}</span>
                                                                    </p>
                                                                  </div>
                                                                ))}
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>
                                                      ) : null
                                                    ))}
                                                  </div>
                                                </Accordion.Body>
                                                {/* desktop-1  */}
                                                <div className="w-100 text-left py-3">
                                                  <Accordion.Header
                                                    onClick={(e) => handleAccordionToggle(e, "desktop-1")}
                                                    className="showHideDetails"
                                                  >
                                                    <div className="w-100 text-left bg_color__">
                                                      {openAccordionIds?.includes("desktop-1")
                                                        ? i18nData?.hide_details
                                                        : i18nData?.show_details}
                                                    </div>
                                                  </Accordion.Header>
                                                </div>
                                              </Accordion.Item>
                                            </Accordion>
                                          </div>
                                        </div>
                                      </Col>
                                    </>
                                  )
                                })}
                              </>
                            </Row>
                          )}
                        </div>
                        <div className="article num_2 slider_banner_dr bottom_pagination">
                          {isMobile ? (
                            <Slider {...settings}>
                              {onlySubscriptions?.yearly?.length > 0 && onlySubscriptions?.yearly?.map((item) => {
                                const isAuthorized = isLoggedIn && userData?.subscription?.package?.id;
                                const isCancel = userData?.subscription?.is_cancel == 1;
                                const isYearly = userData?.subscription?.is_yearly == 1;
                                const packageId = userData?.subscription?.package?.id;
                                const isCorporate = userData?.is_corporate == true;
                                const condition1 = isAuthorized && isYearly && !isCancel && packageId >= item?.id;
                                const condition3 = isAuthorized && isYearly && isCancel && packageId > item?.id;
                                return (
                                  <Col md={4} className="position-relative responsive__yearly">
                                    {item.name === "PREMIUM" || item.name === "پریمیم" ? (
                                      <div className="popular_hk MA__popularTag">
                                        <h5
                                          className={"heading_taging"}
                                        >
                                          ADDITIONAL BENEFITS
                                        </h5>
                                      </div>
                                    ) : null}
                                    <div className="card bg-white box-shadow pricing-box p-3 text-left">
                                      <div className="d-flex align-items-start justify-content-between urduname">
                                        <div className="packges-name">
                                          <span className="text-uppercase">
                                            {item?.name}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="priceAmountt my-2">
                                        <span className="text-uppercase me-2 pkr-text">
                                          {i18nData?.pkr}
                                        </span>
                                        <span className="rs-amount">
                                          {item?.price?.toLocaleString("en-IN")}
                                        </span>
                                      </div>
                                      <div className="checkMarkPoints">
                                        <ul className="ps-0">
                                          {item?.header?.map((listingPackage) => (
                                            <li className={`d-flex mt-2 align-items-center ${listingPackage?.icon?.includes('cross.svg') ? 'greyColor' : ''}`}>
                                              {/* <Image src={listingPackage?.icon} height={15} width={15} /> */}
                                              {isMobile ? <Image width={15} height={15} src={listingPackage?.icon} /> : <Image width={15} height={15} src={listingPackage?.icon} />}
                                              <span className="ms-2">
                                                {listingPackage?.title}
                                              </span>
                                            </li>
                                          ))}
                                        </ul>
                                        {userData?.subscription?.is_weekly == true ? (
                                          <button
                                            onClick={(e) => checkResponsiveUser(e, item, "yearly")}
                                            style={{ maxWidth: "100%" }}
                                            className="text-white w-100 btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn "
                                          >
                                            {i18nData?.buy_now
                                            }
                                          </button>
                                        ) :
                                          <button
                                            onClick={(e) => checkResponsiveUser(e, item, "yearly")}
                                            style={{ maxWidth: "100%" }}
                                            className={`text-white w-100 btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn ${(condition1 || isCorporate || condition3) && 'pricing_package_disabled'}`}
                                            disabled={condition1 || condition3 || isCorporate}
                                          >
                                            {(condition1 || condition3 || isCorporate) || !isAuthorized ?
                                              i18nData?.buy_now : i18nData?.upgrade_package
                                            }
                                          </button>}
                                      </div>
                                      <Accordion className="mobilePricingTable ">
                                        <Accordion.Item eventKey="1">
                                          <Accordion.Body className="p-0">
                                            <div className="hrmt-0 ss">
                                              <hr />
                                            </div>
                                            <div className="px-0">
                                              {item?.footer?.map((PackageFooter) => (
                                                PackageFooter?.status == true ? (
                                                  <div className="d-flex align-items-start marginBottmArea">
                                                    <div className="icon_area">
                                                      <Image
                                                        src={PackageFooter?.icon}
                                                        alt="vitalss icons"
                                                        className="img-fluid"
                                                        height={15} width={15}
                                                      />
                                                    </div>
                                                    <div className="icon_area">
                                                      <h3 className="d-flex">
                                                        <span style={{ color: PackageFooter?.title == 'Health Insurance' || PackageFooter?.title == "Vital Scan" ? '#19B3B5' : "#0F345A", textDecoration: PackageFooter?.title == "Vital Scan" || PackageFooter?.title == "Health Insurance" ? 'underline' : '' }}>{PackageFooter?.title}</span>
                                                        {PackageFooter?.has_info_icon == true ? <Image onClick={PackageFooter?.title == "Vital Scan" ? handleShowVital : handleShowLearn} width={17} height={17} className="redInfoSign" src={Reddanger} /> : null
                                                        }
                                                      </h3>
                                                      <p>
                                                        {!PackageFooter?.options && (
                                                          PackageFooter?.value_text
                                                        )}
                                                      </p>
                                                      <p className="pt-2">
                                                        {PackageFooter?.has_info_icon == true && PackageFooter?.options !== null && (
                                                          PackageFooter?.options?.map((options) => (
                                                            <div className="d-block">
                                                              <p className="optionsTitle" >{options?.title} - <span className="optionsPkr">PKR {options?.value}</span></p>
                                                            </div>
                                                          ))
                                                        )}
                                                      </p>
                                                    </div>
                                                  </div>
                                                ) : null

                                              ))}
                                            </div>
                                          </Accordion.Body>
                                          {/* desktop-1  */}
                                          <div className="w-100 text-left py-3">
                                            <Accordion.Header
                                              onClick={(e) =>
                                                handleAccordionToggle(
                                                  e,
                                                  "desktop-1"
                                                )
                                              }
                                              className="showHideDetails"
                                            >
                                              <div className="w-100 text-left">
                                                <button
                                                  onClick={(e) =>
                                                    handleAccordionToggle(
                                                      e,
                                                      "desktop-1"
                                                    )
                                                  }
                                                  className="showHideDetails"
                                                >
                                                  {openAccordionIds?.includes(
                                                    "desktop-1"
                                                  )
                                                    ? i18nData?.hide_details
                                                    : i18nData?.show_details}
                                                </button>
                                              </div>
                                            </Accordion.Header>
                                          </div>
                                        </Accordion.Item>
                                      </Accordion>
                                    </div>

                                  </Col>
                                )
                              })}
                            </Slider>
                          ) : (
                            <Row className="">
                              <>
                                {onlySubscriptions?.yearly?.length > 0 && onlySubscriptions?.yearly?.map((item) => {
                                  const isAuthorized = isLoggedIn && userData?.subscription?.package?.id;
                                  const isCancel = userData?.subscription?.is_cancel == 1;
                                  const isYearly = userData?.subscription?.is_yearly == 1;
                                  const packageId = userData?.subscription?.package?.id;
                                  const isCorporate = userData?.is_corporate == true;
                                  const condition1 = isAuthorized && isYearly && !isCancel && packageId >= item?.id;
                                  const condition3 = isAuthorized && isYearly && isCancel && packageId > item?.id;
                                  return (
                                    <>
                                      <Col md={4}>
                                        <div className="card bg-white box-shadow pricing-box p-3 text-left dd">

                                          {item.name === "PREMIUM" || item.name === "پریمیم" ? (
                                            <div className="popular_hk MA__popularTag">
                                              <h5
                                                className={"heading_taging"}
                                              >
                                                ADDITIONAL BENEFITS
                                              </h5>
                                            </div>
                                          ) : null}
                                          <div className="d-flex align-items-center justify-content-between">
                                            <div className="packges-name">
                                              <span className="text-uppercase">
                                                {item?.name}
                                              </span>
                                            </div>
                                          </div>

                                          <div className="priceAmountt my-2">
                                            <span className="text-uppercase me-2 pkr-text">
                                              {i18nData?.pkr}
                                            </span>
                                            <span className="rs-amount">
                                              {item?.discounted_price?.toLocaleString("en-IN")}
                                            </span>
                                          </div>
                                          <div className="checkMarkPoints">
                                            <ul className="ps-0">
                                              {item?.header?.map((monthlyHeaders) => (
                                                <li className={`d-flex align-items-center ${monthlyHeaders?.icon?.includes('cross.svg') ? 'greyColor' : ''}`}>
                                                  <Image width={15} height={15} src={monthlyHeaders?.icon} onClick={monthlyHeaders?.title == "Vital Scan" ? handleShowVital : handleShowLearn} />
                                                  <span className="ms-2">
                                                    {monthlyHeaders?.title}
                                                  </span>
                                                </li>
                                              ))}
                                            </ul>
                                            {userData?.subscription?.is_weekly == true ? (
                                              <button
                                                type="submit"
                                                style={{ maxWidth: "100%" }}
                                                className={`text-white w-100 btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn ${(condition1 || isCorporate || condition2 || condition3) ? 'pricing_package_disabled' : ''}`}
                                                onClick={(e) =>
                                                  checkUser(e, item?.id)
                                                }
                                              >
                                                {i18nData?.buy_plan}
                                              </button>
                                            ) : (
                                              <button
                                                type="submit"
                                                style={{ maxWidth: "100%" }}
                                                className={`text-white w-100 btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn ${(condition1 || isCorporate || condition2 || condition3) ? 'pricing_package_disabled' : ''}`}
                                                onClick={(e) =>
                                                  checkUser(e, item?.id)
                                                }
                                                disabled={(condition1 || isCorporate || condition2 || condition3)}
                                              >
                                                {(condition1 || isCorporate || condition2 || condition3) || !isAuthorized ?
                                                  i18nData?.buy_plan : i18nData?.upgrade_package
                                                }
                                              </button>
                                            )}

                                            <Accordion className="mobilePricingTable ">
                                              <Accordion.Item eventKey="1">
                                                <Accordion.Body className="p-0">
                                                  <div class="hrmt-0 ss">
                                                    <hr />
                                                  </div>
                                                  <div class="px-0">
                                                    {item?.footer?.map((PackageFooter) => (
                                                      PackageFooter?.status == true ? (
                                                        <div class="d-flex align-items-start marginBottmArea">
                                                          <div class="icon_area">
                                                            <Image
                                                              src={PackageFooter?.icon}
                                                              alt="vitalss icons"
                                                              className="img-fluid"
                                                              height={15} width={15}
                                                            />
                                                          </div>
                                                          <div class="icon_area">
                                                            <h3>
                                                              <span style={{ color: PackageFooter?.title == 'Health Insurance' || PackageFooter?.title == "Vital Scan" ? '#19B3B5' : "#0F345A", textDecoration: PackageFooter?.title == "Vital Scan" || PackageFooter?.title == "Health Insurance" ? 'underline' : '' }}>{PackageFooter?.title}</span>
                                                              {PackageFooter?.has_info_icon == true ? <Image onClick={PackageFooter?.title == "Vital Scan" ? handleShowVital : handleShowLearn} width={17} height={17} className="redInfoSign" src={Reddanger} /> : null
                                                              }
                                                            </h3>
                                                            <p>
                                                              {!PackageFooter?.options && (
                                                                PackageFooter?.value_text
                                                              )}
                                                            </p>
                                                            <p className="pt-2">
                                                              {PackageFooter?.has_info_icon == true && PackageFooter?.options !== null && (
                                                                PackageFooter?.options?.map((options) => (
                                                                  <div className="d-block">
                                                                    <p className="optionsTitle" >{options?.title} - <span className="optionsPkr">PKR {options?.value}</span></p>
                                                                  </div>
                                                                ))
                                                              )}
                                                            </p>
                                                          </div>
                                                        </div>
                                                      ) : null

                                                    ))}
                                                  </div>
                                                </Accordion.Body>
                                                {/* desktop-1  */}
                                                <div className="w-100 text-left py-3">
                                                  <Accordion.Header
                                                    onClick={(e) => handleAccordionToggle(e, "desktop-1")}
                                                    className="showHideDetails"
                                                  >
                                                    <div className="w-100 text-left bg_color__">
                                                      {openAccordionIds?.includes("desktop-1")
                                                        ? i18nData?.hide_details
                                                        : i18nData?.show_details}
                                                    </div>
                                                  </Accordion.Header>
                                                </div>
                                              </Accordion.Item>
                                            </Accordion>
                                          </div>
                                        </div>
                                      </Col>
                                    </>
                                  )
                                })}
                              </>
                            </Row>
                          )}
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>
              </Container>
            </div>
          </Container>
        </div>
      </section>
      <VitalScan
        showVitalScan={showVitalScan}
        handleCloseVital={handleCloseVital}
        handleShowVital={handleShowVital}
      />
      <LearnMoreModal
        getInsuranceInfo={getInsuranceInfo}
        showLearn={showLearn}
        handleCloseLearn={handleCloseLearn}
        handleShowLearn={handleShowLearn}
      />
    </>
  );
}

export default PricingTable;
