import Link from "next/link";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
const arrowUp = "/svg/arrow-up-white.svg";
import { getDiseases } from "@/pages/api/topicAPI";
// import './topicFilter.css';
// import i18n from '../../i18n';
import instBanner from "../../public/png/instant-banner.png";
import core_ad from "../../public/png/core_ad.png";
import core_ad1 from "../../public/png/core_ad1.png";
import core_ad2 from "../../public/png/agnar.png";
import core_ad3 from "../../public/png/core_ad3.png";
import core_ad4 from "../../public/jpg/core_ad4.jpg";
import core_ad5 from "../../public/png/banner_nutrition.png";
import core_ad6 from "../../public/png/banner6.png";
import core_ad7 from "../../public/png/nexum.png";
import core_ad8 from "../../public/jpg/core_ad8.jpg";
import drkaleem from "../../public/svg/doctor-kaleem.svg";
import appStore from "../../public/png/apple123.png";
import playStore from "../../public/png/AppStoreCS.png";
import loaderGif from "../../public/gif/loader_gif.gif";
import Image from "next/image";
import HeaderSearch from "../headerSearch/HeaderSearch";
import { FiChevronRight } from "react-icons/fi";
import { TopicHeading } from "../TopicHeading";
import { Status } from "../status";
import iconRight from "../../public/svg/right-arrow-border.svg";
import { useSelector } from "react-redux";
import API from "../../utils/httpService";
import {
  check_online_doctor,
  sehatAToZPageFromServer,
  sehatAToZPageUrduFromServer,
} from "../../utils/endpoints";
import DiscoverWellnessTopicsWidgetCustomRefCard from "../discoverWellnessTopicsWidgetCustomRefCard/DiscoverWellnessTopicsWidgetCustomRefCard";
import HealthTopReads from "../healthTopReads/HealthTopReads";
import { SimpleSlider } from "@/components/sliders/simpleSlider";
import { ProfileCard } from "@/components/ProfileCard";
import Cookies from "js-cookie";
import Loader from "../../public/gif/asset_loader.gif";
import { useRouter } from "next/router";
import ImageLoader from "../ImageLoader";

