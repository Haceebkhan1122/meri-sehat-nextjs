import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import LoadingSkeleton from "../loadingSkeleton/LoadingSkeleton";
import appStore from "../../public/svg/AppStoreDownload.svg";
import playStore from "../../public/png/apple123.png";
import ImageLoader from "../ImageLoader";
function TrackYourHealth(props) {
  const { widgetData = [], key } = props;
  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    import("react-device-detect").then((item) => {
      setIsMobile(item.isMobile);
    });
  }, []);

  useEffect(() => {
    setData(widgetData?.data);
  }, [widgetData]);

  return (
    <>
      <section
        className="doctors_waiting trackyourhealth"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        {isMobile ? (
          <>
            <Container>
              <h2 className="text-initial fw-600 borderBottomMob mt-0">
                {widgetData?.data?.[0].heading}
              </h2>
              <p className="mb-4" style={{fontSize:'16px'}}>{widgetData?.data?.[0].description}</p>
            </Container>
            <div className="_bg-gray-mobile-pricing pb-5">
              <Container>
                {widgetData?.data?.[0].image ? (
                  <Image
                    // loader={imageLoader}
                    crossorigin="anonymous"
                    width={500}
                    height={500}
                    src={widgetData?.data?.[0].image}
                    alt="brands"
                    className="left_side img-fluid"
                    placeholder="blur"
                    blurDataURL="https://placehold.co/600x400"
                    // onLoad={onLoadingComplete}
                  />
                ) : (
                  <LoadingSkeleton />
                )}
                <ul>
                  <li data-aos="fade-up" data-aos-duration="800">
                    <div className="d-flex align-items-start">
                      <div className="iconnn">
                        <Image
                          crossorigin="anonymous"
                          width={50}
                          height={50}
                          src={widgetData?.data?.[0].card_1_icon}
                          alt="brand"
                        />
                      </div>
                      <div className="intro_hk">
                        <h3>{widgetData?.data?.[0].card_1_head}</h3>
                        <p>{widgetData?.data?.[0].card_1_desc}</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="1800">
                    <div className="d-flex align-items-start">
                      <div className="iconnn">
                        <Image
                          width={50}
                          height={50}
                          crossorigin="anonymous"
                          src={widgetData?.data?.[0].card_2_icon}
                          alt="brand"
                        />
                      </div>
                      <div className="intro_hk">
                        <h3>{widgetData?.data?.[0].card_2_head}</h3>
                        <p>{widgetData?.data?.[0].card_2_desc}</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="2100">
                    <div className="d-flex align-items-start">
                      <div className="iconnn">
                        <Image
                          width={50}
                          height={50}
                          crossorigin="anonymous"
                          src={widgetData?.data?.[0].card_3_icon}
                          alt="brand"
                        />
                      </div>
                      <div className="intro_hk">
                        <h3>{widgetData?.data?.[0].card_3_head}</h3>
                        <p>{widgetData?.data?.[0].card_3_desc}</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="2300">
                    <div className="d-flex align-items-start">
                      <div className="iconnn">
                        <Image
                          width={50}
                          height={50}
                          crossorigin="anonymous"
                          src={widgetData?.data?.[0].card_4_icon}
                          alt="brand"
                        />
                      </div>
                      <div className="intro_hk">
                        <h3>{widgetData?.data?.[0].card_4_head}</h3>
                        <p>{widgetData?.data?.[0].card_4_desc}</p>
                      </div>
                    </div>
                  </li>
                </ul>
                <div
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  className="mb-3 pt-4 urdu-icon-mr"
                  data-aos="fade-up"
                  data-aos-duration="2500"
                >
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
                {/* <Link
                  href={widgetData?.data?.[0].redirect_url}
                  style={{ minWidth: "300px" }}
                  className={`review-button m-auto add-review-btn text-uppercase max-width-300 fw-700 mt-3 mb-3 position-relative simple-btn-mobile instantBannerNewBtn`}
                >
                  <span className="cons_now">
                    {widgetData?.data?.[0].button_text}
                  </span>
                </Link> */}
              </Container>
            </div>
          </>
        ) : (
          <Container>
            <Row>
              <Col md={5} className="px-3 mt-3 order-2 order-md-1">
                {widgetData?.data?.[0].image ? (
                  <Image
                    crossorigin="anonymous"
                    width={500}
                    height={500}
                    src={widgetData?.data?.[0].image}
                    alt={
                      widgetData?.data?.[0].alt
                        ? widgetData?.data?.[0].alt
                        : null
                    }
                    className="left_side img-fluid"
                    placeholder="blur"
                    blurDataURL="https://placehold.co/600x400"
                  />
                ) : (
                  <ImageLoader />
                )}
              </Col>
              <Col md={6} className="px-3 text-start offset-md-1">
                <h2 className="text-initial fw-600 border-bottom-0 mt-0">
                  {widgetData?.data?.[0].heading}
                </h2>
                <p>{widgetData?.data?.[0].description}</p>
                <ul className=" ">
                  <li data-aos="fade-up" data-aos-duration="800">
                    <div className="d-flex align-items-start">
                      <div className="iconnn">
                        <Image
                          crossorigin="anonymous"
                          width={50}
                          height={50}
                          src={widgetData?.data?.[0].card_1_icon}
                          alt={
                            widgetData?.data?.[0].alt
                              ? widgetData?.data?.[0].alt
                              : null
                          }
                        />
                      </div>
                      <div className="intro_hk">
                        <h3>{widgetData?.data?.[0].card_1_head}</h3>
                        <p>{widgetData?.data?.[0].card_1_desc}</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="1800">
                    <div className="d-flex align-items-start">
                      <div className="iconnn">
                        <Image
                          width={50}
                          height={50}
                          crossorigin="anonymous"
                          src={widgetData?.data?.[0].card_2_icon}
                          alt={
                            widgetData?.data?.[0].alt
                              ? widgetData?.data?.[0].alt
                              : null
                          }
                        />
                      </div>
                      <div className="intro_hk">
                        <h3>{widgetData?.data?.[0].card_2_head}</h3>
                        <p>{widgetData?.data?.[0].card_2_desc}</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="2100">
                    <div className="d-flex align-items-start">
                      <div className="iconnn">
                        <Image
                          width={50}
                          height={50}
                          crossorigin="anonymous"
                          src={widgetData?.data?.[0].card_3_icon}
                          alt={
                            widgetData?.data?.[0].alt
                              ? widgetData?.data?.[0].alt
                              : null
                          }
                        />
                      </div>
                      <div className="intro_hk">
                        <h3>{widgetData?.data?.[0].card_3_head}</h3>
                        <p>{widgetData?.data?.[0].card_3_desc}</p>
                      </div>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-duration="2300">
                    <div className="d-flex align-items-start">
                      <div className="iconnn">
                        <Image
                          width={50}
                          height={50}
                          crossorigin="anonymous"
                          src={widgetData?.data?.[0].card_4_icon}
                          alt={
                            widgetData?.data?.[0].alt
                              ? widgetData?.data?.[0].alt
                              : null
                          }
                        />
                      </div>
                      <div className="intro_hk">
                        <h3>{widgetData?.data?.[0].card_4_head}</h3>
                        <p>{widgetData?.data?.[0].card_4_desc}</p>
                      </div>
                    </div>
                  </li>
                </ul>
                {/* <Link
                  href={widgetData?.data?.[0].redirect_url}
                  style={{ minWidth: "300px" }}
                  className={`review-button add-review-btn text-uppercase max-width-300 fw-700 mt-3 mb-3 position-relative simple-btn-mobile instantBannerNewBtn`}
                >
                  <span className="cons_now">
                    {widgetData?.data?.[0].button_text}
                  </span>
                  <span
                    className={`add-review-chevron position-absolute`}
                    style={{
                      height: "43px",
                      left: "auto",
                      right: "0",
                      width: "50px",
                    }}
                  >
                    <FiChevronRight />
                  </span>
                </Link> */}

                <div
                  style={{ display: "flex" }}
                  className="mb-3 pt-4 urdu-icon-mr"
                >
                  <a
                    target="_blank"
                    href="https://apps.apple.com/us/app/meri-sehat/id1643174046"
                  >
                    <Image
                      src={appStore}
                      alt="logo"
                      className="img-fluid me-3 btn-apple "
                    />
                  </a>
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
              </Col>
            </Row>
          </Container>
        )}
      </section>
    </>
  );
}

export default TrackYourHealth;
