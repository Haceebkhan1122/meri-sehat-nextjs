import React, { useState, useEffect } from 'react'
import styles from '../mainBanner/MainBanner.module.scss'
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import NewsLatter from '../newsLatter/newsLatter';
import CallNowBtnDoctor from '../../../components/componentsUpdated/callNowBtn/CallNowBtn';
import AppLogoes from '../../../components/componentsUpdated/Pricing/appLogo/appLogo';
import parse from 'html-react-parser';
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { APIV3 } from "@/utils/httpService";
import QRModal from '../qRModal/QRModal';
import mixpanel from "mixpanel-browser";
import Loader from '@/components/Loader';
import TryNowModal from '@/components/TryNowModal/TryNowModal';
import { useRouter } from 'next/router';

const MainBanner = (props) => {
  console.log("props btn", props);
  const router = useRouter()
  const [tryNow, setTryNow] = useState(false);
  const [tryNowData, setTryNowData] = useState();
  const [qRModalIsShow, setQRModalIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const isUserAuthenticate = Cookies.get('Authorization')
  let userData = useSelector((state) => state?.user?.userData);
  const [notificationData, setNotificationData] = useState([]);
  const REDIRECTTRYNOW = process.env.NEXT_PUBLIC_TRYNOW_REDIRECT;
  const REDIRECTSEHATSCAN = process.env.NEXT_PUBLIC_SEHATSCAN_REDIRECT;

  const handleTryNowModalClose = () => setTryNow(false);

  const tryNowJourney = async () => {
    const res = await APIV3.get(`/try-now-app`);
    if (res?.status == 200) {
      setTryNowData(res?.data?.data);
    }
    else {
      setTryNowData(true);
    }
  }

  useEffect(() => {
    if (props?.pageName == "sehat-scan-v3" && isUserAuthenticate) {
      tryNowJourney();
    }
  }, [props?.pageName])

  useEffect(() => {
    const fetchNotifications = async () => {
      if (isUserAuthenticate && props.pageName == "doctor-now-v3") {
        try {
          const response = await APIV3.get(`/notifications?page=1`);
          if (response?.status == 200) {
            setNotificationData(response?.data?.data);
          }
        } catch (error) {
        }
      }
    };

    fetchNotifications();
  }, [isUserAuthenticate, props.pageName]);

  const handleTryNowModalShow = () => {
    if (isUserAuthenticate) {
      window.location.href = `${REDIRECTTRYNOW}`;
    } else {
      setTryNow(true);
    }
    mixpanel.track('sehat scan clicked');

  };

  const handleScanNow = () => {
    mixpanel.track('sehat scan clicked');
    window.location.href = `${REDIRECTSEHATSCAN}`;
  };

  const QrModalHandler = () => {
    mixpanel.track('scan now clicked from web');
    setQRModalIsShow(true)
  }


  function consultNowHandler() {
    const Authorization = Cookies.get("Authorization");
    if (!Authorization) {
      window.location.href = "/phone-number";
      Cookies.set('loginFromDoctorNow', 1)
    } else {
      if (notificationData !== null && notificationData?.waiting_time > 0) {
        window.location.href = "/search-for-doctor";
      }
      else {
        window.location.href = "/subscribed-user";

      }
    }
    mixpanel.track('Doctor Now', {
      page: 'Consult now button clicked',
    });
  }

  function redirectCwpWorksop(href) {
    router.push(href)
  }

  const LoginModalHandler = () => {
    setTryNow(true)
  }

  console.log({ props })

  return (
    <>
      {loading && <Loader />}
      <section className={`${styles.bannerMain} bannerMain ${props?.widgetData?.slug === "sehat-scan-v3" ? "sehatScan_res" : ''} ${props?.widgetData?.slug === "pricing-v3" ? 'pricingBannerSelf' : ''}  ${props?.widgetData?.slug === "careers-v3" ? 'careerBanner' : ''}`}
        style={{
          backgroundColor: props?.pageName === "pricing-v3"
            ? props.widgetData?.data?.[0]?.card_1_color
            : props?.widgetData?.slug === "careers-v3"
              ? props.widgetData?.data?.[0]?.card_1_inner_color
              : props?.widgetData?.data?.banner_color
        }}>
        <Container className='h-100'>
          <Row className='h-100 ff' >
            <Col className={
              props?.widgetData?.slug === "careers-v3" ? `my-auto col-lg-6 col-md-6  col-12 or-2` :

                props?.widgetData?.slug === "sehat-a-z-v3" ? ` my-auto col-lg-6 col-md-6 text-center ${styles.sehat_col_left} sehat_col_left` :
                  props?.widgetData?.slug === "sehat-scan-v3" ? "my-auto text-start or2 col-lg-6 col-md-6k align_mobi col-12" :
                    props?.widgetData?.slug === "ambulatory" ? "my-auto text-start or2 col-lg-6 col-md-6k align_mobi col-12" :
                      props?.widgetData?.slug === "corporate-wellness-program-workshop" ? `my-auto text-start or1 col-lg-6 col-md-6k align_mobi col-12` :

                        props?.widgetData?.slug === "doctor-now-v3" ? "my-auto col-lg-6 col-md-6 col px-0" :
                          props?.widgetData?.slug === "at-home" ? "my-auto col-lg-6 col-md-6 col-6 mobile-center col-xs-12 col-12 text-center1" :
                            props?.widgetData?.slug === "pricing" ? "text-start my-auto  col-lg-5 col-md-5 col-6" : "my-auto col-lg-6 col-md-6 col-6 mobile-center"

            } >
              {props?.widgetData?.slug === "careers-v3" && <>

                <h1 className='' style={{
                  color:
                    props?.widgetData?.slug === "careers-v3"
                      ? props?.widgetData?.data?.[0]?.card_1_color
                      : "inherit" // default color rakho
                }}
                >
                  {props?.widgetData?.data?.[0]?.heading && parse(props?.widgetData?.data?.[0]?.heading)}
                </h1>
                <p className={`${styles.mb48} sehtScanMb0`}
                  style={{
                    color:
                      props?.widgetData?.slug === "careers-v3"
                        ? props?.widgetData?.data?.[0]?.card_1_color
                        : "inherit" // default color rakho
                  }}
                >{props?.widgetData?.data?.[0]?.description}</p>

                <div className={`${styles.wrape_rate} boxRating dd`}>
                  {props?.widgetData?.data
                    ?.filter((_, index) => index !== 0) // 👈 0 index hata do
                    .map((item, index) => (
                      <Col key={index} lg={3} className="newBox">
                        <div className={`${styles.single_rate} rateMiddle`}>
                          <h2 style={{ color: "#fff", }}>{item?.heading && parse(item?.heading)}</h2>
                          <span style={{ color: "#fff", }}>{item?.description && parse(item?.description)}</span>
                        </div>
                      </Col>
                    ))}
                </div>


              </>}
              {(props?.pageName === "ambulatory" || props?.pageName === "corporate-wellness-program-workshop" || props?.pageName === "at-home") && (
                <h1 className='d-lg-none d-block'>
                  {props?.widgetData?.heading && parse(props?.widgetData?.heading)}
                </h1>
              )}
              {props?.pageName == "pricing-v3" ? (
                <>
                  {props?.widgetData?.data?.[0]?.card_1_icon && (
                    <Image src={props?.widgetData?.data?.[0]?.card_1_icon} width={472} height={492} className={`${styles.banner__img}  img-fluid `} alt='banner image' />
                  )}
                </>
              ) : (
                <>

                  {props?.widgetData?.data?.image && (
                    <>
                      <Image src={props?.widgetData?.data?.image} width={472} height={492} className={`${styles.banner__img}  img-fluid imageDrNow`} alt='banner image' />
                    </>
                  )}
                </>
              )}
            </Col>
            <Col className={
              props?.widgetData?.slug === "sehat-scan-v3" ? `my-auto or1 col-lg-6 col-md-6  col-12` :
                props?.widgetData?.slug === "careers-v3" ? `my-auto or1 col-lg-6 col-md-6 ` :
                  props?.widgetData?.slug === "ambulatory" ? `my-auto or1 col-lg-6 col-md-6 col-12` :
                    props?.widgetData?.slug === "corporate-wellness-program-workshop" ? `my-auto or2 col-lg-6 col-md-6 col-12 col-12` :
                      props?.widgetData?.slug === "pricing" ? "my-auto ms-auto col-lg-6 col-md-6 col-6" :
                        props?.widgetData?.slug === "sehat-a-z-v3" ? `my-auto  col-lg-6 col-md-6 ${styles.sehatScanRight}` :
                          props?.widgetData?.slug === "doctor-now-v3" ? "my-auto col-lg-5 col-md-5 ms-auto" : "my-auto col-lg-6 col-md-5"}>
              <div className={props?.widgetData?.slug === "pricing" ? "ml20" :
                "ps-4"} >
                {props?.widgetData?.slug === "careers-v3" && <>
                  <Image src={props?.widgetData?.data?.[0]?.image} width={472} height={492} className={`${styles.banner__img}  img-fluid imageBanner`} alt='banner image' />


                </>}
                {props?.pageName == "pricing-v3" ? (
                  <>
                    <h1 className=''>{props?.widgetData?.data?.[0]?.heading}  </h1>
                    <p className={`${styles.mb48} sehtScanMb0`}>{props?.widgetData?.data?.[0]?.description}</p>
                    {(props?.page !== "" && props?.pageName == "pricing-v3") && <AppLogoes iconAndLinks={props?.widgetData?.data?.[0]} pageName={props?.pageName} />}
                  </>
                ) : (
                  <>
                    <h1 className='mobileHeading ss'>{props?.widgetData?.heading && parse(props?.widgetData?.heading)}</h1>
                    <p className={`${styles.mb48} ${styles.para_seha} sehtScanMb0 `}>{props?.widgetData?.description && parse(props?.widgetData?.description)}</p>
                    <NewsLatter props={props?.pageName} />

                    {(props?.pageName !== "" && props?.pageName == "doctor-now-v3") && <CallNowBtnDoctor consultNowHandler={consultNowHandler} widgetData={props?.widgetData} text="CALL NOW" href="" buttonColor={props?.widgetData?.data?.banner_color_inner} pageName={props?.pageName} />}
                    {((props?.pageName !== "" && props?.pageName == "corporate-wellness-program-workshop") || (props?.widgetData?.slug !== "" && props?.widgetData?.slug == "corporate-wellness-v3")) && <CallNowBtnDoctor redirectCwpWorksop={redirectCwpWorksop} consultNowHandler={consultNowHandler} widgetData={props?.widgetData} text={"BOOK A WORKSHOP"} href={props?.widgetData?.redirect_url || '/'} buttonColor={props?.widgetData?.data?.banner_color_inner} pageName={props?.pageName} />}
                    {(props?.pageName !== "" && props?.pageName == "ambulatory") && <CallNowBtnDoctor QrModalHandler={QrModalHandler} consultNowHandler={consultNowHandler} widgetData={props?.widgetData} text="call - 021-111-111-111" href="tel:021111111111" buttonColor={props?.widgetData?.data?.banner_color_inner} pageName={props?.pageName} />}
                    {(props?.pageName !== "" && props?.pageName == "at-home") && <CallNowBtnDoctor QrModalHandler={QrModalHandler} consultNowHandler={consultNowHandler} widgetData={props?.widgetData} text="call - 021-111-111-111" href="tel:021111111111" buttonColor={props?.widgetData?.data?.banner_color_inner} pageName={props?.pageName} />}
                    {((!isUserAuthenticate || isUserAuthenticate && tryNowData?.is_avail_try_now == false) && userData?.user?.subscription_recent == null) && (
                      <>
                        {(props?.pageName !== "" && props?.pageName == "sehat-scan-v3") && <CallNowBtnDoctor LoginModalHandler={LoginModalHandler} QrModalHandler={QrModalHandler} userData={userData} tryNowData={tryNowData} isUserAuthenticate={isUserAuthenticate} tryNowFunc={handleTryNowModalShow} widgetData={props?.widgetData} text="Try Now" href="" buttonColor={props?.widgetData?.data?.banner_color_inner} pageName={props?.pageName} />}
                      </>
                    )}

                    {tryNowData !== null && userData?.user?.subscription_recent && (
                      <>
                        {(props?.pageName !== "" && props?.pageName == "sehat-scan-v3") && <CallNowBtnDoctor LoginModalHandler={LoginModalHandler} QrModalHandler={QrModalHandler} userData={userData} tryNowData={tryNowData} isUserAuthenticate={isUserAuthenticate} startScanFun={handleScanNow} widgetData={props?.widgetData} text="Start Scan" href="" buttonColor={props?.widgetData?.data?.banner_color_inner} pageName={props?.pageName} />}
                      </>
                    )}
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <QRModal pageName={props.pageName} qRModalIsShow={qRModalIsShow} setQRModalIsShow={setQRModalIsShow} />
      <TryNowModal handleTryNowModalClose={handleTryNowModalClose} tryNow={tryNow} setTryNow={setTryNow} />
    </>
  )
}

export default MainBanner;