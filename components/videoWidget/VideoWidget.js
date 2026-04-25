import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactPlayer from "react-player/youtube";
import SectionHeading from "../SectionHeading/SectionHeading";
import TopicHeading from "../TopicHeading/TopicHeading";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

// import './videoWidget.css';

const VideoWidget = (props) => {
  const { widgetData = {}, key } = props;
  const router = useRouter();
  let sehatScanPageURL = router.pathname;

  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);

  useEffect(() => {
    setVideoUrl(widgetData?.data?.[0]?.source);
  }, []);

  function handleVideoChange(event, language, source) {
    setShowVideo(false);
    setVideoUrl(source);
    let languageTags = document.querySelectorAll(".language-tags");
    languageTags.forEach((tag) => {
      if (tag.isSameNode(event.target)) {
        tag.classList.add("language-active");
      } else {
        if (tag.classList.contains("language-active")) {
          tag.classList.remove("language-active");
        }
      }
    });
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);
  return (
    <div
      key={key}
      className="videoWidget dynamic-widget"
      data-reference_widget_id={widgetData?.id}
      data-widget_id={widgetData?.widget_id}
    >
      {sehatScanPageURL === "/page/sehat-scan" ||
      sehatScanPageURL === "/page/video-listings" ? (
        <Container className="border borderRadius">
          <Row>
            <Col md={12}>
              <div className="hk_sehat_scan_media">
                <SectionHeading
                  heading={<SectionHeadingMed text={widgetData?.heading} />}
                />

                <ReactPlayer url={videoUrl} controls={true} />

                {/* <ReactPlayer url={widgetData?.data?.} controls={true} /> */}
                <TopicHeading text={i18nData?.select_by_language} />

                {widgetData?.data?.map((item, index) => {
                  // setVideoUrl(item?.data[0].source);
                  return (
                    <div className="container">
                      <div className="container d-flex  mt-2 mb-2">
                        <p
                          className={
                            "language-tags " +
                            (index === 0 ? "language-active" : "")
                          }
                          onClick={(event) =>
                            handleVideoChange(event, item.language, item.source)
                          }
                        >
                          {" "}
                          {item.language}{" "}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="video-area-article">
          {widgetData?.data?.map((item, index) => {
            if (index === 0) {
              return (
                <div className="video-player-box">
                  {showVideo && (
                    <ReactPlayer
                      url={item?.data[0]?.source}
                      controls={true}
                      width="100%"
                    />
                  )}

                  {videoUrl && (
                    <ReactPlayer url={videoUrl} controls={true} width="100%" />
                  )}
                </div>
              );
            }
          })}

          <div className="row px-md-4">
            <Col lg={12} md={12}>
              <div className="container d-inline-block mt-2 mb-2">
                <h5 className="selectLanguage">
                  {i18nData?.select_by_language}
                </h5>
                <div className="d-flex overflow-auto hk_full_width_video">
                  {widgetData.data?.length > 0 &&
                    widgetData.data?.map((item, indexgit) => (
                      <div className="language-boxes ">
                        <button
                          className={
                            "language-tags " +
                            (indexgit === 0 ? "language-active" : "")
                          }
                          onClick={(event) =>
                            handleVideoChange(
                              event,
                              item?.language,
                              item?.source
                            )
                          }
                        >
                          {item?.language}{" "}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </Col>
          </div>
        </Container>
      )}
    </div>
  );
};

export default React.memo(VideoWidget);
