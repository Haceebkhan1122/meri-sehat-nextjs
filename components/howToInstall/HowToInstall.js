import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import pricingCta from "../../public/png/pricing-cta.png";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import ImageLoader from "../ImageLoader";
import { useRouter } from "next/router";
import BottomDoctorPamfh from '../bottom-doctor-pamfh/bottom-doctor-pamfh';

function HowToInstall(props) {
  const { widgetData = [], key } = props;
  const [data, setData] = useState([]);
  const [inPricing, setInPricing] = useState(false);

  useEffect(() => {
    setData(widgetData?.data);
  }, [widgetData]);

  const [fromFad, setFromFad] = useState(false);
  let router = useRouter()

  useEffect(() => {
    if (router.pathname == "/find-a-doctor") {
      setFromFad(true)
    }
    if (router.pathname == "/pricing") {
      setInPricing(true)
    }
  }, [router.pathname]);


  return (
    <>
      {fromFad ? (
        <section
          className="trusted_partners mb-0 how_to_install"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <BottomDoctorPamfh />
        </section>
      ) : (
        <section
          className="trusted_partners mb-0 how_to_install"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <Container>
            <Row className="mx-md-3">
              <Col md={12} className="px-md-3">
                <section className="healthcheck cta01 mx-3 mt-5 pb-3">
                  <Container>
                    <Row>
                      <div className={inPricing ? "d-none" : "home_cta pricingCta d"}>
                        <Row className="align-items-center">
                          <Col xs={3} lg={1} className="ms-auto">
                            {widgetData?.data?.[0]?.image ? (
                              <Image
                                width={110}
                                height={110}
                                src={widgetData?.data?.[0]?.image}
                                className="img-fluid dr_image"
                                alt={
                                  widgetData?.data?.[0].alt
                                    ? widgetData?.data?.[0].alt
                                    : null
                                }
                              />
                            ) : (
                              <ImageLoader />
                            )}
                          </Col>
                          <Col xs={7} lg={7} className="text-center">
                            <h3 className="headingnew3">
                              {widgetData?.data?.[0]?.heading}
                            </h3>
                            <div className="d-block d-lg-none labs_page">
                              <Link
                                href={widgetData?.data?.[0]?.redirect_url}
                                className="review-button  text-uppercase continue-phone-btn position-relative"
                              >
                                {widgetData?.data?.[0]?.button_text}
                                <span
                                  className="continue-phone-chevron instant-code-chev"
                                  style={{ height: "53px" }}
                                >
                                  <FiChevronRight />
                                </span>
                              </Link>
                            </div>
                          </Col>
                          <Col xs={12} lg={4} className="d-none d-lg-block">
                            <Link
                              href={widgetData?.data?.[0]?.redirect_url}
                              className="review-button  text-uppercase continue-phone-btn position-relative"
                            >
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
                    </Row>
                  </Container>
                </section>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
}

export default HowToInstall;
