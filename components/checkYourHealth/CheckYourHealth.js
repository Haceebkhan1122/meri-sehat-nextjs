import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import ImageLoader from "../ImageLoader";

function CheckYourHealth(props) {
  const { widgetData = [], key } = props;
  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [i18nData, setI18nData] = useState(null);
  const router = useRouter();
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);
  useEffect(() => {
    import("react-device-detect").then((item) => {
      setIsMobile(item.isMobile);
    });
  }, []);

  useEffect(() => {
    setData(widgetData?.data);
  }, [widgetData]);

  const slicingData = widgetData?.data?.slice(1);

  return (
    <>
      <section
        className="healthcheck mb-5 position-relative"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <Container>
          <div className="box_health health_home_mob">
            <Row>
              <Col xs={12} lg={6} className="mt-auto order-2 order-md-1">
                <h2 className="headingnew2">
                  {widgetData?.data?.[0]?.heading}
                </h2>
                <ul>
                  {slicingData?.length > 0 &&
                    slicingData?.map((item) => {
                      return (
                        <>
                          <li data-aos="fade-up" data-aos-duration="1800">
                            <Image
                              src={item?.image}
                              width={84}
                              height={84}
                              className="img-fluid"
                              alt={item?.alt ? item?.alt : null}
                            />
                            <h4>{item?.heading}</h4>
                          </li>
                        </>
                      );
                    })}
                </ul>
                {isMobile ? (
                  <>
                    {router?.pathname?.includes("wellness") ? (
                      <Link
                        href={widgetData?.data?.[0]?.redirect_url || ""}
                        className="review-button mt-70 continue-phone-btn position-relative bg-pink"
                      >
                        {i18nData?.scan_heart_now}
                      </Link>
                    ) : (
                      <Link
                        href={widgetData?.data?.[0]?.redirect_url || ""}
                        className="review-button mt-70 text-uppercase continue-phone-btn position-relative bg-pink test_btn"
                      >
                        {i18nData?.scan_heart_now}
                      </Link>
                    )}
                  </>
                ) : (
                  <Link
                    href={widgetData?.data?.[0]?.redirect_url || ""}
                    className="review-button mt-70 text-uppercase continue-phone-btn position-relative"
                  >
                    {widgetData?.data?.[0]?.button_text}

                    <span
                      className="continue-phone-chevron instant-code-chev"
                      style={{ height: "53px" }}
                    >
                      <FiChevronRight />
                    </span>
                  </Link>
                )}
              </Col>
              <Col xs={12} lg={6} className="ms-auto">
                {widgetData?.data?.[0]?.image ? (
                  <Image
                    src={widgetData?.data?.[0]?.image}
                    width={650}
                    height={650}
                    alt={
                      widgetData?.data?.[0]?.alt
                        ? widgetData?.data?.[0]?.alt
                        : null
                    }
                    className="img-fluid imgBottomFixx urdu-scale"
                  />
                ) : (
                  <ImageLoader width={200} height={200} />
                )}
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
}

export default CheckYourHealth;
