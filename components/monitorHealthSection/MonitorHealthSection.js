import { Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import SubSectionHeading from "../SubSectionHeading/SubSectionHeading";
import HeadingDesc from "../HeadingDesc/HeadingDesc";
import SimpleCard from "../simpleCard/SimpleCard";
import SectionWithTwoCards from "../sectionsWithTwoCards/SectionWithTwoCards";
import AnchorLink from "../ancerWithUnderline/anchorLink";
import RightArrowWithoutBorder from "../rightArrowWithoutBorder/RightArrowWithoutBorder";
import Image from "next/image";
import Cookies from "js-cookie";
import API from "@/utils/httpService";
import { useRouter } from "next/router";
import { isAndroid, isBrowser, isIOS, isMobile } from "react-device-detect";
import Link from "next/link";
import { useSelector } from "react-redux";
import ImageLoader from "../ImageLoader";

// import mixpanel from 'mixpanel-browser';

function MonitorHealthSection(props) {
  const { widgetData = [], key } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(widgetData?.data);
  }, [widgetData]);

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="800"
      key={key}
      className="monitorHealthSection dynamic-widget helth_boxes ss"
      data-reference_widget_id={widgetData?.id}
      data-widget_id={widgetData?.widget_id}
    >
      <SectionWithTwoCards
        secTopContent={<SectionTopContent widgetData={widgetData} />}
        rightCardContent={<RightCardContent widgetData={data} />}
        leftCardContent={<LeftCardContent widgetData={data} />}
      />
    </div>
  );
}

function SectionTopContent(props) {
  const { widgetData = [] } = props;
  const { pathname } = useRouter();


  return (
    <>
      {widgetData?.heading && <SubSectionHeading text={widgetData?.heading} />}
      {widgetData?.description && (
        <HeadingDesc
          text={
            <p
              dangerouslySetInnerHTML={{
                __html: widgetData?.description,
              }}
            />
          }
        />
      )}
    </>
  );
}

