import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import API from "@/utils/httpService";
import { useRouter } from "next/router";
import Accordion from "react-bootstrap/Accordion";
import Reddanger from "../../public/svg/Reddanger.svg";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Slider from "react-slick";
import ModalVitals from '../modalVitals/ModalVitals';
import LearnMoreModal from "../learnMoreModal/LearnMoreModal";
import VitalScan from "../vitalScan/VitalScan";
import { isMobile } from "react-device-detect";
import mixpanel from "mixpanel-browser";

export default function PricingTablePage({ pricingTableData, onlySubscription }) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [openAccordionIds, setOpenAccordionIds] = useState([]);
  const [showVitals, setShowVitals] = useState(false)
  const [inPricing, setInPricing] = useState(false)
  const handleClose = () => setShowVitals(false);
  const handleShow = () => setShowVitals(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [showLearn, setShowLearn] = useState(false);
  const [showVitalScan, setShowVitalScan] = useState(false);
  const [getInsuranceInfo, setGetInsuranceInfo] = useState({})
  const router = useRouter();

  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  const handleCloseLearn = () => setShowLearn(false);
  const handleShowLearn = () => setShowLearn(true);
  const handleCloseVital = () => setShowVitalScan(false);
  const handleShowVital = () => setShowVitalScan(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);


  useEffect(() => {
    if (router.pathname === "/pricing") {
      setInPricing(true)
    }
  }, [router.pathname]);

  const handleAccordionToggle = (id, item) => {
    mixpanel.track('View packages', {
      package: item?.name
    });
    if (openAccordionIds.includes(id)) {
      setOpenAccordionIds(openAccordionIds.filter((accId) => accId !== id));
    } else {
      setOpenAccordionIds([...openAccordionIds, id]);
    }
  };

  const checkUser = (e, item, yearly) => {
    const authorization = Cookies.get("Authorization");
    if (authorization && yearly) {
      if (item?.has_insurance == true) {
        Cookies.set('hasInsurance', true)
        window.location.href = `/order/${item?.id}?yearly=yearly`;
      } else {
        Cookies.remove('hasInsurance')
        window.location.href = `/order/${item?.id}?yearly=yearly`;
      }
    } else if (authorization) {
      // console.log(item,'2')
      if (item?.has_insurance == true) {
        Cookies.set('hasInsurance', true)
        window.location.href = `/order/${item?.id}`;
      } else {
        Cookies.remove('hasInsurance')
        window.location.href = `/order/${item?.id}`;

      }
    } else {
      Cookies.set('pricingLogin', true)
      window.location.href = "/phone-number";
    }
  };

  const checkResponsiveUser = (e, item, yearly) => {

    const authorization = Cookies.get("Authorization");
    if (authorization && yearly) {
      if (item?.has_health_insurance == true) {
        Cookies.set('hasInsurance', true)
        window.location.href = `/order/${item?.id}?yearly=yearly`;
      } else {

        Cookies.remove('hasInsurance')
        window.location.href = `/order/${item?.id}?yearly=yearly`;
      }
    } else if (authorization) {
      if (item?.has_health_insurance == true) {
        Cookies.set('hasInsurance', true)
        window.location.href = `/order/${item?.id}`;
      } else {
        Cookies.remove('hasInsurance')
        window.location.href = `/order/${item?.id}`;

      }
    } else {
      Cookies.set('pricingLogin', true)
      window.location.href = "/phone-number";
    }
  };

  const settings1 = {
    arrow: false,
    infinite: false,
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [value, setValue] = React.useState("monthly");
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
    Cookies.remove('hasInsurance')

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


  return (
    <Container className="px-0 pricingTableHome">
      <Row>
        <Col md={12} className="text-center">
          <div className="mobile_hide_pricing">
            {/* <h3 className="pricing_select_plaHead" onClick={()=> setShowVitals(true)}> Select A Plan </h3> */}
            <div value={value}>
              <div className="d-flex align-items-center justify-content-center">
                <div className="pricing-tabss">
                  <div className="d-flex align-items-center justify-content-center position-relative">
                    {/* <h3
                      className="ff-Circular fw-400 me-4"
                      style={{ color: "#0F345A" }}
                    >
                      {i18nData?.pay}
                    </h3> */}
                    <ul class="tabs-block nav-tabs">
                      <li class="active" data-menu="1">
                        <button>
                          {i18nData?.monthly}
                          {/* Weekly */}
                        </button>
                      </li>
                      <li data-menu="2">
                        <button>
                          {i18nData?.yearly}
                          {/* Monthly */}
                        </button>
                      </li>
                      <div class="label"></div>
                      <span className="off_disc text-uppercase">
                        {/* {i18nData?.fifty_off} */}
                        {`${pricingTableData?.discounted_percent_yearly}%`}{" "}
                        {i18nData?.off}
                        {/* EXTRA FEATURES */}
                      </span>
                    </ul>
                  </div>


                  {/* for web desktop  */}
                  <div class="article-block">
                    <div class="article num_1 show  ">
                      <Row className="">
                        <div className="outside-content">
                          {" "}
                          <div>
                            <div className="pt-5 table-responsive p-2">
                              <div className="pricingBoxTable pricingTabing">
                                <Table className="">
                                  <thead>
                                    <tr>
                                      <th valign="middle midle_select">
                                        <div className="wraperHeads">
                                          <h3 className="ff-Circular fw-450 head_pricing_select">
                                            {i18nData?.select_a_plan}
                                          </h3>
                                          <p className="table-detail-para para_pricing_select">
                                            {i18nData?.valid_30_days}
                                          </p>
                                        </div>
                                      </th>

                                      {pricingTableData?.monthly?.header?.map((item) => {
                                        const isAuthorized =
                                          isLoggedIn && userData?.subscription?.package?.id;
                                        const isCancel = userData?.subscription?.is_cancel == 1;
                                        const isYearly = userData?.subscription?.is_yearly == 1;
                                        const isCorporate = userData?.is_corporate == true;
                                        const packageId = userData?.subscription?.package?.id;
                                        const condition1 = isAuthorized && isYearly;
                                        const condition2 =
                                          isAuthorized && !isYearly && isCancel && packageId > item?.id;
                                        const condition3 =
                                          isAuthorized && !isYearly && !isCancel && packageId >= item?.id;
                                        return (
                                          <td>
                                            <div>
                                              {item.name === "PLUS" || item.name === "پلس" || item?.is_popular ? (
                                                <div className="popular_hk">
                                                  <h5 className={inPricing ? "pop_tag text-uppercase pricing__most" : "pop_tag text-uppercase"}>
                                                    {i18nData?.most_popular}
                                                  </h5>
                                                </div>
                                              ) : null}

                                              <h5 className="subs__tile_MA">{item.name}</h5>
                                              <h4 className="fw-400 ff-Circular mb-2 urdu_flex rupees_wrape_MA">
                                                <span className="rupees-small rupees-small_MA">
                                                  {item.price === 0 ? "" : i18nData?.pkr}
                                                </span>

                                                {item.price === 0
                                                  ? "Free"
                                                  : item.price?.toLocaleString("en-IN")}
                                              </h4>
                                              {userData?.subscription?.is_weekly == true ? (
                                                <Button
                                                  className="fw-500 btn__MA btn btn-lg btn-pricingBuy ff-Circular"
                                                  onClick={(e) => checkUser(e, item)}
                                                >
                                                  BUY NOW
                                                </Button>
                                              ) : (
                                                <Button
                                                  className={`fw-500 btn__MA btn btn-lg btn-pricingBuy ff-Circular ${condition1 || condition2 || condition3 || isCorporate
                                                    ? "pricing_package_disabled"
                                                    : ""
                                                    }`}
                                                  onClick={(e) => checkUser(e, item)}
                                                  disabled={condition1 || condition2 || condition3 || isCorporate}
                                                >
                                                  BUY NOW
                                                </Button>
                                              )}
                                            </div>
                                          </td>
                                        );
                                        // })
                                        // )
                                      })}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {pricingTableData?.monthly?.footer?.map((row, rowIndex) => (

                                      <tr key={rowIndex}>
                                        <td>
                                          <div className="d-flex align-items-start text-left">
                                            <Image
                                              src={row[0][0]?.icon}
                                              alt="scan limit"
                                              className="img-fluid iconssss_sma"
                                              width={24}
                                              height={24}
                                            />
                                            <div className={`ms-3 ${row[0][0]?.title == "Health Insurance" || row[0][0]?.title == "Health Assessment" ? 'me-5' : null} `}>
                                              <h5 className={row[0][0]?.title == "Vital Scan" || row[0][0]?.title == "Health Insurance" ? "green_textt fw-400 ff-Circular" : "mainHeaading01 fw-400 ff-Circular"}>
                                                {row[0][0]?.title}
                                                {row[0][0].has_info_icon == true ? (
                                                  <>
                                                    <Image onClick={row[0][0]?.title == "Vital Scan" ? handleShowVital : handleShowLearn} className="infooo" src={Reddanger} width={24} height={24} />
                                                  </>
                                                ) : null}
                                              </h5>
                                              <p className="table-detail-para fs-16 dd">
                                                {row[0][0]?.description}
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                        {row?.[0]?.slice(1)?.map((pack, index) => (
                                          <td key={index} valign="middle" className="tick-green-svg">
                                            {!pack?.has_insurance == true ? (
                                              <>
                                                {!pack?.is_icon_show == true ? (
                                                  <>
                                                    <p className="vital-title">{pack?.title}</p>
                                                  </>
                                                ) : (
                                                  <>
                                                    <Image
                                                      src={pack?.icon2}
                                                      alt="scan limit"
                                                      className="img-fluid iconssss_sma"
                                                      width={24}
                                                      height={24}
                                                    />
                                                  </>
                                                )}
                                              </>
                                            ) : (
                                              <>
                                                {pack?.options?.map((option) => {
                                                  return (
                                                    <>
                                                      {!pack?.is_icon_show == true ? (
                                                        <>
                                                          <h4 className="pack_options">{`${option?.title} - `} {option?.title == 'Accidental Coverage' ? <br /> : ''} <b style={{ wordSpacing: "-3px" }}>PKR {option?.value?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b></h4>
                                                        </>
                                                      ) : null}
                                                    </>
                                                  )
                                                })}
                                                {pack?.is_icon_show == true && (
                                                  <>
                                                    <Image
                                                      src={pack?.icon2}
                                                      alt="scan limit"
                                                      className="img-fluid icon_check_cross"
                                                      width={24}
                                                      height={24}
                                                    />
                                                  </>
                                                )}
                                              </>
                                            )}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Row>
                    </div>
                    <div class="article num_2">
                      <Row className="">
                        <div className="outside-content">
                          {" "}
                          <div>
                            <div className="pt-5 table-responsive p-2">
                              <div className="pricingBoxTable pricingTabing">
                                <Table className="">
                                  <thead>
                                    <tr>
                                      <th valign="middle midle_select">
                                        <div className="wraperHeads">
                                          <h3 className="ff-Circular fw-400 head_pricing_select">
                                            {i18nData?.select_a_plan}
                                          </h3>
                                          <p className="table-detail-para para_pricing_select">
                                            {i18nData?.valid_365_days}
                                          </p>
                                        </div>
                                      </th>
                                      {pricingTableData?.yearly?.header?.map((item) => {
                                        const isAuthorized =
                                          isLoggedIn && userData?.subscription?.package?.id;
                                        const isCancel = userData?.subscription?.is_cancel == 1;
                                        const isYearly = userData?.subscription?.is_yearly == 1;
                                        const packageId = userData?.subscription?.package?.id;
                                        const isCorporate = userData?.is_corporate == true;
                                        const condition1 = isAuthorized && isYearly && !isCancel && packageId >= item?.id;
                                        // const condition2 =
                                        //   isAuthorized && !isYearly && isCancel && packageId > item?.id;
                                        const condition3 =
                                          isAuthorized && isYearly && isCancel && packageId > item?.id;
                                        // return (
                                        // header?.slice(1)?.map((item) => {

                                        return (
                                          <td>
                                            <div>
                                              {item.name === "PREMIUM" || item.name === "پریمیم" || item.is_additional_benefits ? (
                                                <div className="popular_hk MA__popularTag">
                                                  <h5
                                                    className={"heading_taging"}
                                                  >
                                                    ADDITIONAL BENEFITS
                                                  </h5>
                                                </div>
                                              ) : null}

                                              <h5 className="subs__tile_MA">{item.name}</h5>
                                              <h4 className=" fw-400 ff-Circular mb-2 urdu_flex rupees_wrape_MA">
                                                <span className="rupees-small rupees-small_MA">
                                                  {item.price === 0 ? "" : i18nData?.pkr}
                                                </span>
                                                {item.price === 0
                                                  ? "Free"
                                                  : item.price?.toLocaleString("en-IN")}
                                              </h4>
                                              {userData?.subscription?.is_weekly == true ? (
                                                <Button
                                                  className="fw-500  btn__MA btn btn-lg btn-pricingBuy ff-Circular"
                                                  onClick={(e) => checkUser(e, item, 'yearly')}

                                                >
                                                  BUY NOW
                                                </Button>
                                              ) : (
                                                <Button
                                                  className={`fw-500 btn__MA btn btn-lg btn-pricingBuy ff-Circular ${condition1 || condition3 || isCorporate
                                                    ? "pricing_package_disabled"
                                                    : ""
                                                    }`}
                                                  onClick={(e) => checkUser(e, item, 'yearly')}

                                                  disabled={condition1 || condition3 || isCorporate}
                                                >
                                                  BUY NOW
                                                </Button>
                                              )}
                                            </div>
                                          </td>
                                        );
                                        // })
                                        // )
                                      })}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {pricingTableData?.yearly?.footer?.map((row, rowIndex) => (
                                      <tr key={rowIndex}>
                                        <td>
                                          <div className="d-flex align-items-start text-left">
                                            <Image
                                              src={row[0][0]?.icon}
                                              alt="scan limit "
                                              className="img-fluid iconssss_sma"
                                              width={24}
                                              height={24}
                                            />
                                            <div className={`ms-3 ${row[0][0]?.title == "Health Insurance" || row[0][0]?.title == "Health Assessment" ? 'me-5' : null} `}>
                                              <h5 style={{ textDecoration: row[0][0]?.title == "Vital Scan" || row[0][0]?.title == "Health Insurance" ? "underline" : '' }} className={row[0][0]?.title == "Vital Scan" || row[0][0]?.title == "Health Insurance" ? "green_textt fw-400 ff-Circular" : " fw-400 ff-Circular"}>
                                                {row[0][0]?.title}
                                                {row[0][0].has_info_icon == true ? (
                                                  <>
                                                    <Image onClick={row[0][0]?.title == "Vital Scan" ? handleShowVital : handleShowLearn} className="infooo" src={Reddanger} width={20} height={20} />
                                                  </>
                                                ) : null}
                                              </h5>
                                              <p className="table-detail-para fs-16 sss">
                                                {row[0][0]?.description}
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                        {row?.[0]?.slice(1)?.map((pack, index) => (
                                          <td key={index} valign="middle" className="tick-green-svg">
                                            {!pack?.has_insurance == true ? (
                                              <>
                                                {!pack?.is_icon_show == true ? (
                                                  <>
                                                    <p className="vital-title">{pack?.title}</p>
                                                  </>
                                                ) : (
                                                  <>
                                                    <Image
                                                      src={pack?.icon2}
                                                      alt="scan limit"
                                                      className="img-fluid iconssss_sma"
                                                      width={24}
                                                      height={24}
                                                    />
                                                  </>
                                                )}
                                              </>
                                            ) : (
                                              <>
                                                {pack?.options?.map((option) => {
                                                  return (
                                                    <>
                                                      {!pack?.is_icon_show == true ? (
                                                        <>
                                                          <h4 className="pack_options">{`${option?.title} - `} {option?.title == 'Accidental Coverage' ? <br /> : ''} <b>PKR {option?.value?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b></h4>
                                                        </>
                                                      ) : null}
                                                    </>
                                                  )
                                                })}
                                                {pack?.is_icon_show == true && (
                                                  <>
                                                    <Image
                                                      src={pack?.icon2}
                                                      alt="scan limit"
                                                      className="img-fluid icon_check_cross"
                                                      width={24}
                                                      height={24}
                                                    />
                                                  </>
                                                )}
                                              </>
                                            )}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* for resp  */}
          <div className="mobile_show_pricing mt-5">
            <div value={value}>
              <div className="d-mdflex align-items-center justify-content-center">
                <h3
                  className="ff-Circular fontFamily fw-400 me-4 d-block d-lg-none pb-4 color_head_pricing"
                  style={{ color: "#0F345A" }}
                >
                  {i18nData?.select_plan}
                </h3>
                <div className="d-flex align-items-center justify-content-center position-relative">
                  {/* <h3
                    className="ff-Circular fw-400 me-4  d-none d-lg-block"
                    style={{ color: "#0F345A" }}
                  >
                    {i18nData?.pay}
                  </h3> */}
                  <ul class="tabs-block nav-tabs tabing_top">
                    <li class="active" data-menu="1">
                      <button>
                        {i18nData?.monthly}
                        {/* Weekly */}
                      </button>
                    </li>
                    <li data-menu="2">
                      <button>
                        {i18nData?.yearly}
                        {/* Monthly */}
                      </button>
                    </li>
                    <div class="label"></div>
                    <span className="off_disc text-uppercase">
                      {/* {i18nData?.fifty_off} */}
                      {`${pricingTableData?.discounted_percent_yearly}%`}{" "}
                      {i18nData?.off}
                      {/* EXTRA FEATURES */}
                    </span>
                  </ul>
                </div>
              </div>
              <div class="article-block">
                <div class="article num_1 slider_banner_dr bottom_pagination show dd dd">
                  <div value="monthly">
                    <div className="mt-0 pt-5 table-responsive p-2 text-center mobilePricingTable dd">
                      <Accordion
                        defaultActiveKey
                        className="row accordionMobileRow sehatscan_page dd m-0 pt-5"
                      >
                        <Slider {...settings1}>
                          {onlySubscription?.monthly?.map((item) => {
                            const isAuthorized = isLoggedIn && userData?.subscription?.package?.id;
                            const isCancel = userData?.subscription?.is_cancel == 1;
                            const isYearly = userData?.subscription?.is_yearly == 1;
                            const packageId = userData?.subscription?.package?.id;
                            const condition1 = isAuthorized && isYearly;
                            const condition2 =
                              isAuthorized && !isYearly && isCancel && packageId > item?.id;
                            const isCorporate = userData?.is_corporate == true;
                            const condition3 =
                              isAuthorized && !isYearly && !isCancel && packageId >= item?.id;

                            return (
                              <Accordion.Item eventKey={item?.id} className={`${item?.name === "PLUS" ||
                                item?.name === "پلس" || item?.is_popular ? 'borderForPopularPricing' : ''} p-0`}>
                                <div className="w-100 text-left p-3">
                                  {item?.name === "PLUS" ||
                                    item?.name === "پلس" || item?.is_popular ? (
                                    <div className="popular-tag text-center">
                                      <span className="">
                                        {/* {i18n.t("most_popular")}{" "} */}
                                        {i18nData?.most_popular}
                                      </span>
                                    </div>
                                  ) : null}
                                  <div className="d-flex align-items-start justify-content-between urduname">
                                    <div className="packges-name">
                                      <span className="text-uppercase">
                                        {item?.name}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="priceAmountt my-2 d-flex align-items-center">
                                    <span className="text-uppercase me-2 pkr-text">
                                      {i18nData?.pkr}
                                    </span>
                                    <span className="rs-amount">
                                      {item?.price}
                                    </span>
                                  </div>
                                  <div className="checkMarkPoints">
                                    <ul className="ps-0">
                                      {item?.header?.map((monthlyHeaders) => (
                                        <li className={`d-flex mt-2 align-items-center ${monthlyHeaders?.icon?.includes('cross.svg') ? 'greyColor' : ''}`}>
                                          {isMobile ? <Image width={15} className={monthlyHeaders?.icon?.includes('cross.svg') ? 'grayIcon' : ''} height={15} src={monthlyHeaders?.icon} /> : <Image width={15} height={15} src={monthlyHeaders?.icon} className={monthlyHeaders?.icon?.includes('cross.svg') ? 'grayIcon' : ''} />}
                                          <span className={monthlyHeaders?.icon == "https://staging.merisehat.pk/portal/assets/img/cross.svg" ? "cross_text ms-2" : "ms-2"}>
                                            {monthlyHeaders?.title}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                    {userData?.subscription?.is_weekly == true ? (
                                      <button
                                        onClick={(e) => checkResponsiveUser(e, item)}
                                        style={{ maxWidth: "100%" }}
                                        className="fw-500  text-white w-100 btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn"

                                      >
                                        {i18nData?.buy_now}
                                      </button>
                                    ) :
                                      <button
                                        onClick={(e) => checkResponsiveUser(e, item)}
                                        style={{ maxWidth: "100%" }}
                                        className={`fw-500  text-white w-100 btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn ${(condition1 || condition2 || condition3) ? 'pricing_package_disabled' : ''}`}
                                        disabled={condition1 || condition2 || condition3 || isCorporate}
                                      >
                                        {(condition1 || condition2 || isCorporate || condition3) || !isAuthorized ?
                                          i18nData?.buy_now : i18nData?.upgrade_package
                                        }
                                      </button>}

                                  </div>

                                </div>
                                <Accordion.Body className="p-0">
                                  <div className="hrmt-0 ss">
                                    <hr></hr>
                                  </div>
                                  <div className="px-3">
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
                                            <div className="d-flex">
                                              <h3
                                                style={{
                                                  color:
                                                    PackageFooter?.title ==
                                                      "Health Insurance" ||
                                                      PackageFooter?.title ==
                                                      "Vital Scan"
                                                      ? "#19B3B5"
                                                      : "#0F345A",
                                                  display: "flex",
                                                  textDecoration:
                                                    PackageFooter?.title ==
                                                      "Vital Scan" ||
                                                      PackageFooter?.title ==
                                                      "Health Insurance"
                                                      ? "underline"
                                                      : "",
                                                }}
                                              >
                                                {PackageFooter?.title}
                                              </h3>
                                              {
                                                PackageFooter?.has_info_icon == true ? <Image onClick={PackageFooter?.title == "Vital Scan" ? handleShowVital : handleShowLearn} className="redInfoSign" src={Reddanger} /> : null
                                              }

                                            </div>
                                            <p>
                                              {PackageFooter?.has_info_icon == true && PackageFooter?.options != null ? (
                                                PackageFooter?.options?.map((options) => (
                                                  <div className="d-block">
                                                    <p className="optionsTitle" >{options?.title} - <span className="optionsPkr">PKR {options?.value}</span></p>
                                                  </div>
                                                ))
                                              ) : <p className="pkgeDescription">{PackageFooter?.value_text}</p>}
                                            </p>
                                          </div>
                                        </div>
                                      ) : null
                                    ))}
                                  </div>
                                </Accordion.Body>
                                <Accordion.Header
                                  onClick={() => handleAccordionToggle(item?.id, item)}
                                >
                                  <div className="w-100 text-left py-3">
                                    <button
                                      onClick={handleAccordionToggle}
                                      className="showHideDetails"
                                    >
                                      {/* {isAccordionOpen ? 'Hide Details' : 'Show Details'} */}
                                      {openAccordionIds.includes(item?.id)
                                        ? i18nData?.hide_details
                                        : i18nData?.show_details}
                                    </button>
                                  </div>
                                </Accordion.Header>
                              </Accordion.Item>
                            )
                          })}
                        </Slider>
                      </Accordion>
                    </div>
                  </div>
                </div>
                <div class="article num_2 slider_banner_dr bottom_pagination">
                  <div value="yearly">
                    <div className="mt-0 pt-5 table-responsive p-2 text-center mobilePricingTable">
                      <Accordion
                        defaultActiveKey
                        className="row accordionMobileRow m-0 pt-5 sehatscan_page"
                      >
                        <Slider {...settings1}>
                          {onlySubscription?.yearly?.map((item) => {
                            const isAuthorized = isLoggedIn && userData?.subscription?.package?.id;
                            const isCancel = userData?.subscription?.is_cancel == 1;
                            const isYearly = userData?.subscription?.is_yearly == 1;
                            const packageId = userData?.subscription?.package?.id;
                            const condition1 = isAuthorized && isYearly && !isCancel && packageId >= item?.id;
                            const condition3 = isAuthorized && isYearly && isCancel && packageId > item?.id;
                            const isCorporate = userData?.is_corporate == true;
                            return (
                              <Accordion.Item eventKey={item?.id} className={`${item?.name === "PLUS" ||
                                item?.name === "پلس" || item?.is_additional_benefits == true ? 'borderForPopularPricing' : ''} p-0`}>
                                <div className="w-100 text-left p-3">
                                  {item?.name === "PREMIUM" || item?.name === "پریمیم" || item?.is_additional_benefits == true ? (
                                    <div className="popular-tag text-center">
                                      <span className="">
                                        ADDITIONAL BENEFITS
                                      </span>
                                    </div>
                                  ) : null}
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
                                      {item?.price}
                                    </span>
                                  </div>
                                  <div className="checkMarkPoints">
                                    <ul className="ps-0">
                                      {item?.header?.map((listingPackage) => (
                                        <li className={`d-flex mt-2 align-items-center ${listingPackage?.icon?.includes('cross.svg') ? 'greyColor' : ''}`}>
                                          {/* <Image src={listingPackage?.icon} height={15} width={15} /> */}
                                          {isMobile ? <Image width={15} className={listingPackage?.icon == "https://staging.merisehat.pk/portal/assets/img/cross.svg" ? 'grayIcon' : ''} height={15} src={listingPackage?.icon} /> : <Image width={15} height={15} src={listingPackage?.icon} />}
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
                                        className="fw-500  text-white w-100 btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn "
                                      >
                                        {i18nData?.buy_now
                                        }
                                      </button>
                                    ) :
                                      <button
                                        onClick={(e) => checkResponsiveUser(e, item, "yearly")}
                                        style={{ maxWidth: "100%" }}
                                        className={`fw-500  text-white w-100 btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn ${(condition1) && 'pricing_package_disabled'}`}
                                        disabled={condition1 || condition3 || isCorporate}
                                      >
                                        {(condition1 || condition3 || isCorporate) || !isAuthorized ?
                                          i18nData?.buy_now : i18nData?.upgrade_package
                                        }
                                      </button>}
                                  </div>
                                </div>

                                <Accordion.Body className="p-0">
                                  <div className="hrmt-0">
                                    <hr></hr>
                                  </div>
                                  <div className="px-3">
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
                                            <div className="d-flex">
                                              <h3
                                                style={{
                                                  color:
                                                    PackageFooter?.title ==
                                                      "Health Insurance" ||
                                                      PackageFooter?.title ==
                                                      "Vital Scan"
                                                      ? "#19B3B5"
                                                      : "#0F345A",
                                                  display: "flex",
                                                  textDecoration:
                                                    PackageFooter?.title ==
                                                      "Vital Scan" ||
                                                      PackageFooter?.title ==
                                                      "Health Insurance"
                                                      ? "underline"
                                                      : "",
                                                }}
                                              >
                                                {PackageFooter?.title}
                                              </h3>{
                                                PackageFooter?.has_info_icon == true ? <Image onClick={PackageFooter?.title == "Vital Scan" ? handleShowVital : handleShowLearn} className="redInfoSign" src={Reddanger} /> : null
                                              }
                                            </div>
                                            <p>
                                              {PackageFooter?.has_info_icon == true && PackageFooter?.options != null ? (
                                                PackageFooter?.options?.map((options) => (
                                                  <div className="d-block">
                                                    <p className="optionsTitle" >{options?.title} - <span className="optionsPkr">PKR {options?.value}</span></p>
                                                  </div>
                                                ))
                                              ) : <p className="pkgeDescription">{PackageFooter?.value_text}</p>}
                                            </p>
                                          </div>
                                        </div>
                                      ) : null
                                    ))}
                                  </div>
                                </Accordion.Body>
                                <Accordion.Header
                                  onClick={() => handleAccordionToggle(item?.id, item)}
                                >
                                  <div className="w-100 text-left py-3">
                                    <button
                                      onClick={handleAccordionToggle}
                                      className="showHideDetails"
                                    >
                                      {openAccordionIds.includes(item?.id)
                                        ? i18nData?.hide_details
                                        : i18nData?.show_details}
                                    </button>
                                  </div>
                                </Accordion.Header>
                              </Accordion.Item>
                            )
                          })}
                        </Slider>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <ModalVitals showVitals={showVitals} handleClose={handleClose} />
      <LearnMoreModal
        getInsuranceInfo={getInsuranceInfo}
        showLearn={showLearn}
        handleCloseLearn={handleCloseLearn}
        handleShowLearn={handleShowLearn}
      />
      <VitalScan
        showVitalScan={showVitalScan}
        handleCloseVital={handleCloseVital}
        handleShowVital={handleShowVital}
      />
    </Container>
  );
}
