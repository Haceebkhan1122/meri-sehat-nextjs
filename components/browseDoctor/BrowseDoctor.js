import React, { useMemo, useState, useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import SectionHeadingMed from "../SectionHeadingMed/SectionHeadingMed";
import { HeadingDesc } from "../HeadingDesc";
import CallToAction from "../callToAction/CallToAction";
import { isMobile } from "react-device-detect";
import { Select } from "antd";
import Form from "react-bootstrap/Form";
// import  { ResendOTP } from "otp-input-react";
import { toast } from "react-toastify";
import Loader from "../Loader";
import $ from "jquery";
import { useRouter } from "next/router";
import ScanPopup from "../scanPopup/ScanPopup";
import appStore from "../../public/svg/AppStoreDownload.svg";
import playStore from "../../public/png/apple123.png";
import jazz from "../../public/svg/jazz.svg";
import zong from "../../public/png/zong_logo.png";
import ufone from "../../public/png/ufone-new.png";
import telenor from "../../public/png/telenor-new.png";
import arrowShape from "../../public/svg/ShapeArrow.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import API from "@/utils/httpService";
import ImageLoader from "../ImageLoader";

function BrowseDoctor(props) {
  const { widgetData = [] } = props;

  const router = useRouter();
  // const { id } = params;

  const setPosition = () => {
    if (widgetData?.data?.image_position) {
      const { image_position } = widgetData?.data;

      if (image_position == "left") {
        return true;
      } else {
        return false;
      }
    }
  };

  const getColumnPosition = setPosition();

  return (
    <section
      data-reference_widget_id={widgetData?.id}
      data-widget_id={widgetData?.widget_id}
      className="browseDoctor dynamic-widget"
      data-aos="fade-up"
      data-aos-duration="800"
      id="aiTechnologies"
    >
      {widgetData?.data !== null && (
        <CallToAction
          customClass={`${!getColumnPosition ? "g-0 align-items-center" : "align-items-center"
            }`}
          leftContent={
            <LeftContent
              getColumnPositionData={getColumnPosition}
              data={widgetData}
            />
          }
          rightContent={
            <RightContent
              getColumnPositionData={getColumnPosition}
              data={widgetData}
            />
          }
        />
      )}
    </section>
  );
}

function RightContent(props) {
  const { data = [], getColumnPositionData } = props;
  return (
    <Col
      lg={5}
      md={12}
      className={`hk_outofcontain offset-lg-1 order-2 ${!getColumnPositionData ? "order-lg-1" : ""
        }`}
    >
      <div>
        {data?.data?.image ? (
          <Image
            crossorigin="anonymous"
            src={data?.data?.image}
            alt={data?.data.alt ? data?.data.alt : null}
            className="w-100 hk_call_action"
            width={633}
            height={520}
          />
        ) : (
          <ImageLoader />
        )}
      </div>
    </Col>
  );
}

function LeftContent(props) {
  const router = useRouter();
  const { data = [], getColumnPositionData } = props;
  const [isSneakBar, setIsSneakBar] = useState(false);

  const [validation, setValidation] = useState(false);

  const initialValues = {
    number: [],
  };

  const [showAlert, setShowAlert] = useState(false);
  const [inputState, setInputState] = useState(true);
  const [contactNetwork, setContactNetwork] = useState("");
  const [apiLoader, setApiLoader] = useState(false);

  /////////=================Validation MobileNumber ========///////////////////////////

  const [simNumber, setSimNumber] = useState("");
  const [simPhoneError, setSimPhoneError] = useState("");
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);
  /////////=================Validation MobileNumber ========///////////////////////////

  const hideSimErrorState = () => {
    setSimPhoneError(false);
  };

  const handleSimInputs = (e) => {
    const limit = 10;
    setSimNumber(e.target.value.slice(0, limit));
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

  // useEffect(() => {

  //   dispatch(getUserDetail())

  // }, [])

  const handleGetLink = async (e) => {
    e.preventDefault();

    try {
      const data = {
        number: `0${simNumber}`,
        network: contactNetwork,
      };
      if (simNumber === "") {
        setSimPhoneError("Please enter a valid phone number");
      } else if (contactNetwork === "") {
        setSimPhoneError("Please select your network");
      } else if (simNumber.length < 10) {
        setSimPhoneError("Incomplete phone number");
      } else if (simNumber.trim().startsWith(3) === false) {
        setSimPhoneError("Please enter a valid phone number");
      } else if (simNumber.length > 10) {
        setSimPhoneError("Character limit exceeded");
      } else if (simNumber) {
        try {
          setApiLoader(true);
          let response = await API.post("/get-a-link", data);
          if (response?.code === 200) {
            // mixpanel.track('Get the link to download the app', {
            //   'Name': userDetailsInfo?.name, 'Email': userDetailsInfo?.email, 'Number': userDetailsInfo?.phone
            // });
            setSimPhoneError("");
            setApiLoader(false);
            setInputState(false);
            setShowAlert(true);
          }
          setApiLoader(false);
        } catch (error) {
          // console.log(error);
          setApiLoader(false);
        }
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
        number: `0${simNumber}`,
        network: contactNetwork,
      };
      if (simNumber) {
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

  const editNum = () => {
    setShowAlert(false);
    setInputState(true);
  };

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

  const closeModal = () => {
    setIsSneakBar(false);
  };

  const { Option } = Select;

  // useEffect(() => {
  //   if(typeof window !== "undefined") {
  //     // Disable Mouse scrolling
  //     $('input[type=number]').on('mousewheel', function (e) { $(this).blur(); });
  //     // Disable keyboard scrolling
  //     $('input[type=number]').on('keydown', function (e) {
  //       var key = e.charCode || e.keyCode;
  //       // Disable Up and Down Arrows on Keyboard
  //       if (key == 38 || key == 40) {
  //         e.preventDefault();
  //       } else {
  //         return;
  //       }
  //     });
  //   }
  // }, [])

  return (
    <>
      <Container>
        {apiLoader === true && (
          <>
            <Loader />
          </>
        )}
      </Container>

      <Col
        lg={6}
        md={12}
        className={`ps-4 order-2 ${getColumnPositionData ? "" : "order-lg-1 "}`}
      >
        <div>
          {data?.heading && <SectionHeadingMed text={data?.heading} />}
          {data?.description && (
            <HeadingDesc
              text={
                <div
                  className="pt-4"
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                ></div>
              }
            />
          )}
          <div className="mb-3 pt-4 removeAppStoreIcon">
            {/* <a
              target="_blank"
              href="https://apps.apple.com/us/app/meri-sehat/id1643174046"
            >
              <Image
                src={appStore}
                alt="logo"
                className="img-fluid me-3 btn-apple "
              />
            </a> */}
            <a
              target="_blank"
              href="https://play.google.com/store/apps/details?id=pk.merisehat.app&pli=1"
            >
              <Image
                src={playStore}
                alt="logo"
                className="img-fluid btn-apple"
              />
            </a>
          </div>
          <div className="pt-5 d-md-block">
            {inputState && (
              <div className="form_controll for-m-r">
                <p className="fw-700 hk_tagline taglineWeight text_Fad">
                  {i18nData?.get_the_link}
                </p>
                <div className="d-flex align-items-center mb-4 mt-2">
                  <Form
                    noValidate
                    validated={validation}
                    onSubmit={handleGetLink}
                    className="d-flex"
                  >
                    <div
                      style={{ display: "flex" }}
                      className={
                        simPhoneError ? "hk_number error_number" : "hk_number"
                      }
                    >
                      <div className="country_code_hk">
                        <Select
                          defaultValue="+92"
                          className="select-code"
                          suffixIcon={
                            <Image src={arrowShape} alt="Arrow Shape" />
                          }

                        // onChange={phoneChangeCode}
                        >
                          <Option value="+92">+92</Option>
                        </Select>
                      </div>

                      <input
                        className="input-number"
                        placeholder={i18nData?.enter_your_mobile_number}
                        type="number"
                        pattern="[0-9]+"
                        maxlength="10"
                        name="number"
                        onChange={handleSimInputs}
                        value={simNumber}
                        onKeyDown={(evt) =>
                          arrayWithoutNumber.includes(evt.key) &&
                          evt.preventDefault()
                        }
                        style={{ width: "100%" }}
                      />
                      <Select
                        defaultValue="jazz"
                        className="select-country hk_network"
                        value={contactNetwork}
                        suffixIcon={
                          <Image
                            style={{ paddingRight: "0.8rem" }}
                            src={arrowShape}
                            alt="Arrow Shape"
                          />
                        }
                        style={{
                          width: 120,
                          border: "none",
                        }}
                        onChange={(value) => setContactNetwork(value)}
                      >
                        <Option className="network-height ufone" value="ufone">
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
                      className="btn_container simple_btn d-flex align-items-center justify-content-center viewDoctorBtn px-5 text-uppercase fw-700"
                    >
                      {i18nData?.send_sms}
                    </button>
                  </Form>
                </div>
                {setSimPhoneError && (
                  <p className="hk_error browse-error">
                    {" "}
                    {simPhoneError} <span onClick={hideSimErrorState}></span>{" "}
                  </p>
                )}
                {/* <p className="hk_error">{formError.number}</p> */}
              </div>
            )}

            {showAlert && (
              <div className="white-message">
                <div style={{ padding: "15px" }}>
                  <h3 className="successfully">Message shared successfully!</h3>
                  <div className="d-flex align-items-center mt-3">
                    <p className="donwload-link fs-18 mb-2">
                      A message has been sent to the following mobile number:{" "}
                      <b>
                        <span className="numm fw-500">
                          {maskPhone(simNumber)}
                        </span>
                        <span
                          style={{ cursor: "pointer" }}
                          className="underline_ancerEdit text-initial"
                          onClick={editNum}
                        >
                          {" "}
                          (Edit)
                        </span>
                      </b>
                    </p>
                    {/* <a className="underline_ancer ms-2 text-initial fw-500 ff-circular letter-spacing-0 fs-18" style={{ color: '#e9406a' }}>Resend SMS</a> */}
                    {/* <ResendOTP maxTime={60} className='OtpCounting' style={{ display: "flex", flexDirection: "column", margin: '0 0 2rem 1rem' }}
                      renderTime={renderInstantTime}
                      renderButton={renderInstantButton}
                    /> */}
                  </div>
                </div>
              </div>
            )}
          </div>
          <ScanPopup show={isSneakBar} close={closeModal} />
        </div>
      </Col>
    </>
  );
}

export default BrowseDoctor;
