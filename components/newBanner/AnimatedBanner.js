import { Row, Col, Container } from "react-bootstrap";
import React, { useState, useMemo } from "react";
import FlipTextSlider from "../sliders/flipTextSlider/FlipTextSlider";
// import i18n from '../../i18n';
// import './NewBanner.css';
// import { gsap } from 'gsap/all';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Tween } from "react-gsap";
import { Select, Modal } from "antd";
import Form from "react-bootstrap/Form";
import API from "@/utils/httpService";
import { toast } from "react-toastify";
// import { ResendOTP } from 'otp-input-react';
import { isMobile, isAndroid, isIOS } from "react-device-detect";
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
import bannerImg from "../../public/png/bannerImage.webp";
import mobBannerImg from "../../public/png/home-new-mobile-banner.png";
import addPost from "../../public/png/add_post.png";
import postJob from "../../public/png/new-images/post_job-current.png";
import addVideo from "../../public/png/new-images/add_videos-current.png";
import addPostMini from "../../public/png/new-images/add_post_mini-current.png";
// import bgBanner from "../../public/png/hk_bg_slider.png";
import Image from "next/image";
import { useSelector } from "react-redux";
import Loader from "../Loader";

// gsap.registerPlugin(ScrollTrigger);

const AnimatedBanner = (props) => {
  const { widgetData = [], key } = props;

  const [showMessage, setShowMessage] = useState(false);
  const [formState, setFormState] = useState(true);
  const [openPop, setOpenPop] = useState(false);
  const [newsLetterName, setNewsLetterName] = useState("");
  const [apiLoader, setApiLoader] = useState(false);
  const [openPopThanks, setOpenPopThanks] = useState(false);
  const [cellNumber, setcellNumber] = useState("");
  const [newsLetterNumber, setNewsLetterNumber] = useState("");
  const [contactNetwork, setContactNetwork] = useState("");
  const [newsLetterEmail, setNewsLetterEmail] = useState("");
  const [NumberMessage, setNumberMessage] = useState("");
  const [NameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);
  const mixPanelTracking = () => {
    // mixpanel.track('Start Scan', {
    //     Name: userDetailsInfo?.name,
    //     Email: userDetailsInfo?.email,
    //     Number: userDetailsInfo?.phone
    // });
  };

  // useEffect(() => {

  //   dispatch(getUserDetail())

  // }, [])

  //////////////////////////validation Input ////////////////////////////////////

  const [mobileNumber, setMobileNumber] = useState("");
  const [mobilePhoneError, setMobilePhoneError] = useState("");

  //////////////////////////validation Input ////////////////////////////////////

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
        className="text-initial fw-500 ff-circular letter-spacing-0 fs-18"
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

    try {
      const data = {
        number: `0${mobileNumber}`,
        network: contactNetwork,
      };
      if (mobileNumber === "") {
        setMobilePhoneError("Please enter a valid phone number");
      } else if (contactNetwork === "") {
        setMobilePhoneError("Please select your network");
      } else if (mobileNumber.length < 10) {
        setMobilePhoneError("Incomplete phone number");
      } else if (mobileNumber.trim().startsWith(3) === false) {
        setMobilePhoneError("Please enter a valid phone number");
      } else if (mobileNumber.length > 10) {
        setMobilePhoneError("Character limit exceeded");
      } else if (mobileNumber) {
        setApiLoader(true);
        let response = await API.post("/get-a-link", data);
        if (response?.code === 200) {
          // mixpanel.track('Get the link to download the app', {
          //     Name: userDetailsInfo?.name,
          //     Email: userDetailsInfo?.email,
          //     Number: userDetailsInfo?.phone
          // });
          setFormState(false);
          setShowMessage(true);
          setCellPhoneError("");
          setApiLoader(false);
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

    try {
      const data = {
        number: `0${mobileNumber}`,
        network: contactNetwork,
      };
      if (mobileNumber) {
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

  const uanNumber = localStorage.getItem("uan_number");

  let handleSubmit = async (e) => {
    e.preventDefault();

    setNameMessage("");
    setNumberMessage("");
    setEmailMessage("");

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

  const handleLetterCellInputs = (e) => {
    const limit = 10;
    setNewsLetterNumber(e.target.value.slice(0, limit));
  };

  const hidePop = () => {
    setOpenPop(false);
  };

  const hidePopThanks = () => {
    setOpenPopThanks(false);
  };
  //  00000000000000000000===========================================================

  const hidePhoneErrorState = () => {
    setPhoneError(false);
  };

  const handleMobileInputs = (e) => {
    const limit = 10;
    setMobileNumber(e.target.value.slice(0, limit));
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

  const editFunc = () => {
    setShowMessage(false);
    setFormState(true);
  };

  const bannerHead = widgetData?.heading?.split("{placeholder}") || [];

  const animatedText = widgetData?.data?.meta_text?.split(",") || [];

  function generateArrayWithoutNumber() {
    let res = [];

    for (let i = 0; i <= 255; i++) {
      if (i >= 48 && i <= 57) {
      } else {
        res.push(String.fromCharCode(i));
        // console.log(String.fromCharCode(i))
      }
    }

    return res;
  }

  const arrayWithoutNumber = useMemo(() => generateArrayWithoutNumber(), []);

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
    <div>
      <Container>{apiLoader === true && <>Loading...</>}</Container>

      <Row className="justify-content-center animated_banner_ text-center mt-5 mt-md-0">
        <Col md={6}>
          <div className="home ">
            <div>
              <h1 dir="auto" id="resizing-h3" className="">
                {bannerHead[0] || ""}
              </h1>
              <div>
                <FlipTextSlider flipTextSliderChild={animatedText} />
              </div>
            </div>
          </div>

          <p
            style={{ color: "#404040" }}
            className="fw-300 fs-22 mt-3 mb-4 fs-mobile-17"
          >
            {/* {i18n.t('our_sehat_scan_tool')} */}
            Our SehatScan tool uses advanced Artificial Intelligence technology
            to measure your health in just 60 seconds
          </p>
          <div className="scan-tool sdsds">
            <div className="start_scan_mob_button">
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
              {formState ? (
                <div className="form_controll">
                  <p className="hk_tagline text-center">
                    {/* {i18n.t('get_the_link')} */}
                    {i18nData?.get_the_link}
                  </p>
                  <div className="d-flex justify-content-center align-items-center mb-4 mt-2">
                    <Form
                      noValidate
                      onSubmit={handleGetLink}
                      className="d-flex"
                    >
                      <div
                        style={{ display: "flex" }}
                        className={
                          mobilePhoneError
                            ? "hk_number error_number"
                            : "hk_number"
                        }
                      >
                        <div className="country_code_hk">
                          <Select
                            defaultValue="+92"
                            className="select-code"
                            suffixIcon={
                              <Image src={arrowShape} alt="arrow down" />
                            }

                            // onChange={phoneChange}
                          >
                            <Option value="+92">+92</Option>
                          </Select>
                        </div>

                        {/* onChange={simContact} */}
                        <input
                          className="input-number"
                          // placeholder={i18n.t('enter_your_number')}
                          placeholder="Enter your Number"
                          type="number"
                          pattern="[0-9]+"
                          maxlength="10"
                          name="number"
                          onKeyDown={(evt) =>
                            arrayWithoutNumber.includes(evt.key) &&
                            evt.preventDefault()
                          }
                          //     onChange={handleChanges}
                          value={mobileNumber}
                          onChange={handleMobileInputs}
                          style={{ width: "100%" }}
                        />
                        <Select
                          defaultValue="jazz"
                          className="select-country hk_network"
                          suffixIcon={
                            <Image
                              style={{ paddingRight: "0.8rem" }}
                              src={arrowShape}
                              alt="arrow down"
                            />
                          }
                          style={{
                            width: 120,
                            border: "none",
                            menuPortal: (provided) => ({
                              ...provided,
                              zIndex: -9999,
                            }),
                          }}
                          onChange={(value) => setContactNetwork(value)}
                          // onChange={simContact}
                          value={contactNetwork}
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
                        style={{ color: "white" }}
                        type="submit"
                        className="btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn px-5 text-uppercase fw-700"
                      >
                        {/* {i18n.t('send_btn')} */}
                        Send
                      </button>
                    </Form>
                  </div>
                  {mobilePhoneError && (
                    <p id="animatedError" className="hk_error animatedError">
                      {" "}
                      {mobilePhoneError}{" "}
                      <span onClick={hidePhoneErrorState}></span>{" "}
                    </p>
                  )}

                  {/* <p id='animatedError' className="hk_error animatedError">{formErrors.number}</p> */}
                </div>
              ) : (
                ""
              )}

              {showMessage ? (
                <div className="white-message Error-message-blue ">
                  <div style={{ padding: "15px" }}>
                    <h3>Message shared successfully!</h3>
                    <p className="fs-18 mb-2 ">
                      A message has been sent to the following mobile number:{" "}
                      <b>
                        <span className="numm fw-500">
                          0{maskPhone(mobileNumber)}{" "}
                        </span>
                        <span
                          style={{ cursor: "pointer" }}
                          className="underline_ancerEdit text-initial"
                          onClick={editFunc}
                        >
                          {" "}
                          (Edit)
                        </span>
                      </b>
                    </p>

                    {/* <button className="underline_ancer text-initial fw-500 ff-circular letter-spacing-0 fs-18" style={{ color: '#e9406a' }} onclick={resendLink}>Resend</button> */}
                    {/* <ResendOTP
                                            maxTime={60}
                                            className="OtpCounting"
                                            style={{ display: 'grid', justifyContent: 'center' }}
                                            renderTime={renderInstantTime}
                                            renderButton={renderInstantButton}
                                        /> */}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>

        <Col md={12} className="d-none d-md-block">
          <div
            className="main_controller"
            style={{
              background: `url(${"../../public/png/hk_bg_slider.png"})`,
            }}
          >
            <Tween
              to={{
                xPercent: -0,
                yPercent: -0,
                left: "25%",
                right: "15%",
                top: "50%",
                ease: "elastic.out(0.1)",
                scrollTrigger: {
                  trigger: ".image1",
                  start: "top center",
                  end: "bottom top",
                  scrub: 0.1,
                },
              }}
              from={{
                rotation: 90,
              }}
              duration={2}
            >
              <div className="image1 square my_animation">
                <Image src={addPost} alt="Post Job" width="150" height="130" />
              </div>
            </Tween>
            <Tween
              to={{
                xPercent: -0,
                yPercent: -0,
                left: "50%",
                top: "50%",
                ease: "elastic.out(0.1)",
                scrollTrigger: {
                  trigger: ".image2",
                  start: "top center",
                  end: "bottom top",
                  scrub: 0.1,
                },
                rotation: 90,
              }}
              duration={50}
            >
              <Image
                src={postJob}
                alt="Post Job"
                className="image2 my_animation"
                width="161"
                height="170"
              />
            </Tween>
            <div className="center_img_hk">
              <Image src={bannerImg} alt="Lady" width="570" height="500" />
            </div>

            <Tween
              to={{
                xPercent: -0,
                yPercent: -0,
                right: "40%",
                top: "50%",
                ease: "elastic.out(0.1)",
                scrollTrigger: {
                  trigger: ".image3",
                  start: "top center",
                  end: "bottom top",
                  scrub: 0.1,
                },
                rotation: -90,
              }}
              duration={50}
            >
              <Image
                src={addVideo}
                alt="Add Videos"
                className="image3 my_animation"
                width="183"
                height="120"
              />
            </Tween>
            <Tween
              to={{
                xPercent: -0,
                yPercent: -0,
                right: "50%",
                top: "50%",
                ease: "elastic.out(0.1)",
                scrollTrigger: {
                  trigger: ".image4",
                  start: "top center",
                  end: "bottom top",
                  scrub: 0.1,
                },
                rotation: -90,
              }}
              duration={50}
            >
              <Image
                src={addPostMini}
                alt="Add Job Mini"
                className="image4 my_animation"
                width="109"
                height="70"
              />
            </Tween>
            {/* <div className='homeBannerIcons' style={{ display: 'none' }}>
              <Image src={appStore} alt="appStore" className='img-fluid me-3 btn-apple' />
              <Image src={playStore} alt="playStore" className='img-fluid btn-apple ' />
            </div> */}
          </div>
        </Col>
        <Col md={12} className="d-md-none p-0">
          <div
            className="main_controller for-mobile-banner-annimated"
            /*  style={{ background: `url(${bgBanner})`, }}*/
          >
            <Image
              src={mobBannerImg}
              alt="Mobile Banner"
              className="img-fluid"
            />
          </div>
        </Col>
      </Row>

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
                          alt="arrow down"
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
              className="img-fluid w-100 topBannerImg d-none d-md-block"
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
                <Image src={tick} alt="green check" />
              </div>

              <h4 className="mt-3 fs-mobile-20 line-height-mobile-24 mb-2 fs-28 line-height-35 fw-600">
                Thank You!
              </h4>
              <p className="fs-18 line-height-24 mb-3 text-center mt-3">
                We shall notify you once our Health Scan Technology is live.
              </p>
              <p className="fs-18 line-height-24 mb-3 text-center">
                For help or queries, call us at <br />{" "}
                <span style={{ fontWeight: "500" }}> {uanNumber} </span>
              </p>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default AnimatedBanner;
