import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import pricingCta from "../../public/png/pricing-cta.png";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

function BenefitsOfInstantConsultation(props) {
  const { widgetData = [], key } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(widgetData?.data);
  }, [widgetData]);

  return (
    <>
      <section
        className="trusted_partners mb-0 how_to_install"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <Container>
          <Row className="mx-3">
            <Col md={12} className="px-3">
              <section className="healthcheck cta01 mx-3 mt-5 pb-3">
                <Container>
                  <Row>
                    <div className="home_cta pricingCta">
                      <Row className="align-items-center">
                        <Col xs={12} lg={1} className="ms-auto">
                          <Image
                            width={110}
                            height={110}
                            src={widgetData?.data?.[0]?.image}
                            className="img-fluid dr_image"
                            alt="Doctor Image"
                          />
                        </Col>
                        <Col xs={12} lg={7} className="text-center">
                          <h3 className="headingnew3">
                            {widgetData?.data?.[0]?.heading}
                          </h3>
                        </Col>
                        <Col xs={12} lg={4} className="">
                          <a
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
                          </a>
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
    </>
  );
}

export default BenefitsOfInstantConsultation;
