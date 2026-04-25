import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactPlayer from "react-player/youtube";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { SectionHeadingMed } from "@/components/SectionHeadingMed";
import { SectionHeading } from "@/components/SectionHeading";
import { TopicHeading } from "@/components/TopicHeading";
import parse from 'react-html-parser';
import styles from './videowaqfa.module.scss';
import AncherUnderUpdated from "@/components/ancherUnderUpdated/AncherUnderUpdated";
import Image from "next/image";
import BannerImg from '/public/png/new-images/banner_getz.png';
import core_ad from "/public/png/core_ad.png";
import core_ad1 from "/public/png/core_ad1.png";
import core_ad2 from "/public/png/core_ad2.png";
import core_ad3 from "/public/png/core_ad3.png";
// import './videoWidget.css';

const VideoWidget = (props) => {
    const { widgetData = {}, key } = props;
    const router = useRouter();
    let sehatScanPageURL = router.pathname;


    const [imageCollection, setImageCollection] = useState([
        {
            image: core_ad,
            link: "https://getzpharma.com/product/core24/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat",
        },
        {
            image: core_ad1,
            link: "https://getzpharma.com/product/livity/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat",
        },
        {
            image: core_ad2,
            link: "https://getzpharma.com/product/agnar/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat",
        },
        {
            image: core_ad3,
            link: "https://getzpharma.com/product/olcuf/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat",
        },
    ]);

    const [showVideo, setShowVideo] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [i18nData, setI18nData] = useState(null);
    const [imageIndexToShow, setImageIndexToShow] = useState(null);
    let i18nDataTwo = useSelector((state) => state.translation.i18n);

    useEffect(() => {
        setImageIndexToShow(Math.floor(Math.random() * imageCollection.length));
    }, []);


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
                                <TopicHeading text={i18nData?.select_by_language} />
                                {widgetData?.data?.map((item, index) => {
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
                <Container className={styles.wrape_all}>
                    <div className={styles.top_head}>
                        <h2> Video </h2>
                    </div>
                    {widgetData?.data?.map((item, index) => {
                        if (index === 0) {
                            return (
                                <Row>
                                    <Col lg={9}>
                                        <div className={styles.wrape_video_Rea}>
                                            <div className="wrape_video_Rea">
                                                {showVideo && (
                                                    <ReactPlayer
                                                        url={item?.data[0]?.source}
                                                        controls={true}
                                                        width="100%"
                                                        className={"wrape_video_Rea_raa"}
                                                    />
                                                )}
                                                {videoUrl && (
                                                    <ReactPlayer url={videoUrl} controls={true} width="100%" className="wrape_video_Rea_raa" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="">
                                            {/* <TopicHeading text="Select By Language" /> */}
                                            <h5 className="selectLanguagewaqfa">
                                                {i18nData?.select_by_language}
                                            </h5>
                                            <div className="d-flex">
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
                                        <h4 className={styles.headPos}> {widgetData?.heading} </h4>
                                        <p className={styles.descPos}>  {widgetData?.description && parse(widgetData?.description)} </p>
                                    </Col>
                                    <Col lg={3} className={styles.col_mob_waqfa}>
                                        <a
                                            href={imageCollection[imageIndexToShow]?.link}
                                            target="blank"
                                        >
                                            <Image
                                                src={imageCollection[imageIndexToShow]?.image}
                                                className="img-fluid w-100"
                                                alt="advertisements"
                                            />
                                        </a>
                                    </Col>
                                </Row>
                            );
                        }
                    })}
                </Container>
            )
            }
        </div >
    );
};

export default React.memo(VideoWidget);
