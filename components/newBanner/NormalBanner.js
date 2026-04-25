import { Row, Col, Container } from "react-bootstrap";
import React, { useState, useMemo, useEffect } from "react";
import FlipTextSlider from "../sliders/flipTextSlider/FlipTextSlider";
// import './NewBanner.css';
import { Modal, Select, Skeleton } from "antd";
import API from "@/utils/httpService";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
// import { ResendOTP } from 'otp-input-react';
// import { isMobile, isAndroid, isIOS } from "react-device-detect";
// import mixpanel from 'mixpanel-browser';
import $ from "jquery";
import newsletterImgDeskt from "../../public/png/coming-soon-img.png";
import mobileBannerPopup from "../../public/png/coming-soon-mobile.png";
import newsletterThanksDeskt from "../../public/png/newsletter-pic-thanks-2.png";
import newsletterThanksImg from "../../public/png/thank-you-popup.webp";
import logo from "../../public/svg/meri-sehat-logo.svg";
import tick from "../../public/svg/tik.svg";
import jazz from "../../public/svg/jazz.svg";
import zong from "../../public/png/zong_logo.png";
import ufone from "../../public/png/ufone-new.png";
import telenor from "../../public/png/telenor-new.png";
import arrowShape from "../../public/svg/ShapeArrow.svg";
// import bannerImg from "../../public/png/banner_right_new.png";
import appStore from "../../public/png/apple123.png";
import playStore from "../../public/svg/AppStoreDownload.svg";
import send from "../../public/png/right_send.png";
import Image from "next/image";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import ImageLoader from "../ImageLoader";
import parse from 'html-react-parser';