function TopicsFilter() {
  // const [diseasesListing, setDiseases] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [i18nData, setI18nData] = useState(null);
  let i18nDataTwo = useSelector((state) => state.translation.i18n);
  const [onlineDoctorImages, setOnlineDoctorImages] = useState([]);
  const [onlineDoctorsCount, setOnlineDoctorsCount] = useState(0);
  const [instantFee, setInstantFee] = useState();
  const [nextArticleLists, setNextArticleLists] = useState(null);
  const [topicsFilterData, setTopicsFilterData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [diseasesListing, setDiseasesListing] = useState(null);
  const [highlightedLetter, setHighlightedLetter] = useState(null);
  const router = useRouter();


  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const sections = document.querySelectorAll('.filterContent');
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          const letter = section.id.charAt(0);
          setHighlightedLetter(letter);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setI18nData(i18nDataTwo);
    }
  }, [i18nDataTwo]);

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
    {
      image: core_ad4,
      link: "https://getzpharma.com/product/risek/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat",
    },
    {
      image: core_ad5,
      link: "https://getzpharma.com/product/core24/?c=Pakistan",
    },
    {
      image: core_ad6,
      link: "https://getzpharma.com/product/core-c/?c=Pakistan",
    },
    {
      image: core_ad7,
      link: "https://getzpharma.com/product/nexum/?c=pakistan",
    },
    {
      image: core_ad8,
      link: "https://getzpharma.com/product/osam-d/",
    },
  ]);

  const [imageIndexToShow, setImageIndexToShow] = useState(null);

  useEffect(() => {
    setImageIndexToShow(Math.floor(Math.random() * imageCollection.length));
  }, []);

  const fetchDiseases = async (qs = "") => {
    try {
      setLoading(true);
      const res = await getDiseases(qs);
      if (res.code === 200) {
        setDiseasesListing(res.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching diseases:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiseases();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length >= 3 || search.length === 0) {
        fetchDiseases(search);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const [keyForTabs, setKeyForTabs] = useState("sehat");

  const ForTop = useRef(null);

  // _____________API WORK____________________

  const letters = diseasesListing?.disease?.headings || [];
  const listing = { ...diseasesListing?.disease };

  const findAlphabetKey = useCallback(
    (alphabet) => {
      let singleList = listing[alphabet];
      return singleList.length > 0 ? singleList : [];
    },
    [diseasesListing]
  );

  const scrollClick = () => {
    ForTop.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    API.get(check_online_doctor).then((response) => {
      if (response?.code === 200) {
        setOnlineDoctorImages(response?.data?.doctor_images);
        setOnlineDoctorsCount(response?.data?.online_doctors);
        setInstantFee(response?.data);
      } else {
        setInstantFee(response?.data);
        setOnlineDoctorsCount(response?.data?.online_doctors);
      }
    });
  }, []);

  useEffect(() => {
    setLoader(true);
    const headers = {
      Locale:
        i18nData && i18nData?.langDetectForNonServerComponents === "en" ? 1 : 2,
    };

    API.get(`${sehatAToZPageFromServer}`, { headers }).then((response) => {
      if (
        response?.code === 200 &&
        i18nData?.langDetectForNonServerComponents
      ) {
        setTopicsFilterData(response?.data);
        setNextArticleLists(response?.data?.related);
        setLoader(false);
      }
    });
  }, [i18nData?.langDetectForNonServerComponents]);


  const featuredArticleData = topicsFilterData?.widgets?.[3]?.data?.[0]?.data;
  const trackYourHealth = topicsFilterData?.widgets?.[2]?.data?.[0];
  const randomArticle = topicsFilterData?.widgets?.[4]?.data?.[0]?.data;
  const doctorDomain = process.env.NEXT_PUBLIC_DOCTOR_URL;

  function consultNowHandler() {
    const Authorization = Cookies.get("Authorization");
    if (!Authorization) {
      window.location.href = "/confirm-mobile-number";
    } else {
      (async () => {
        setLoading(true);
        const response = await API.get(`/user`);
        setLoading(false);
        const userData =
          response?.data?.user?.subscription !== null &&
          JSON.parse(response?.data?.user?.subscription?.receipt_data);
        // setUserDetails(userData);
        let varForVideoCount =
          parseInt(userData?.free_video_consults) -
          parseInt(userData?.consume_free_video_consults);
        if (
          response?.data?.user?.subscription === null &&
          response?.data?.user?.trial_consultation === 0
        ) {
          if (response?.data?.user?.transaction_count > 0) {
            window.location.href = "/subscribed-user";
          } else {
            window.location.href = "/buy-subscription-package";
          }
        } else if (
          response?.data?.user?.subscription === true &&
          varForVideoCount <= 0 &&
          response?.data?.user?.transaction_count === 0
        ) {
          window.location.href = "/subscribed-user";
        } else if (
          response?.data?.user?.subscription === null &&
          response?.data?.user?.transaction_count > 0
        ) {
          window.location.href = "/subscribed-user";
        } else if (response?.data?.user?.trial_consultation === 1) {
          window.location.href = "/first-video-consultation";
        } else {
          window.location.href = "/subscribed-user";
        }
      })();
    }
  }
  const handleLetterClick = (letter) => {
    setHighlightedLetter(letter);
  };
  return (
    <section
      id="topicFilter"
      className="topicFilter changeNewTopicFilter"
      ref={ForTop}
    >
      <Container>
        <div className="tabContainer">
          {/* <SlideSearchIcon
            onSearch={(e) => setSearch(e.target.value)}
            icon={searchIcon}
          /> */}
          {loading ? (
            <div className="disease_loader d-flex justify-content-center">
              {/* <DotLoader /> */}
              <Image
                className="loading_gif m-auto"
                src={loaderGif}
                alt="loader"
              />
            </div>
          ) : (
            <Row>
              <Col md={9}>
                <HeaderSearch
                  searchValue={search}
                  onSearch={(e) => setSearch(e.target.value)}
                  reset={() => setSearch("")}
                />

                <>
                  <Tabs
                    id="controlled-tab-speciality"
                    activeKey={keyForTabs}
                    transition
                    onSelect={(k) => setKeyForTabs(k)}
                    className="mb-3 customTabs"
                  >
                    {/*  */}
                    <Tab eventKey="sehat" title={i18nData?.SehatAto_Z}>
                      <Row className="me-md-0">
                        <Col lg={1} md={1} xs={2}>
                          <div className="filter_btns">
                            {letters.map((item, index) => (

                              <a
                                type="button"
                                className={`filter_btn ${item?.toLowerCase() == highlightedLetter ? "forHighlight topSpacing" : ""}`}
                                href={`#${item?.toLowerCase()}`}
                                key={index}
                                onClick={() => handleLetterClick(item)}
                              >
                                {item}
                              </a>
                            ))}
                          </div>
                        </Col>
                        <Col lg={11} md={11} xs={10} className="bg-change-new">
                          {letters?.map((item, index) => {
                            return (
                              <div
                                data-aos="fade-up"
                                data-aos-duration="800"
                                id={item.toLowerCase()}
                                className={`filterContent mt-0 ${index === 17 || index === 13 || index === 9 || index === 5 || index === 1 ? "for_alergies_border_remove" : ""}`}
                                key={index}
                              >
                                {index === 2 ? (
                                  <>
                                    {loader ? (
                                      <div className="d-block text-center">
                                        <Image
                                          src={Loader}
                                          width={80}
                                          height={80}
                                          alt="Loader"
                                        />
                                      </div>
                                    ) : (
                                      <>
                                        <div className="for_bg_color_topic_filter_banner pink">
                                          <DiscoverWellnessTopicsWidgetCustomRefCard
                                            widgetData={
                                              topicsFilterData?.widgets?.[5]
                                            }
                                          />
                                        </div>
                                      </>
                                    )}
                                  </>
                                ) : null}
                                {index === 6 ? (
                                  <>
                                    {loader ? (
                                      <>
                                        <div className="d-block text-center">
                                          <Image
                                            src={Loader}
                                            width={80}
                                            height={80}
                                            alt="Loader"
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="for_bg_color_topic_filter_banner yellow">
                                          <DiscoverWellnessTopicsWidgetCustomRefCard
                                            widgetData={
                                              topicsFilterData?.widgets?.[6]
                                            }
                                          />
                                        </div>
                                      </>
                                    )}
                                  </>
                                ) : null}
                                {index === 10 ? (
                                  <>
                                    {loader ? (
                                      <>
                                        <div className="d-block text-center">
                                          <Image
                                            src={Loader}
                                            width={80}
                                            height={80}
                                            alt="Loader"
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <HealthTopReads
                                          widgetData={
                                            topicsFilterData?.widgets?.[7]
                                          }
                                        />
                                      </>
                                    )}
                                  </>
                                ) : null}
                                {index === 14 ? (
                                  <>
                                    {loader ? (
                                      <>
                                        <div className="d-block text-center">
                                          <Image
                                            src={Loader}
                                            width={80}
                                            height={80}
                                            alt="Loader"
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <section className="_overflow-hidden doctor dynamic-widget doctorNewSection">
                                          <SimpleSlider
                                            sliderBoxWidth={true}
                                            adaptiveHeight={true}
                                            buttonRedirect={
                                              topicsFilterData?.widgets?.[9]
                                                ?.redirect_url
                                            }
                                            buttonText={
                                              topicsFilterData?.widgets?.[9]
                                                ?.button_text
                                            }
                                            className="profileSlider"
                                            sliderTitle={`${topicsFilterData?.widgets?.[9]
                                              ?.heading || ""
                                              }`}
                                            sliderDesc={
                                              topicsFilterData?.widgets?.[9]
                                                ?.description || ""
                                            }
                                          >
                                            {topicsFilterData?.widgets?.[9]?.data?.map(
                                              (card, index) => (
                                                <ProfileCard
                                                  card={card}
                                                  key={index + 1}
                                                />
                                              )
                                            )}
                                          </SimpleSlider>
                                        </section>
                                      </>
                                    )}
                                  </>
                                ) : null}
                                {index === 18 ? (
                                  <>
                                    {loader ? (
                                      <>
                                        <div className="d-block text-center">
                                          <Image
                                            src={Loader}
                                            width={80}
                                            height={80}
                                            alt="Loader"
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="for_bg_color_topic_filter_banner blue">
                                          <DiscoverWellnessTopicsWidgetCustomRefCard
                                            widgetData={
                                              topicsFilterData?.widgets?.[8]
                                            }
                                          />
                                        </div>
                                      </>
                                    )}
                                  </>
                                ) : null}
                                {/* <h2 dir="auto" className="filterLetter">
                                  {item}
                                </h2> */}
                                <h2
                                  dir="auto"
                                  className={`filterLetter ${item?.toLowerCase() == highlightedLetter ? "forHighlight topSpacing" : ""}`}
                                >
                                  {item}
                                </h2>
                                <ul className="filterList">
                                  {findAlphabetKey(item)?.map((list, index) => {
                                    return (
                                      <li key={index}>
                                        <Link
                                          dir="auto"
                                          href={list?.redirect_url}
                                        >
                                          {list?.name}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            );
                          })}
                          {loading ? <p>Loading...</p> : null}
                          {diseasesListing && diseasesListing ? (
                            <>
                              <div className="top_alphabet">
                                {/* <h3>{diseasesListing?.name?.charAt(0)}</h3> */}
                              </div>
                              <div
                                id={diseasesListing?.id}
                                className="filterContent"
                                key={diseasesListing?.id}
                              >
                                <h3>{diseasesListing?.name?.charAt(0)}</h3>
                                <h2 dir="auto" className="filterLetter">
                                  <Link
                                    href={diseasesListing?.redirect_url || ""}
                                  >
                                    {diseasesListing?.name}
                                  </Link>
                                </h2>
                                {/* <ul className="filterList">
                                  {findAlphabetKey(item)?.map((list, index) => {
                                    return (
                                      <li dir="auto" key={index}>
                                        <Link to={list?.redirect_url}>
                                          {list?.name}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul> */}
                              </div>
                            </>
                          ) : (
                            <p>No data available</p>
                          )}
                          <button
                            type="button"
                            className="simple_btn"
                            onClick={scrollClick}
                          >
                            <svg
                              className="me-3"
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="13"
                              viewBox="0 0 10 13"
                              fill="none"
                            >
                              <path
                                d="M4.51394 0.932669L0.945337 4.51874C0.820899 4.64852 0.752357 4.82194 0.75444 5.00173C0.756523 5.18151 0.82907 5.3533 0.956481 5.48016C1.08389 5.60702 1.25599 5.67882 1.43579 5.68012C1.61558 5.68142 1.78871 5.61212 1.91794 5.48712L4.31388 3.07672L4.31388 11.5812C4.31388 11.7633 4.38619 11.9378 4.51491 12.0665C4.64363 12.1953 4.8182 12.2676 5.00024 12.2676C5.18227 12.2676 5.35685 12.1953 5.48557 12.0665C5.61429 11.9378 5.6866 11.7633 5.6866 11.5812L5.6866 3.07973L8.08254 5.49013C8.21177 5.61513 8.38489 5.68443 8.56468 5.68313C8.74448 5.68183 8.91658 5.61003 9.04399 5.48317C9.1714 5.35631 9.24395 5.18453 9.24603 5.00474C9.24811 4.82496 9.17957 4.65153 9.05513 4.52176L5.48654 0.935682C5.42293 0.871531 5.34729 0.820557 5.26395 0.78568C5.18061 0.750802 5.0912 0.732705 5.00086 0.732426C4.91052 0.732145 4.82101 0.749687 4.73745 0.784048C4.6539 0.818409 4.57795 0.868913 4.51394 0.932669Z"
                                fill="white"
                              />
                            </svg>
                            {/* {i18n.t('back_to_top')} */}
                            {i18nData?.back_to_top}
                          </button>
                        </Col>
                      </Row>
                    </Tab>
                    <Tab
                      eventKey="drugs"
                      title={i18nData?.drug_a_to_z}
                      style={{ display: "none" }}
                    >
                      <Row className="me-md-0">
                        <Col lg={1} md={1}>
                          <div className="filter_btns">
                            {letters.map((item, index) => (
                              <a
                                type="button"
                                className="filter_btn"
                                href={`#${item?.toLowerCase()}`}
                                key={index}
                              >
                                {item}
                              </a>
                            ))}
                          </div>
                        </Col>
                        <Col lg={11} md={11} className="bg-change-new">
                          {letters?.map((item, index) => {
                            return (
                              <div
                                id={item.toLowerCase()}
                                className="filterContent mt-0"
                                key={index}
                              >
                                {index === 2 ? (
                                  <>
                                    <DiscoverWellnessTopicsWidgetCustomRefCard
                                      widgetData={
                                        topicsFilterData?.widgets?.[5]
                                      }
                                    />
                                  </>
                                ) : null}
                                {index === 6 ? (
                                  <>
                                    <DiscoverWellnessTopicsWidgetCustomRefCard
                                      widgetData={
                                        topicsFilterData?.widgets?.[6]
                                      }
                                    />
                                  </>
                                ) : null}
                                {index === 10 ? (
                                  <>
                                    <HealthTopReads
                                      widgetData={
                                        topicsFilterData?.widgets?.[7]
                                      }
                                    />
                                  </>
                                ) : null}
                                {index === 14 ? (
                                  <section className="_overflow-hidden doctor dynamic-widget doctorNewSection">
                                    <SimpleSlider
                                      sliderBoxWidth={true}
                                      adaptiveHeight={true}
                                      buttonRedirect={
                                        topicsFilterData?.widgets?.[9]
                                          ?.redirect_url
                                      }
                                      buttonText={
                                        topicsFilterData?.widgets?.[9]
                                          ?.button_text
                                      }
                                      className="profileSlider"
                                      sliderTitle={`${topicsFilterData?.widgets?.[9]
                                        ?.heading || ""
                                        }`}
                                      sliderDesc={
                                        topicsFilterData?.widgets?.[9]
                                          ?.description || ""
                                      }
                                    >
                                      {topicsFilterData?.widgets?.[9]?.data?.map(
                                        (card, index) => (
                                          <ProfileCard
                                            card={card}
                                            key={index + 1}
                                          />
                                        )
                                      )}
                                    </SimpleSlider>
                                  </section>
                                ) : null}
                                {index === 18 ? (
                                  <>
                                    <DiscoverWellnessTopicsWidgetCustomRefCard
                                      widgetData={
                                        topicsFilterData?.widgets?.[8]
                                      }
                                    />
                                  </>
                                ) : null}
                                <h2 dir="auto" className="filterLetter">
                                  {item}
                                </h2>
                                <ul className="filterList">
                                  {findAlphabetKey(item)?.map((list, index) => {
                                    return (
                                      <li key={index}>
                                        <Link
                                          dir="auto"
                                          href={list?.redirect_url}
                                        >
                                          {list?.name}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            );
                          })}

                          <button
                            type="button"
                            className="simple_btn"
                            onClick={scrollClick}
                          >
                            <svg
                              className="me-3"
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="13"
                              viewBox="0 0 10 13"
                              fill="none"
                            >
                              <path
                                d="M4.51394 0.932669L0.945337 4.51874C0.820899 4.64852 0.752357 4.82194 0.75444 5.00173C0.756523 5.18151 0.82907 5.3533 0.956481 5.48016C1.08389 5.60702 1.25599 5.67882 1.43579 5.68012C1.61558 5.68142 1.78871 5.61212 1.91794 5.48712L4.31388 3.07672L4.31388 11.5812C4.31388 11.7633 4.38619 11.9378 4.51491 12.0665C4.64363 12.1953 4.8182 12.2676 5.00024 12.2676C5.18227 12.2676 5.35685 12.1953 5.48557 12.0665C5.61429 11.9378 5.6866 11.7633 5.6866 11.5812L5.6866 3.07973L8.08254 5.49013C8.21177 5.61513 8.38489 5.68443 8.56468 5.68313C8.74448 5.68183 8.91658 5.61003 9.04399 5.48317C9.1714 5.35631 9.24395 5.18453 9.24603 5.00474C9.24811 4.82496 9.17957 4.65153 9.05513 4.52176L5.48654 0.935682C5.42293 0.871531 5.34729 0.820557 5.26395 0.78568C5.18061 0.750802 5.0912 0.732705 5.00086 0.732426C4.91052 0.732145 4.82101 0.749687 4.73745 0.784048C4.6539 0.818409 4.57795 0.868913 4.51394 0.932669Z"
                                fill="white"
                              />
                            </svg>
                            {i18nData?.back_to_top}
                          </button>
                        </Col>
                      </Row>
                    </Tab>
                  </Tabs>
                </>
              </Col>
              <Col md={3} className="d-none d-md-block">
                {loader ? (
                  <div className="text-center d-block">
                    <Image src={Loader} width={120} height={120} alt="Loader" />
                  </div>
                ) : (
                  <>
                    <div
                      data-aos="fade-up"
                      data-aos-duration="800"
                      className="banner_content_container instantBanner topicFilterAddsBanner"
                    >
                      <div className="banner_text">
                        <h2
                          dir="auto"
                          className="banner_title startVideoCallHead"
                        >
                          {i18nData?.start_a_video_call}
                        </h2>

                        <p className="mt-4 addParaSide">
                          {i18nData?.connect_instant}
                        </p>

                        {onlineDoctorsCount?.length <= 0 ? (
                          <>
                            <button className="m-auto review-button add-review-btn text-uppercase max-width-300 fw-700 mt-3 mb-3 position-relative simple-btn-mobile instantBannerNewBtn">
                              <span className="cons_now">
                                {i18nData?.doctor_curr_off}{" "}
                              </span>
                              <span
                                className="add-review-chevron position-absolute"
                                style={{
                                  height: "43px",
                                  left: "auto",
                                  right: "0",
                                }}
                              >
                                <FiChevronRight />
                              </span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={consultNowHandler}
                              className="m-auto review-button add-review-btn text-uppercase max-width-300 fw-700 mt-3 mb-3 position-relative simple-btn-mobile instantBannerNewBtn"
                            >
                              <span className="cons_now">
                                {i18nData?.consult_now}
                              </span>
                              <span
                                className="add-review-chevron position-absolute"
                                style={{
                                  height: "43px",
                                  left: "auto",
                                  right: "0",
                                }}
                              >
                                <FiChevronRight />
                              </span>
                            </button>
                          </>
                        )}

                        <div className="my-2 new-width">
                          <p className="onlypkrconsultaion">
                            {i18nData?.only}{" "}
                            {instantFee?.instant_consultation_fees}{" "}
                            {i18nData?.pkr} {i18nData?.per_consultation}
                          </p>
                          <button className="popOverBtn">
                            <div className="status articleLabel mb-0 ms-2 greenBtnOffer">
                              <p className="fs-10 fw-400 text-uppercase">
                                {i18nData?.limited_offer}
                              </p>
                            </div>
                          </button>{" "}
                        </div>
                      </div>
                      <div className="my-4">
                        <div>
                          {/* {onlineDoctorImages?.length > 0 && */}
                          {/* onlineDoctorImages?.map((item) => ( */}
                          {onlineDoctorImages?.length > 0 &&
                            onlineDoctorImages?.map((item) => (
                              <Image
                                crossorigin="anonymous"
                                width={40}
                                height={40}
                                src={item?.image_url}
                                alt=""
                                className="img-fluid rounded-circle default-avatar member-overlap-item"
                              />
                            ))}

                          {/* ))} */}
                        </div>
                        <div className="mt-2 doc_online-status">
                          {/* {onlineDoctorsCount === 0 ? ( */}
                          <></>
                          {/* ) : ( */}
                          <>
                            {/* {onlineDoctorsCount ? ( */}
                            <p>
                              <strong>
                                {/* {onlineDoctorsCount}{" "} */}
                                {/* {onlineDoctorsCount <= 1 ? "doctor" : "doctors"}{" "} */}
                                {onlineDoctorsCount === 0 ? (
                                  <>{/* element */}</>
                                ) : (
                                  <>
                                    {onlineDoctorsCount ? (
                                      <p>
                                        <strong>
                                          {onlineDoctorsCount}{" "}
                                          {onlineDoctorsCount <= 1
                                            ? "doctor"
                                            : "doctors"}{" "}
                                          currently online
                                        </strong>
                                        <span className={`circleGreen`}></span>
                                      </p>
                                    ) : null}
                                  </>
                                )}
                              </strong>
                            </p>
                            {/* ) : null} */}
                          </>
                          {/* )} */}
                        </div>
                      </div>
                      <Image
                        className="img-fluid imgBottomfix"
                        src={instBanner}
                        alt="insta banner"
                      />
                    </div>
                    <div
                      className="articles-add-sidebar"
                      data-aos="fade-up"
                      data-aos-duration="800"
                    >
                      <h4
                        dir="auto"
                        class="text-initial fontSizeMobile fw-600 border-bottom-0 pb-2"
                      >
                        {topicsFilterData?.widgets?.length > 0 &&
                          topicsFilterData?.widgets?.[3]?.heading}
                      </h4>
                      <div className="card articleWithShortDesc cardWithHeaderImage featuredArticleCard">
                        <div className="header_img img_box height_pro">
                          <Image
                            crossorigin="anonymous"
                            src={featuredArticleData?.image}
                            alt="cardImage"
                            width={758}
                            height={340}
                          />
                        </div>
                        <div className="card_body">
                          <TopicHeading text={featuredArticleData?.name} />
                          {/* <HeadingDescSmall
                        text={featuredArticleData?.descripton}
                      /> */}
                          <p>{featuredArticleData?.descripton}</p>
                          <div class="btn_icon_box mt-4">
                            <div>
                              <Image
                                src={iconRight}
                                width={30}
                                height={30}
                                alt="arrow-with-border"
                                class="arrow_right_border me-2"
                              />
                            </div>
                            <div>
                              <Link
                                className="underline_ancer"
                                href={featuredArticleData?.redirect_url || ""}
                              >
                                {i18nData?.read_more}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tract-health-sidebar"
                      data-aos="fade-up"
                      data-aos-duration="800"
                    >
                      <section className="doctors_waiting forAlignmentAds trackyourhealth">
                        <Container>
                          <Row>
                            <Col md={5} className="px-3 mt-3"></Col>
                            <Col md={12} className="sideFiltersAdd text-start">
                              <h2 className="text-initial fw-600 border-bottom-0 mt-0 text-center">
                                {trackYourHealth?.heading}
                              </h2>
                              {trackYourHealth?.image ?
                                <Image
                                  crossorigin="anonymous"
                                  width={251}
                                  height={248}
                                  src={trackYourHealth?.image}
                                  alt={trackYourHealth?.alt ? trackYourHealth?.alt : null}
                                  className="left_side img-fluid mt-4"
                                />
                                :
                                <ImageLoader />
                              }

                              <ul>
                                <li>
                                  <div className="d-flex align-items-start">
                                    <div className="iconnn">
                                      <Image
                                        crossorigin="anonymous"
                                        width={50}
                                        height={50}
                                        src={trackYourHealth?.card_1_icon}
                                        alt={trackYourHealth?.alt ? trackYourHealth?.alt : null}
                                      />
                                    </div>
                                    <div className="intro_hk">
                                      <h3>{trackYourHealth?.card_1_head}</h3>
                                      <p>{trackYourHealth?.card_1_desc}</p>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="d-flex align-items-start">
                                    <div className="iconnn">
                                      <Image
                                        crossorigin="anonymous"
                                        width={50}
                                        height={50}
                                        src={trackYourHealth?.card_2_icon}
                                        alt={trackYourHealth?.alt ? trackYourHealth?.alt : null}
                                      />
                                    </div>
                                    <div className="intro_hk">
                                      <h3>{trackYourHealth?.card_2_head}</h3>
                                      <p>{trackYourHealth?.card_2_desc}</p>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="d-flex align-items-start">
                                    <div className="iconnn">
                                      <Image
                                        crossorigin="anonymous"
                                        width={50}
                                        height={50}
                                        src={trackYourHealth?.card_3_icon}
                                        alt={trackYourHealth?.alt ? trackYourHealth?.alt : null}
                                      />
                                    </div>
                                    <div className="intro_hk">
                                      <h3>{trackYourHealth?.card_3_head}</h3>
                                      <p>{trackYourHealth?.card_3_desc}</p>
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="d-flex align-items-start">
                                    <div className="iconnn">
                                      <Image
                                        crossorigin="anonymous"
                                        width={50}
                                        height={50}
                                        src={trackYourHealth?.card_4_icon}
                                        alt={trackYourHealth?.alt ? trackYourHealth?.alt : null}
                                      />
                                    </div>
                                    <div className="intro_hk">
                                      <h3>{trackYourHealth?.card_4_head}</h3>
                                      <p>{trackYourHealth?.card_4_desc}</p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <Row className="mb-3 pt-4">
                                <Col md={6}>
                                  <Image
                                    src={playStore}
                                    alt="logo"
                                    className="img-fluid"
                                  />
                                </Col>
                                <Col md={6}>
                                  <a
                                    target="_blank"
                                    href="https://play.google.com/store/apps/details?id=pk.merisehat.app"
                                  >
                                    <Image
                                      src={appStore}
                                      alt="logo"
                                      className="img-fluid"
                                    />
                                  </a>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Container>
                      </section>
                    </div>
                    <div
                      className="top_reads related article min_height pt-0  x"
                      data-aos="fade-up"
                      data-aos-duration="800"
                    >
                      <h4
                        dir="auto"
                        class="text-uppercase fontSizeMobile fw-600 border-bottom pb-2"
                      >
                        {i18nData?.read_this_next}
                      </h4>
                      {nextArticleLists?.length > 0 &&
                        nextArticleLists?.map((item) => {
                          return (
                            <>
                              <Link href={item?.redirect_url}>
                                <div class="p-3 articleItemLists">
                                  <div>
                                    <div class="card_img img_box bordertbRadius">
                                      <Image
                                        crossorigin="anonymous"
                                        src={item?.image}
                                        alt="img"
                                        width={70}
                                        height={70}
                                        className="img-fluid h-auto"
                                      />
                                    </div>
                                    <div class="card_body pt-0">
                                      <div className="align-items-center">
                                        {/* <div class="drName">
                                    <div>
                                      <h6 dir="auto" class="headingWithSpace">{item?.descripton}</h6>
                                    </div>
                                  </div> */}
                                        <Link
                                          href={item?.redirect_url}
                                          class="articleLinkChangeAnchor"
                                        >
                                          {item?.name}
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </>
                          );
                        })}
                    </div>
                    <div
                      className="articles-add-sidebar"
                      data-aos="fade-up"
                      data-aos-duration="800"
                    >
                      <div className="card articleWithShortDesc cardWithHeaderImage">
                        <div className="header_img img_box">
                          <Image
                            crossorigin="anonymous"
                            src={randomArticle?.image}
                            alt="cardImage"
                            width={758}
                            height={340}
                          />
                        </div>
                        <div className="card_body">
                          <Status text={randomArticle?.label?.value} />
                          <TopicHeading text={randomArticle?.name} />
                          <p>{randomArticle?.descripton}</p>
                          <div class="btn_icon_box mt-4">
                            <div>
                              <Image
                                src={iconRight}
                                width={30}
                                height={30}
                                alt="arrow-with-border"
                                class="arrow_right_border me-2"
                              />
                            </div>
                            <div>
                              <Link
                                className="underline_ancer"
                                href={randomArticle?.redirect_url || ""}
                              >
                                {i18nData?.read_more}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="add mt-0"
                      data-aos="fade-up"
                      data-aos-duration="800"
                    >
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
                    </div>
                    <div
                      className="are-you-doctor"
                      data-aos="fade-up"
                      data-aos-duration="800"
                    >
                      <section className="doctors_waiting trackyourhealth">
                        <Container>
                          <Row>
                            <Col md={5} className="px-3 mt-3"></Col>
                            <Col md={12} className="px-3 text-start">
                              <h2 className="text-initial fw-600 border-bottom-0 mt-0 text-center">
                                {i18nData?.are_you_doctor}
                              </h2>
                              <a
                                href={`${doctorDomain}/signup-number`}
                                target="blank"
                                className="m-auto review-button add-review-btn text-uppercase max-width-300 fw-700 mt-3 mb-3 position-relative resgisterBtnn"
                              >
                                <span className="cons_now">
                                  {i18nData?.register}
                                </span>
                              </a>
                              <div className="expandDigital col-md-11 m-auto px-1 py-3 mt-5 mb-3">
                                <p className="text-center">
                                  {i18nData?.practice_digital}
                                </p>
                              </div>
                              <Image
                                crossorigin="anonymous"
                                width={500}
                                height={500}
                                src={drkaleem}
                                alt="brands"
                                className="left_side img-fluid mt-4"
                              />
                            </Col>
                          </Row>
                        </Container>
                      </section>
                    </div>
                    <div></div>
                  </>
                )}
              </Col>
            </Row>
          )}
        </div>
      </Container>
    </section>
  );
}
export default TopicsFilter;