function LeftCardContent(props) {
  // const dispatch = useDispatch();
  // const userDetailsInfo = useSelector((state) => state.AuthReducer.user);

  const mixPanelTracking = () => {
    // mixpanel.track(`${widgetData?.[0]?.heading === 'Discover Men’s Wellness' ? 'Discover Men’s Wellness' : 'View All Doctors'}`, {
    //   'Name': userDetailsInfo?.name, 'Email': userDetailsInfo?.email, 'Number': userDetailsInfo?.phone
    // });
  };

  // useEffect(() => {

  //   dispatch(getUserDetail())

  // }, [])

  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  const router = useRouter();
  const { pathname, query } = router;
  const pageName = pathname;

  useEffect(() => {
    import("react-device-detect").then((item) => {
      setIsAndroid(item.isAndroid);
      setIsIOS(item.isIOS);
      setIsBrowser(item.isBrowser);
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const { widgetData = [] } = props;

  function consultNowHandler() {
    const Authorization = Cookies.get("Authorization");
    if (!Authorization) {
      window.location.href = "/confirm-mobile-number";
    } else {
      (async () => {
        // setLoading(true);
        const response = await API.get(`/user`);
        // setLoading(false);
        const userData =
          response?.data?.user?.subscription !== null &&
          JSON.parse(response?.data?.user?.subscription?.receipt_data);
        // setUserDetails(userData);
        let varForVideoCount =
          parseInt(userData?.free_video_consults) -
          parseInt(userData?.consume_free_video_consults);
        if (
          response?.data?.user?.subscription === null &&
          response?.data?.user?.trial_consultation === 0
        ) {
          if (response?.data?.user?.transaction_count > 0) {
            window.location.href = "/subscribed-user";
          } else {
            window.location.href = "/buy-subscription-package";
          }
        } else if (
          response?.data?.user?.subscription === true &&
          varForVideoCount <= 0 &&
          response?.data?.user?.transaction_count === 0
        ) {
          window.location.href = "/subscribed-user";
        } else if (
          response?.data?.user?.subscription === null &&
          response?.data?.user?.transaction_count > 0
        ) {
          window.location.href = "/subscribed-user";
        } else if (response?.data?.user?.trial_consultation === 1) {
          window.location.href = "/first-video-consultation";
        } else {
          window.location.href = "/subscribed-user";
        }
      })();
    }
  }

  function handleSamePageSehatScan() {

    if (pageName === "/sehat-scan" && widgetData?.[0]?.button_text === 'Scan Now') {
      if (isAndroid) {
        window.location.href = "https://play.google.com/store/apps/details?id=pk.merisehat.app&pli=1"
      }

      else if (isIOS) {
        window.location.href = "https://apps.apple.com/us/app/meri-sehat/id1643174046"
      }

      else {
        scrollToTop()
      }

    }
  }

  const [fromFad, setFromFad] = useState(false);

  useEffect(() => {
    if (router.pathname == "/find-a-doctor") {
      setFromFad(true)
    }
    else {
      setFromFad(false)
    }
  }, [router.pathname]);

  return (
    <SimpleCard
      bgColor={`${widgetData?.[0]?.card_color}`}
      fromFad={fromFad}
    >
      {fromFad ? (
        <>
          <div className="first_wrapper_fad_card">
            <div className="left__first__fad_card">
              {widgetData?.[0]?.heading && (
                <SubSectionHeading text={widgetData?.[0]?.heading} />
              )}
              {widgetData?.[0]?.description && (
                <HeadingDesc text={widgetData?.[0]?.description} />
              )}
              {widgetData?.[0]?.redirect_url &&
                widgetData?.[0]?.button_text && (
                  <>
                    {router.pathname.includes("doctor-now") ? (
                      <button onClick={consultNowHandler}>
                        {widgetData?.[0]?.button_text}
                        {/* <RightArrowWithoutBorder /> */}
                      </button>
                    ) : (
                      <Link
                        href={"/doctor-now"}
                        onClick={handleSamePageSehatScan}
                        className="btn_anchor_fad"
                      >
                        <button className={fromFad ? "btn_anchor_fad__consult" : "d-lg-block circular-std text-uppercase"}>
                          {widgetData?.[0]?.button_text}
                        </button>

                        {/* <RightArrowWithoutBorder /> */}
                      </Link>
                    )}
                  </>
                )}
            </div>
            <div className="img__fad_card">
              {widgetData?.[0]?.image ? (
                <Image
                  crossorigin="anonymous"
                  src={widgetData?.[0]?.image}
                  alt={
                    widgetData?.[0]?.alt ? widgetData?.[0]?.alt : null
                  }
                  className="img-fluid"
                  width={287}
                  height={340}
                />
              ) : (
                <ImageLoader />
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={
              widgetData?.[0]?.image_position == "left"
                ? "flex-row-reverse row "
                : "d-flex row"
            }
          >
            <Col
              className="urdu-cont right_content wellness_boxes mob_mb-20 "
              lg={6}
              md={12}
              xs={7}
            >
              <div
                className={`content_container left_content hk_font_sizes TwoContentContainer`}
              >
                <div>
                  {widgetData?.[0]?.heading && (
                    <SubSectionHeading
                      text={widgetData?.[0]?.heading}
                    />
                  )}
                  {widgetData?.[0]?.description && (
                    <HeadingDesc
                      text={widgetData?.[0]?.description}
                    />
                  )}
                </div>

                {widgetData?.[0]?.redirect_url &&
                  widgetData?.[0]?.button_text && (
                    <>
                      {router.pathname.includes("doctor-now") ? (
                        <button
                          onClick={consultNowHandler}
                          className="btn_container underline_ancerContent under simple_btn d-flex align-items-center justify-content-center viewDoctorBtn"
                        >
                          {widgetData?.[0]?.button_text}
                          <RightArrowWithoutBorder />
                        </button>
                      ) : (
                        <a
                          href="javascript:;"
                          onClick={handleSamePageSehatScan}
                          className="btn_container underline_ancerContent simple_btn d-flex align-items-center justify-content-center viewDoctorBtn"
                        >
                          <span className="d-lg-block  circular-std text-uppercase">
                            {widgetData?.[0]?.button_text}
                          </span>

                          <RightArrowWithoutBorder />
                        </a>
                      )}
                    </>
                  )}
              </div>
            </Col>
            <Col
              lg={6}
              md={12}
              xs={5}
              className="imageBox urdu_img_box urdu_box_dr1 drnowBox"
            >
              {widgetData?.[0]?.image ? (
                <Image
                  crossorigin="anonymous"
                  src={widgetData?.[0]?.image}
                  alt={
                    widgetData?.[0]?.alt ? widgetData?.[0]?.alt : null
                  }
                  className="img-fluid resImageFix"
                  width={287}
                  height={340}
                />
              ) : (
                <ImageLoader />
              )}
            </Col>
          </div>
        </>
      )}
    </SimpleCard>
  );
}

function RightCardContent(props) {
  const { widgetData = [] } = props;

  const router = useRouter();
  const [fromFad, setFromFad] = useState(false);

  useEffect(() => {
    if (router.pathname == "/find-a-doctor") {
      setFromFad(true)
    }
    else {
      setFromFad(false)
    }
  }, [router.pathname]);

  const mixPanelTracking = () => {
    // mixpanel.track(`${widgetData?.[1]?.heading === 'Discover Women’s Wellness' ? 'Discover Women’s Wellness' : 'Book a video call'}`, {
    //   'Name': userDetailsInfo?.name, 'Email': userDetailsInfo?.email, 'Number': userDetailsInfo?.phone
    // });
  };

  function consultNowHandler() {
    const Authorization = Cookies.get("Authorization");
    if (!Authorization) {
      window.location.href = "/confirm-mobile-number";
    } else {
      (async () => {
        // setLoading(true);
        const response = await API.get(`/user`);
        // setLoading(false);
        const userData =
          response?.data?.user?.subscription !== null &&
          JSON.parse(response?.data?.user?.subscription?.receipt_data);
        // setUserDetails(userData);
        let varForVideoCount =
          parseInt(userData?.free_video_consults) -
          parseInt(userData?.consume_free_video_consults);
        if (
          response?.data?.user?.subscription === null &&
          response?.data?.user?.trial_consultation === 0
        ) {
          if (response?.data?.user?.transaction_count > 0) {
            window.location.href = "/subscribed-user";
          } else {
            window.location.href = "/buy-subscription-package";
          }
        } else if (
          response?.data?.user?.subscription === true &&
          varForVideoCount <= 0 &&
          response?.data?.user?.transaction_count === 0
        ) {
          window.location.href = "/subscribed-user";
        } else if (
          response?.data?.user?.subscription === null &&
          response?.data?.user?.transaction_count > 0
        ) {
          window.location.href = "/subscribed-user";
        } else if (response?.data?.user?.trial_consultation === 1) {
          window.location.href = "/first-video-consultation";
        } else {
          window.location.href = "/subscribed-user";
        }
      })();
    }
  }

  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

  return (
    <div className={(fromFad && isMobile) ? "ml0" : ""}>
      <SimpleCard
        bgColor={`${widgetData?.[1]?.card_color}`}
        fromFad={fromFad}
      // rightCarding = {rightCarding}
      >
        {fromFad ? (
          <>
            <div className="first_wrapper_fad_card">
              <div className="left__first__fad_card">
                {widgetData?.[1]?.heading && (
                  <SubSectionHeading text={widgetData?.[1]?.heading} />
                )}
                {widgetData?.[1]?.description && (
                  <HeadingDesc text={widgetData?.[1]?.description} />
                )}
                {widgetData?.[1]?.redirect_url &&
                  widgetData?.[1]?.button_text && (
                    <>
                      {router.pathname.includes("doctor-now") ? (
                        <button
                          onClick={consultNowHandler}
                        >
                          {widgetData?.[1]?.button_text}
                          {/* <RightArrowWithoutBorder /> */}
                        </button>
                      ) : (
                        <Link
                          href={widgetData?.[1]?.redirect_url || ""}
                          onClick={consultNowHandler}
                        >
                          <button className={fromFad ? "btn_anchor_fad__consult " : "d-lg-block circular-std text-uppercase"}>
                            {widgetData?.[1]?.button_text}
                          </button>
                          <button className={fromFad ? "d-none" : "d-lg-none d-block"}>
                            {i18nData?.scan_now}
                          </button>
                          {/* <RightArrowWithoutBorder /> */}
                        </Link>
                      )}
                    </>
                  )}
              </div>
              <div className="img__fad_card">
                {widgetData?.[1]?.image ? (
                  <Image
                    crossorigin="anonymous"
                    src={widgetData?.[1]?.image}
                    alt={
                      widgetData?.[1]?.alt ? widgetData?.[1]?.alt : null
                    }
                    className="img-fluid"
                    width="287"
                    height="372"
                  />
                ) : (
                  <ImageLoader />
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={
                widgetData?.[1]?.image_position == "left"
                  ? "flex-row-reverse row"
                  : "d-flex row"
              }
            >
              <Col
                className="urdu-cont hk_font_sizes right_content wellness_boxes "
                lg={6}
                md={12}
                xs={8}
              >
                <div
                  className={`content_container TwoContentContainer`}
                >
                  <div>
                    {widgetData?.[1]?.heading && (
                      <SubSectionHeading
                        text={widgetData?.[1]?.heading}
                      />
                    )}
                    {widgetData?.[1]?.description && (
                      <HeadingDesc
                        text={widgetData?.[1]?.description}
                      />
                    )}
                  </div>
                  {widgetData?.[1]?.redirect_url &&
                    widgetData?.[1]?.button_text && (
                      <>
                        {router.pathname.includes("doctor-now") ? (
                          <button
                            onClick={consultNowHandler}
                            className="btn_container underline_ancerContent simple_btn d-flex align-items-center justify-content-center viewDoctorBtn"
                          >
                            {widgetData?.[1]?.button_text}
                            <RightArrowWithoutBorder />
                          </button>
                        ) : (
                          <Link
                            href={widgetData?.[1]?.redirect_url || ""}
                            onClick={consultNowHandler}
                            className="btn_container underline_ancerContent simple_btn d-flex align-items-center justify-content-center viewDoctorBtn text-uppercase max-width-200"
                          >
                            <span className="d-lg-block d-sm-none circular-std text-uppercase">
                              {widgetData?.[1]?.button_text}
                            </span>
                            {/* <span className="d-lg-none d-block">
                              {i18nData?.scan_now}
                            </span> */}

                            <RightArrowWithoutBorder />
                          </Link>
                        )}
                      </>
                    )}
                </div>
              </Col>
              <Col
                lg={6}
                md={12}
                className="imageBox mob_box01 urdu_box_dr1 left_box_01"
                xs={4}
              >
                {widgetData?.[1]?.image ? (
                  <Image
                    crossorigin="anonymous"
                    src={widgetData?.[1]?.image}
                    alt={
                      widgetData?.[1]?.alt ? widgetData?.[1]?.alt : null
                    }
                    className="img-fluid"
                    width="287"
                    height="372"
                  />
                ) : (
                  <ImageLoader />
                )}
              </Col>
            </div>
          </>
        )}
      </SimpleCard>
    </div>
  );
}
export default MonitorHealthSection;