const { Option } = Select;
const NormalBanner = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    import("react-device-detect").then((item) => {
      setIsMobile(item.isMobile);
      setIsAndroid(item.isAndroid);
      setIsIOS(item.isIOS);
    });
  }, []);

  function generateArrayWithoutNumber() {
    let res = [];

    for (let i = 0; i <= 255; i++) {
      if (i >= 48 && i <= 57) {
      } else {
        res.push(String.fromCharCode(i));
      }
    }

    return res;
  }

  const arrayWithoutNumber = useMemo(() => generateArrayWithoutNumber(), []);

  const mixPanelTracking = () => {
    // mixpanel.track('Start Scan', {
    //     Name: userDetailsInfo?.name,
    //     Email: userDetailsInfo?.email,
    //     Number: userDetailsInfo?.phone
    // });
  };

  const { widgetData = [], key } = props;

  const { backgroundColor, imgUrl } = props;

  const initialValues = {
    number: [],
  };

  const [showMessage, setShowMessage] = useState(false);
  const [formState, setFormState] = useState(true);
  const [contactNetwork, setContactNetwork] = useState("");
  const [newsLetterEmail, setNewsLetterEmail] = useState("");
  const [NumberMessage, setNumberMessage] = useState("");
  const [NameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [newsLetterNumber, setNewsLetterNumber] = useState("");
  const [openPop, setOpenPop] = useState(false);
  const [newsLetterName, setNewsLetterName] = useState("");
  const [apiLoader, setApiLoader] = useState(false);
  const [openPopThanks, setOpenPopThanks] = useState(false);
  const [uanNumber, setUanNumber] = useState(null);

  /////////=================Validation MobileNumber ========///////////////////////////

  const [cellNumber, setcellNumber] = useState("");
  const [cellPhoneError, setCellPhoneError] = useState("");
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);
  /////////=================Validation MobileNumber ========///////////////////////////

  const maskPhone = (phone) => {
    let num = phone.toString();

    let first3 = num.substring(0, 3);
    let last2 = num.substring(num.length - 2);

    let mask = phone.substring(3, phone.length - 2).replace(/\d/g, "*");
    mask = `${first3}${mask}${last2}`;

    return mask;
  };

  const renderInstantTime = (remainingTime) => {
    return (
      <span>
        {" "}
        {remainingTime === 0
          ? ""
          : ` 00:${remainingTime < 10 ? `0` : ""}${remainingTime} seconds`}
      </span>
    );
  };

  const renderInstantButton = (buttonProps) => {
    return (
      <button
        {...buttonProps}
        className="text-initial fw-500 ff-circular letter-spacing-0 pt-0 fs-18"
        style={{ color: "#e9406a" }}
      >
        {buttonProps.remainingTime === 0 ? (
          <button
            className="underline_ancer text-initial fw-500 ff-circular letter-spacing-0 fs-18"
            style={{ color: "#e9406a" }}
            onClick={resendLink}
          >
            Resend
          </button>
        ) : (
          <span
            style={{
              color: "#878787",
              pointerEvents: "none",
              fontWeight: "400",
              fontSize: "18px",
            }}
          >
            Resend SMS
          </span>
        )}
      </button>
    );
  };

  const handleGetLink = async (e) => {
    e.preventDefault();

    // const userID = localStorage.getItem('user-id')
    //   ? localStorage.getItem('user-id')
    //   : 0;
    // const options = {
    //   headers: { 'user-id': userID }
    // };

    try {
      const data = {
        number: `0${cellNumber}`,
        network: contactNetwork,
      };
      if (cellNumber === "") {
        setCellPhoneError("Please enter a valid phone number");
      } else if (contactNetwork === "") {
        setCellPhoneError("Please select your network");
      } else if (cellNumber.length < 10) {
        setCellPhoneError("Incomplete phone number");
      } else if (cellNumber.trim().startsWith(3) === false) {
        setCellPhoneError("Please enter a valid phone number");
      } else if (cellNumber.length > 10) {
        setCellPhoneError("Character limit exceeded");
      } else if (cellNumber) {
        setApiLoader(true);
        let response = await API.post("/get-a-link", data);
        if (response?.code === 200) {
          setCellPhoneError("");
          setApiLoader(false);
          setFormState(false);
          setShowMessage(true);
        }
        setApiLoader(false);
      }
    } catch (err) {
      setApiLoader(false);
      // console.log(err);
    }
  };

  const resendLink = async (e) => {
    e.preventDefault();

    // const userID = localStorage.getItem('user-id')
    //   ? localStorage.getItem('user-id')
    //   : 0;
    // const options = {
    //   headers: { 'user-id': userID }
    // };

    try {
      const data = {
        number: `0${cellNumber}`,
        network: contactNetwork,
      };
      if (cellNumber) {
        setApiLoader(true);
        let response = await API.post("/get-a-link", data);
        if (response?.code === 200) {
          setApiLoader(false);
          toast.success("Message shared successfully!");
        }
        setApiLoader(false);
      }
    } catch (err) {
      setApiLoader(false);
      // console.log(err);
    }
  };

  const emailPattern =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
  const emailRegex = new RegExp(emailPattern);

  let handleSubmit = async (e) => {
    e.preventDefault();

    setNameMessage("");
    setNumberMessage("");
    setEmailMessage("");

    // const userID = localStorage.getItem('user-id')
    //   ? localStorage.getItem('user-id')
    //   : 0;
    // const options = {
    //   headers: { 'user-id': userID }
    // };

    try {
      const data = {
        number: `0${newsLetterNumber}`,
        name: newsLetterName,
        email: newsLetterEmail,
        // page_title: window.location.href
      };
      if (!newsLetterName) {
        setNameMessage("Name is required");
      }
      if (!newsLetterNumber) {
        setNumberMessage("Number is required");
      }

      if (!newsLetterEmail) {
        setEmailMessage("Email is required");
      } else if (newsLetterNumber.length < 10) {
        setNumberMessage("");
        setNumberMessage("enter minimum 10 digits");
      } else if (newsLetterNumber.trim().startsWith(3) === false) {
        setNumberMessage("");
        setNumberMessage("Please enter a valid phone number");
      } else if (emailRegex.test(newsLetterEmail) === false) {
        setEmailMessage("Invalid Email");
      } else if (
        newsLetterName &&
        newsLetterNumber &&
        newsLetterEmail &&
        newsLetterNumber.length === 10 &&
        newsLetterNumber.trim().startsWith(3) === true
      ) {
        setApiLoader(true);
        let res = await API.post("/get-a-link", data);
        if (res?.code === 200) {
          // mixpanel.track('Get the link to download the app', {
          //     Name: userDetailsInfo?.name,
          //     Email: userDetailsInfo?.email,
          //     Number: userDetailsInfo?.phone
          // });
          setApiLoader(false);
          localStorage.setItem("showPopup", false);
          setNewsLetterName("");
          setNewsLetterNumber("");
          setNewsLetterEmail("");
          setOpenPop(false);
          setOpenPopThanks(true);
          // setMessage("User created successfully");
        }

        setApiLoader(false);
      }
    } catch (err) {
      setApiLoader(false);
      // console.log(err);
    }
  };

  const handleCellInputs = (e) => {
    const limit = 10;
    setcellNumber(e.target.value.slice(0, limit));

    setContactNetwork("");

    if (e.target.value.startsWith("33") === true) {
      setContactNetwork("ufone");
    }
    if (e.target.value.startsWith("31") === true) {
      setContactNetwork("zong");
    }
    if (e.target.value.startsWith("30") === true) {
      setContactNetwork("jazz");
    }
    if (e.target.value.startsWith("34") === true) {
      setContactNetwork("telenor");
    }
    if (e.target.value.startsWith("32") === true) {
      setContactNetwork("jazz");
    }
  };

  const hanldeRedirect = () => {
    mixPanelTracking();
    setOpenPop(true);
  };

  const hidePop = () => {
    setOpenPop(false);
  };

  const hidePopThanks = () => {
    setOpenPopThanks(false);
  };

  const hideCellErrorState = () => {
    setCellPhoneError(false);
  };

  const handleLetterCellInputs = (e) => {
    const limit = 10;
    setNewsLetterNumber(e.target.value.slice(0, limit));
  };

  const editOption = () => {
    setShowMessage(false);
    setFormState(true);
  };

  const bannerHead = widgetData?.heading?.split("{placeholder}") || [];

  const animatedText = widgetData?.data?.meta_text?.split(",") || [];

  useEffect(() => {
    if (localStorage.getItem("uan_number")) {
      setUanNumber(localStorage.getItem("uan_number"));
    }
  }, [uanNumber]);

  // Disable Mouse scrolling
  // $('input[type=number]').on('mousewheel', function (e) {
  //     $(this).blur();
  // });
  // // Disable keyboard scrolling
  // $('input[type=number]').on('keydown', function (e) {
  //     var key = e.charCode || e.keyCode;
  //     // Disable Up and Down Arrows on Keyboard
  //     if (key == 38 || key == 40) {
  //         e.preventDefault();
  //     } else {
  //         return;
  //     }
  // });

  let androidAppUrl =
    "https://play.google.com/store/apps/details?id=pk.merisehat.app&pli=1";
  let iosAppUrl = "https://apps.apple.com/us/app/meri-sehat/id1643174046";

  return (
    <>
      <Container>{apiLoader === true && <>Loading...</>}</Container>

      <div className="closing">
        <Row
          data-aos="fade-up"
          data-aos-duration="800"
          className="bannerNewComponent hk_home_banner_normal  px-5 align-items-center"
          style={
            {
              // background: backgroundColor ? backgroundColor : '#FFF1A0',
              // marginLeft: "15px",
            }
          }
        >
          <Col md={6}>
            <div className="home dd">
              {!widgetData?.heading ? (
                <>
                  <Skeleton paragraph={{ rows: 4 }} />
                </>
              ) : (
                <>
                  <div className="d-block home-head-vitals pb-4">
                    <h1 dir="auto" id="resizing-h3" className="">
                      {bannerHead[0] || ""}
                    </h1>
                    <div className="normalBannerLeft">
                      <FlipTextSlider flipTextSliderChild={animatedText} />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="start_scan_mob_button ssss">
              {/* {isMobile ? (
                <button onClick={mixPanelTracking} type='submit' className="btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn px-5 text-uppercase fw-700">
                  <a href='https://sehatscan.merisehat.pk/'>START SCAN</a>
                </button>) : <button onClick={hanldeRedirect} type='submit' className="btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn px-5 text-uppercase fw-700">
                START SCAN
              </button>} */}
              {isMobile && (
                <>
                  <button
                    onClick={mixPanelTracking}
                    type="submit"
                    className="btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn px-5 text-uppercase fw-700"
                  >
                    <a
                      href={
                        isAndroid
                          ? `${androidAppUrl}`
                          : isIOS
                            ? `${iosAppUrl}`
                            : ""
                      }
                      target="blank"
                    >
                      DOWNLOAD NOW
                    </a>
                  </button>
                </>
              )}
            </div>
            <div className="mob_hide_scan_start">
              {formState && (
                <div className="form_controll mt-2">
                  <p className="hk_tagline text-md-left text-center text-sehatscanbanner">
                    {parse(widgetData.description)}
                  </p>
                  <div
                    style={{ display: "none" }}
                    className="mb-3 pt-1 showUrduBanner"
                  >
                    <a
                      target="_blank"
                      href="https://apps.apple.com/us/app/meri-sehat/id1643174046"
                    >
                      <Image
                        src={playStore}
                        alt="logo"
                        className="img-fluid btn-apple "
                      />
                    </a>
                    <a
                      target="_blank"
                      href="https://play.google.com/store/apps/details?id=pk.merisehat.app"
                    >
                      <Image
                        src={appStore}
                        alt="logo"
                        className="img-fluid me-3 btn-apple"
                      />
                    </a>
                  </div>
                  <div className="d-flex align-items-center mb-2 mt-2 normalBannerNumberFeild">
                    <Form
                      noValidate
                      onSubmit={handleGetLink}
                      className="d-flex mb-0"
                    >
                      <div
                        style={{ display: "flex" }}
                        className={
                          cellPhoneError
                            ? "hk_number error_number"
                            : "hk_number"
                        }
                      >
                        <div className="country_code_hk">
                          <Select
                            defaultValue="+92"
                            className="select-code"
                            suffixIcon={
                              <Image
                                style={{ paddingTop: "4px" }}
                                src={arrowShape}
                                alt="Arrow shape"
                              />
                            }

                          // onChange={phoneChange}
                          >
                            <Option value="+92">+92</Option>
                          </Select>
                        </div>

                        <input
                          className="input-number"
                          // placeholder={i18n.t('enter_your_number')}
                          placeholder={i18nData?.enter_your_mobile_number_try}
                          type="number"
                          pattern="[0-9]+"
                          maxlength="10"
                          name="number"
                          value={cellNumber}
                          onChange={handleCellInputs}
                          onKeyDown={(evt) =>
                            arrayWithoutNumber.includes(evt.key) &&
                            evt.preventDefault()
                          }
                          style={{ width: "100%" }}
                        />
                        <Select
                          value={contactNetwork}
                          defaultValue="jazz"
                          className="select-country hk_network"
                          suffixIcon={
                            <Image
                              style={{ paddingRight: "0.8rem" }}
                              src={arrowShape}
                              alt="Arrow shape"
                            />
                          }
                          style={{
                            width: 120,
                            border: "none",
                          }}
                          onChange={(value) => setContactNetwork(value)}
                        >
                          <Option
                            className="network-height ufone"
                            value="ufone"
                          >
                            {" "}
                            <Image src={ufone} alt="ufone" /> <span></span>
                          </Option>
                          <Option className="network-height jazz" value="jazz">
                            {" "}
                            <Image src={jazz} alt="jazz" /> <span></span>
                          </Option>
                          <Option
                            className="network-height telenor"
                            value="telenor"
                          >
                            {" "}
                            <Image src={telenor} alt="telenor" /> <span></span>
                          </Option>
                          <Option className="network-height" value="zong">
                            {" "}
                            <Image src={zong} alt="zong" /> <span></span>
                          </Option>
                        </Select>
                      </div>
                      <button
                        type="submit"
                        className="btn_container fs-16 simple_btn d-flex align-items-center justify-content-center viewDoctorBtn text-uppercase fw-700"
                      >
                        {/* {i18n.t('send_btn')} */}
                        <Image src={send} alt="Send" />
                      </button>
                    </Form>
                  </div>
                  {cellPhoneError && (
                    <p
                      className="hk_error NormalError position-absolute"
                      style={{ top: "130px" }}
                    >
                      {" "}
                      {cellPhoneError}{" "}
                      <span onClick={hideCellErrorState}></span>{" "}
                    </p>
                  )}

                  {/* <p className="hk_error NormalError">{formErrors.number}</p> */}
                </div>
              )}

              {showMessage && (
                <div className="white-message col-md-11">
                  <div style={{ padding: "5px 15px" }}>
                    <h3>Message shared successfully!</h3>
                    <p className="fs-16 mb-0 ">
                      A message has been sent to the following mobile number:{" "}
                      <b>
                        <span className="numm fw-500 ff-circular ">
                          {maskPhone(cellNumber)}{" "}
                        </span>
                        <span
                          style={{ cursor: "pointer" }}
                          className="underline_ancerEdit text-initial"
                          onClick={editOption}
                        >
                          {" "}
                          (Edit)
                        </span>
                      </b>
                    </p>
                    {/* <a className="underline_ancer text-initial fw-500 ff-circular letter-spacing-0 fs-18" style={{ color: '#e9406a' }}>Resend</a> */}
                    {/* <ResendOTP
                                            maxTime={60}
                                            className="OtpCounting"
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'left'
                                            }}
                                            renderTime={renderInstantTime}
                                            renderButton={renderInstantButton}
                                        /> */}
                  </div>
                </div>
              )}
            </div>
          </Col>
          <Col md={6} className="hk_pricig_">
            {widgetData?.data?.image ? (
              <Image
                crossorigin="anonymous"
                src={widgetData?.data?.image}
                alt={widgetData?.data?.alt ? widgetData?.data?.alt : null}
                className="img-fluid"
                width={650}
                height={650}
                priority
              />
              // <></>
            ) : (
              <ImageLoader />
              // <Image
              //   src={bannerImg}
              //   crossorigin="anonymous"
              //   alt="Banner Image"
              //   className="img-fluid fullWidthDesktop"
              // />
            )}
          </Col>
        </Row>
      </div>

      <Modal
        className="popupNewsletter"
        visible={openPop}
        onOk={hidePop}
        onCancel={hidePop}
      >
        {apiLoader === true && (
          <>
            <Loader />
          </>
        )}
        <Row className="align-items-center">
          <Col
            md={{ span: 6 }}
            className="px-0 d-none d-md-block"
            style={{ backgroundColor: "#FDECF1", borderRadius: "16px" }}
          >
            <p className="text-uppercase coming-soon-text">
              {" "}
              coming <br />
              soon{" "}
            </p>
            <Image
              src={newsletterImgDeskt}
              alt="newsletter"
              className="img-fluid w-100 topBannerImg d-none d-md-block"
            />
            {/* <Image src={newsletterImg} alt='newsletter' className='img-fluid w-100 topBannerImg d-md-none' /> */}
          </Col>
          <Col md={{ span: 6 }} className="d-md-none">
            <Image
              src={mobileBannerPopup}
              alt="newsletter"
              className="img-fluid w-100"
            />
          </Col>
          <Col md={{ span: 6 }} className="text-left py-4 py-md-0">
            <div className="px-3 px-md-0">
              <div className="coming-soon-description">
                <p>
                  We are Pakistan’s first and only Artificial Intelligence
                  powered healthcare app. Our SehatScan technology allows you to
                  scan and measure your Blood Pressure, Heart Rate and other
                  vitals through your mobile phone camera - No sensors needed!
                </p>

                <p style={{ marginTop: "12px" }}>
                  Enter your details below and we will inform you when SehatScan
                  is available:
                </p>
              </div>

              <form
                className="subscribedForm availableFormPopup"
                onSubmit={handleSubmit}
              >
                <label className="mt-2 ">Name*</label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  value={newsLetterName}
                  placeholder="Enter your name"
                  onChange={(e) => setNewsLetterName(e.target.value)}
                />
                {/* <div  > */}
                {NameMessage && (
                  <p className="position-absolute error-coming-soon name-message">
                    {NameMessage}
                  </p>
                )}
                {/* </div> */}
                <label className="mt-4">Mobile Number*</label>
                <div style={{ display: "flex" }} className="hk_number w-100">
                  <div className="country_code_hk">
                    <Select
                      defaultValue="+92"
                      className="select-code"
                      suffixIcon={
                        <Image
                          style={{ paddingTop: "4px" }}
                          src={arrowShape}
                          alt="Arrow Shape"
                        />
                      }

                    // onChange={phoneChange}
                    >
                      <Option value="+92">+92</Option>
                    </Select>
                  </div>

                  <input
                    className="input-number"
                    placeholder="Enter your phone number"
                    type="number"
                    pattern="[0-9]+"
                    maxlength="10"
                    name="number"
                    value={newsLetterNumber}
                    onChange={handleLetterCellInputs}
                    onKeyDown={(evt) =>
                      arrayWithoutNumber.includes(evt.key) &&
                      evt.preventDefault()
                    }
                    style={{ width: "100%" }}
                  />
                </div>

                {/* <div > */}
                {NumberMessage ? (
                  <p className="position-absolute error-coming-soon message">
                    {NumberMessage}
                  </p>
                ) : null}
                {/* </div> */}

                <label className="mt-4">Email Address*</label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  value={newsLetterEmail}
                  placeholder="Enter your email address"
                  onChange={(e) => setNewsLetterEmail(e.target.value)}
                />
                {/* <div  > */}
                {emailMessage && (
                  <p className="position-absolute error-coming-soon email-message">
                    {emailMessage}
                  </p>
                )}
                {/* </div> */}
                <button
                  type="submit"
                  disabled={apiLoader}
                  className="review-button mt-4 w-100 add-continue-btn text-uppercase subscribedBtn position-relative fw-700"
                >
                  {/* {i18n.t('send_btn')} */}
                  Send Button
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </Modal>

      <Modal
        className="popupNewsletter"
        visible={openPopThanks}
        onOk={hidePopThanks}
        onCancel={hidePopThanks}
      >
        <Row className="align-items-center">
          <Col md={6}>
            <Image
              src={newsletterThanksDeskt}
              alt="newsletter"
              className="img-fluid w-100 topBannerImg d-none d-md-block "
            />
            <Image
              src={newsletterThanksImg}
              alt="newsletter"
              className="img-fluid w-100 topBannerImg d-md-none"
            />
          </Col>
          <Col md={6} className="text-md-left text-center my-md-5">
            <Image src={logo} alt="logo" className="img-fluid mb-4 d-none" />
            <div className="px-3 px-md-0 newsletter-thanks-description mb-5 mt-4">
              <div className="mt-3 mb-4">
                <Image src={tick} alt="tick icon" />
              </div>

              <h4 className="mt-3 fs-mobile-20 line-height-mobile-24 mb-2 fs-28 line-height-35 fw-600">
                Thank You!
              </h4>
              <p className="fs-18 line-height-24 mb-3 text-center mt-3">
                We shall notify you once our Health Scan Technology is live.
              </p>
              <p className="fs-18 line-height-24 mb-3 text-center">
                For help or queries, call us at <br />{" "}
                <span style={{ fontWeight: "500", wordSpacing: "-4px" }}>
                  {" "}
                  {uanNumber}{" "}
                </span>
              </p>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default NormalBanner;
