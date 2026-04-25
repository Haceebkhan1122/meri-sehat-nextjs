import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ImageLoader from "../ImageLoader";
import { FiChevronRight } from "react-icons/fi";

function DoctorsWaiting(props) {
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
        data-aos="fade-up"
        data-aos-duration="800"
        className={`doctors_waiting _mt-0 ${
          widgetData?.data?.[0].sub_head === "for_only_this_widget_key"
            ? "introducingBanner"
            : "videoCallDocs"
        }`}
      >
        {isMobile ? (
          <>
            <Container>
              <Image
                src={widgetData?.data?.[0].image}
                alt="brands"
                width={500}
                height={500}
                className="img-fluid"
                crossorigin="anonymous"
              />
              <div
                className={`${
                  widgetData?.data?.[0].sub_head === "for_only_this_widget_key"
                    ? "card"
                    : ""
                }`}
              >
                <h2 className="text-initial fw-600 border-bottom-0 color-313131">
                  {widgetData?.data?.[0].heading}
                </h2>
                <p className="heading_desc">
                  {widgetData?.data?.[0].description}
                </p>
                <Image
                  src={widgetData?.data?.[0].image}
                  alt="brands"
                  width={500}
                  height={500}
                  className="img-fluid"
                  crossorigin="anonymous"
                />
                {/* <Link href="/doctor-now"><Image width={35} height={35} src={img1} alt="icon" /><span className='underline_ancer'>{widgetData?.data?.[0].button_text}</span> </Link> */}
                <Link
                  href={widgetData?.data?.[0].redirect_url || ""}
                  style={{ minWidth: "300px" }}
                  className={`review-button m-auto add-review-btn text-uppercase max-width-300 fw-700 mt-5 mb-5 position-relative simple-btn-mobile instantBannerNewBtn`}
                >
                  <span className="cons_now">
                    {widgetData?.data?.[0].button_text}
                    {/* qasim */}
                  </span>
                </Link>
              </div>
            </Container>
          </>
        ) : (
          <Container>
            <Row>
              <Col md={6} className="px-3 order-2 order-md-1 c_1">
                <div
                  className={`${
                    widgetData?.data?.[0].sub_head ===
                    "for_only_this_widget_key"
                      ? "card"
                      : ""
                  }`}
                >
                  <h2 className="text-initial fw-600 border-bottom-0 color-313131">
                    {widgetData?.data?.[0].heading}
                  </h2>
                  <p className="heading_desc">
                    {widgetData?.data?.[0].description}
                  </p>
                  {/* <Link href="/doctor-now"><Image width={35} height={35} src={img1} alt="icon" /><span className='underline_ancer'>{widgetData?.data?.[0].button_text}</span> </Link> */}
                  <a
                    href={widgetData?.data?.[0]?.redirect_url}
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
                  </a>
                </div>
              </Col>
              <Col md={6} className="px-3 text-end order-1 order-md-2 c_2">
                {widgetData?.data?.[0].image ? 
                <Image
                src={widgetData?.data?.[0].image}
                alt={widgetData?.data?.[0]?.alt}
                width={500}
                height={500}
                className="img-fluid"
                crossorigin="anonymous"
              />
                : <ImageLoader/> }
                
              </Col>
            </Row>
          </Container>
        )}
      </section>
    </>
  );
}

export default DoctorsWaiting;
