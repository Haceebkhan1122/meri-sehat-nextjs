import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import ImageLoader from "../ImageLoader";

function StartAVideoCall(props) {
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
      {isMobile ? (
        <>
          <section className="healthcheck cta01  mt-80 pt-5 mb-0" data-aos="fade-up" data-aos-duration="800">
            <Container>
              <div className="home_cta p-3">
                <Row className="align-items-center">
                  <Col xs={12} className="forResponsiveBanner text-center fell_wellness">
                    <h3 className="headingnew3">
                      {widgetData?.data?.[0]?.heading}
                    </h3>
                    <p>{widgetData?.data?.[0]?.description}</p>
                    <Link
                      href={widgetData?.data?.[0]?.redirect_url}
                      className="review-button  text-uppercase continue-phone-btn position-relative"
                    >
                      {" "}
                      {widgetData?.data?.[0]?.button_text}
                      <span
                        className="continue-phone-chevron instant-code-chev"
                        style={{ height: "53px" }}
                      >
                        <FiChevronRight />
                      </span>
                    </Link>
                  </Col>

                  <Col xs={5} className="ms-auto for_custom_pages">
                    {widgetData?.data?.[0]?.image ?
                      <Image
                        src={widgetData?.data?.[0]?.image}
                        width={300}
                        height={300}
                        alt={widgetData?.data?.[0]?.alt ? widgetData?.data?.[0]?.alt : null}
                        className="img-fluid dr_image"
                      />
                      :
                      <ImageLoader />
                    }

                  </Col>
                </Row>
              </div>
            </Container>
          </section>
        </>
      ) : (
        <section className="healthcheck cta01  mt-80 pt-5 mb-5  " data-aos="fade-up" data-aos-duration="800">
          <Container>
            <Row>
              <Col lg="12" md="12">
                <div className="home_cta">
                  <Row className="align-items-center">
                    <Col xs={12} lg={3} className="ms-auto for_custom_pages">
                      {widgetData?.data?.[0]?.image ?
                        <Image
                          src={widgetData?.data?.[0]?.image}
                          width={300}
                          height={300}
                          alt={widgetData?.data?.[0]?.alt ? widgetData?.data?.[0]?.alt : null}
                          className="img-fluid dr_image"
                        />
                        :
                        <ImageLoader />
                      }

                    </Col>
                    <Col xs={12} lg={4} className="text-center">
                      <h3 className="headingnew3">
                        {widgetData?.data?.[0]?.heading}
                      </h3>
                      <p>{widgetData?.data?.[0]?.description}</p>
                    </Col>
                    <Col xs={12} lg={4} className="">
                      <Link
                        href={widgetData?.data?.[0]?.redirect_url}
                        className="review-button  text-uppercase continue-phone-btn position-relative"
                      >
                        {" "}
                        {widgetData?.data?.[0]?.button_text}
                        <span
                          className="continue-phone-chevron instant-code-chev"
                          style={{ height: "53px" }}
                        >
                          <FiChevronRight />
                        </span>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
}

export default StartAVideoCall;
