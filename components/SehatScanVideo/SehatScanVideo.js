import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import ReactPlayer from "react-player/youtube";
import { SectionHeadingMed } from "../SectionHeadingMed";
import { useSelector } from "react-redux";
import ImageLoader from "../ImageLoader";

const SehatScanVideo = (props) => {
  const { widgetData = [], key } = props;
  const [data, setData] = useState([]);
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

  useEffect(() => {
    setData(widgetData?.data);
  }, [widgetData]);

  return (
    <section
      className="sehat_scan_media my-5"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <StyledSehatVideos>
        <Container>
          <Row>
            <Col md={12}>
              <div className="d-flex forBorder-wellness justify-content-between _video_widget">
                <SectionHeadingMed
                  className={`${widgetData?.heading ? "bor-bottom" : ""}`}
                  text={widgetData?.heading}
                />
              </div>
            </Col>

            {widgetData?.data?.length > 0
              ? widgetData?.data?.map((item) => {
                  return (
                    <>
                      <Col md={4} className="ss">
                        <div className="video-box-heading">
                          <Col xl={7} className="m-auto">
                            <h4>{item?.heading}</h4>
                            <p>{item?.media_description}</p>
                          </Col>
                        </div>
                        <div className="scan-video-boxes">
                          {item?.file_url ? (
                            <ReactPlayer
                              url={item?.file_url}
                              width="100%"
                              height="205px"
                            />
                          ) : (
                            <ImageLoader />
                          )}
                        </div>
                      </Col>
                    </>
                  );
                })
              : null}

            {/* <Col md={4} >
                            <div className='video-box-heading' >
                                <Col md={6} className='m-auto' >
                               <h4>How to install and scan</h4>

                               </Col>
                            </div>
                            <div className='scan-video-boxes'>
                    <ReactPlayer url="https://www.youtube.com/watch?v=ruzD7t-ngc8&ab_channel=AsfarHussain-Topic" width="100%" height="205px" />

                            </div>
                    </Col>
                   <Col md={4} >
                            <div className='video-box-heading' >
                               <Col md={6} className='m-auto' >
                               <h4>Health history for  the entire family</h4>
                               </Col>
                            </div>
                            <div className='scan-video-boxes'>
                    <ReactPlayer url="https://www.youtube.com/watch?v=ruzD7t-ngc8&ab_channel=AsfarHussain-Topic" width="100%" height="205px" />

                            </div>
                    </Col> */}
          </Row>
        </Container>
      </StyledSehatVideos>
    </section>
  );
};

export const StyledSehatVideos = styled.section`
  .video-box-heading {
    /* text-align: center;
    width: 82%; */
    font-family: "Nunito";
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 120%;
    text-align: center;
    letter-spacing: 0.01em;
  }
  .video-box-heading h4 {
    font-size: 32px;
    line-height: 38px;
    font-weight: 500;
    color: #0F345A;
  }
  .scan-video-boxes {
    padding-top: 34px;
  }
`;

export default SehatScanVideo;
