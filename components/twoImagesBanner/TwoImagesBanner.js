import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Slider from 'react-slick'
import ImageLoader from '../ImageLoader';

function TwoImagesBanner(props) {
  const { widgetData } = props;

  const [isMobile, setIsMobile] = useState(false);

  const settings = {
    arrow: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
  };

  useEffect(() => {
    import("react-device-detect").then((item) => {
      setIsMobile(item.isMobile);
    });
  }, []);

  return (
    <Row
      className="bannerNewComponent labTestbannerComp  align-items-start pt-5 "
    >
      <Col md={6} xs={7}>
        <div className="home ds slider_labs custom_banner_center">
          {/* web */}
          <Slider {...settings}>
            {widgetData?.data?.map((item) => (
              <div className="d-block _home-head-vitals cc ">
                {widgetData?.data?.[0]?.card_2_icon ? (
                  <div style={{ marginTop: isMobile ? '2rem' : '' }} >
                    <Image
                      crossorigin="anonymous"
                      src={widgetData?.data?.[0]?.card_2_icon
                      }
                      alt={
                        widgetData?.data?.[0]?.alt
                          ? widgetData?.data?.[0]?.alt
                          : null
                      }
                      width={100}
                      height={100}
                    />
                  </div>
                ) : (
                  <ImageLoader />
                )}
                {/* <Image src={item?.card_1_icon} className="img-fluid" width={152} height={85}></Image> */}
                <h2
                  dir="auto"
                  id="resizing-h3"
                  className="banner-main-heading my-2"
                >
                  {item?.card_1_head}
                  <span className="sehat-scanHeadd "> </span>
                </h2>

                {/* <p className="labtest-scanHeading text-uppercase mb-5">
                  {!isMobile ? <span> {item?.card_1_desc} </span> : <span className='mobile_limited_time'> LIMITED TIME OFFER </span>}
                </p> */}
              </div>
            ))}

          </Slider>
        </div>
        <div className="start_scan_mob_button">
          {/* isMobile ka code rkhna hai idhr */}
        </div>
      </Col>
      <Col md={6} xs={5} className="hk_pricig_ text-right ">
        {widgetData?.data?.[0]?.card_1_icon
          ? (
            // <div className='image_banner_labs'>
            <Image
              crossorigin="anonymous"
              src={widgetData?.data?.[0]?.card_1_icon
              }
              alt={
                widgetData?.data?.[0]?.alt
                  ? widgetData?.data?.[0]?.alt
                  : null
              }
              width={322}
              height={397}
              className="img-fluid mt-0 banner-Img-LabTest"
            />
            // </div>
          ) : (
            <ImageLoader />
          )}
      </Col>
    </Row>
  )
}

export default TwoImagesBanner