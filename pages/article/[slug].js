import React, { useState, useRef, useEffect } from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { addTranslation } from "@/store/translationSlice";
import API, { APIV3 } from "@/utils/httpService";
import { getArticalUrl } from "../../utils/endpoints";
import { Col, Container, Row } from "react-bootstrap";
import { HeadingDesc } from "../../components/HeadingDesc";
import { HeadingDescVsmall } from "../../components/headingDescVsmall";
import { SectionHeadingMed } from "../../components/SectionHeadingMed";
import { SectionHeadingLarge } from "../../components/sectionHeadingLarge";
import ReviewBy from "@/components/reviewBy/ReviewBy";
import StatusWithoutBackground from "@/components/statusWithoutBackground/StatusWithoutBackground";
import SocialLinks from "@/components/socialLinks/SocialLinks";
import { ArticleItemLists } from "../../components/articleItemLists";
import arrowIcon from "../../public/svg/arrow-right-blue.svg";
import Status from "@/components/status/Status";
import { slugify } from "@/utils/utilFunctions";
import { imagePath } from "@/utils/utilFunctions";
import { renderWidget } from "@/utils/common";
import Link from "next/link";
import { RelatedArticles } from "../../components/relatedArticles";
import AffixFC from "antd/lib/affix";
import ScrollSpy from "react-ui-scrollspy";
import { FeedBack } from "../../components/feedback";
import core_ad from "../../public/png/core_ad.png";
import core_ad1 from "../../public/png/core_ad1.png";
import core_ad2 from "../../public/png/agnar.png";
import core_ad3 from "../../public/png/core_ad3.png";
import core_ad4 from "../../public/jpg/core_ad4.jpg";
import core_ad5 from "../../public/png/banner_nutrition.png";
import core_ad6 from "../../public/png/banner6.png";
import core_ad7 from "../../public/png/nexum.png";
import core_ad8 from "../../public/jpg/core_ad8.jpg";
import smallAdd1 from "../../public/png/consult_now_disease.png";
import smallAdd2 from "../../public/png/consult_now_disease2.png";
import ScrollContainer from "react-indiana-drag-scroll";
import Image from "next/image";
import { MetaDataCustom } from "@/components/metaDataCustom";
import { getArticals } from "@/utils/powerFunctions";
import LoaderAssets from "../../public/gif/asset_loader.gif";
import swal from 'sweetalert';
import CustomPopOver from "../../components/customPopOver/CustomPopOver";

function DiseasePage(props) {
    const { _nextI18Next } = props;
    const router = useRouter();
    const { slug } = router.query;
    const dispatch = useDispatch();
    const initialLocale = _nextI18Next?.initialLocale;
    const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;
    const [articles, setArticles] = useState(null);
    const [i18nData, setI18nData] = useState(null);
    let i18nDataTwo = useSelector((state) => state.translation.i18n);
    const [top, setTop] = useState(100);
    const [redirectTags, setRedirectTags] = useState([]);
    const [highlightedTab, setHighlightedTab] = useState(null);
    const statusRef = useRef(null);
    const articleRef = useRef(null);
    const reviewCardStick = useRef(null);
    const [mediaSize, setMediaSize] = useState(false);
    const [loadingLast, setLoadingLast] = useState(false);
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
    let videoWidgets;
    const relatedArticle = props?.diseasePageData?.read_this_later || [];

    useEffect(() => {
        if (typeof window !== "undefined") {
            setI18nData(i18nDataTwo);
        }
    }, [i18nDataTwo]);

    useEffect(() => {
        if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
            dispatch(addTranslation(i18n));
        }
    }, [i18n]);

    useEffect(() => {
        setImageIndexToShow(Math.floor(Math.random() * imageCollection.length));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingLast(true);
                const res = await getArticals(slug, router?.locale);
                if (res.status == 200) {
                    setArticles(res.data?.data);
                } else {
                    window.location.href = router?.locale === "ur" ? "/ur" : "/";
                }
            } catch (error) {
                // Handle errors, e.g., log the error
                console.error("Error fetching data:", error);
            } finally {
                setLoadingLast(false);
            }
        };

        fetchData(); // Call the async function to fetch data
    }, [slug]);

    let apiType;

    if (props.apiType) {
        apiType = props.apiType;
    }

    if (articles?.widgets?.length > 0) {
        videoWidgets = articles?.widgets?.filter(
            (article) => article?.key_type === "web-media"
        );
    }


    const doctorProfile = {
        updatedOn: articles?.updated_on || "",
        reviewedBy: articles?.reviewed_by || "",
        writtenUser: articles?.written_by || "",
    };


    useEffect(() => {
        if (articles?.widgets?.length > 0) {
            let temp = [];

            articles?.widgets?.map((item) => {
                temp.push({
                    title: item?.data?.badge_title || "",
                    url: `#${slugify(item?.data?.badge_title || "") + "-" + item?.id}`,
                });
            });

            setRedirectTags(temp);
        }
    }, [articles]);

    useEffect(() => {
        let accordion = document.querySelector(".accordion");
        if (accordion) {
            accordion.id = "accordion";
        }
    }, []);

    useEffect(() => {
        let bulletLinks;
        let sup = document.querySelectorAll("sup");

        if (sup && sup.length > 0) {
            sup.forEach((s) => {
                s.innerHTML = `<a href="#accordion">${s.innerHTML}</a>`;
                let accordion = document.getElementById("accordion");

                s.addEventListener("click", function (e) {
                    const accordion = document.querySelector(".accordion-button");

                    if (accordion) {
                        accordion.click();
                    }

                    if (
                        !accordion.childNodes[0].childNodes[1].classList.contains("show")
                    ) {
                        accordion.childNodes[0].childNodes[1].classList.add("show");
                        // bulletLinks = document.querySelector(".bullet-links");
                        bulletLinks =
                            accordion.childNodes[0].childNodes[1].childNodes[0].childNodes[0];
                        let ul = bulletLinks.querySelector("ul");
                        let li = ul.querySelectorAll("li");

                        li.forEach((link, index) => {
                            if (link.children[1].href === sup[index].dataset.url) {
                                link.scrollIntoView({ behavior: "smooth" });
                            }
                        });
                    }
                });
            });
        }

        articles?.widgets?.map((article) => {
            if (article.key_type === "web-reference") {
                if (sup && sup.length > 0) {
                    sup.forEach((s, index) => {
                        // s.innerHTML = `<a href=${article.data[index].url}>${s.innerHTML}</a>`;
                        // s.setAttribute("data", `url: ${article.data[index].url}`)
                        s.dataset.url = article?.data[index]?.url;
                    });
                }
            }
        });
    }, []);

    function widthChangeCallback() {
        if (typeof window !== "undefined" && window.innerWidth < 766) {
            setMediaSize(true);
        } else {
            setMediaSize(false);
        }
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("resize", widthChangeCallback);
        }
    }, []);

    useEffect(() => {
        widthChangeCallback();
    }, []);

    const stickStatus = () => {
        let status = statusRef?.current?.getBoundingClientRect() || 1;
        if (status.top < 130) {
            statusRef?.current?.classList?.add('_status');
            reviewCardStick?.current?.classList?.add('show');
        }

        else {
            statusRef?.current?.classList?.remove('_status');
            reviewCardStick?.current?.classList?.remove('show');
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", stickStatus);
            return () => {
                window.removeEventListener("scroll", stickStatus);
            };
        }
    }, [mediaSize]);

    const onSubmit = async (e, id) => {
        if (id) {
            const payload = {
                article_id: id,
                is_like: e == 1 ? true : false,
            };

            // Get the Authorization token from cookies
            const token = Cookies.get("Authorization");

            try {
                let res = await APIV3.post("/review-article", payload);

                if (res?.status == 200) {
                    // toast.success(res?.message);
                    swal("Success!", res?.data?.message, "success");
                } else {
                    swal("Error!", "Please make sure you are logged in!", "error");
                }
            } catch (error) {
                swal("Error!", "Please make sure you are logged in!", "error");
            }
        }
    };


    return (
        <>
            <MetaDataCustom metaData={props?.diseasePageData} />
            {loadingLast ? (
                <div className="flex_center">
                    <Image
                        className="loading_gif m-auto"
                        src={LoaderAssets}
                        alt="loader"
                        width={90}
                        height={90}
                    />
                </div>
            ) : (
                <section className="articleInnerPage section_fit_screen articleDisease revampDisease">
                    <div className="banner_diabities">
                        <div className="bg-color-breadcrumb">
                            <Container>
                                <Row>
                                    <Col lg="12">
                                        <Breadcrumb className="breadCrumb">
                                            <Breadcrumb.Item href="/sehat-a-z">Articles
                                                <span> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <g clip-path="url(#clip0_1_6680)">
                                                        <path d="M7.74155 5.59173C7.41655 5.91673 7.41655 6.44173 7.74155 6.76673L10.9749 10.0001L7.74155 13.2334C7.41655 13.5584 7.41655 14.0834 7.74155 14.4084C8.06655 14.7334 8.59155 14.7334 8.91655 14.4084L12.7416 10.5834C13.0666 10.2584 13.0666 9.73339 12.7416 9.40839L8.91655 5.58339C8.59989 5.26673 8.06655 5.26673 7.74155 5.59173Z" fill="white" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1_6680">
                                                            <rect width="20" height="20" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg></span>
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item href={props?.diseasePageData?.redirect_url}>
                                                {props?.diseasePageData?.name}
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        <div className="breadCrumbMainBox hk_banner_area" style={{ backgroundImage: `url(${props?.diseasePageData?.cover_image})`, height: '720px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', position: 'relative', backgroundPosition: '100% 100%' }}>
                            <div className="writerName">
                                <Container style={{ height: '100%' }}>
                                    <div className="inner_review_bg_mob" style={{ height: '100%' }}>
                                        {doctorProfile?.reviewedBy?.name && (
                                            <>
                                                <ReviewBy
                                                    link={doctorProfile?.reviewedBy?.redirect_url}
                                                    reviewImg={doctorProfile?.reviewedBy?.image}
                                                    reviewBy={
                                                        <>
                                                            {doctorProfile?.reviewedBy?.name && (
                                                                <>
                                                                    <div className={"wrapeDisease"}>
                                                                        {/* <div className={"doctorCircle"}>
                                                                           <Image src={doctorProfile?.reviewedBy?.image !== null && doctorProfile?.reviewedBy?.image } width={88} height={88} crossorigin="anonymous" alt="" className="img_docto_pro img-fluid" />
                                                                        </div> */}
                                                                        <div className="wrpae_inner_prof">
                                                                            <div>{i18nData?.reviewed_by}</div>
                                                                            <Link
                                                                                className="onHoverUnderline mob 11"
                                                                                href={
                                                                                    `/doctor/${articles?.reviewed_by?.id}` || ""
                                                                                }
                                                                            >
                                                                                <Image src="" alt="" />
                                                                                <b>
                                                                                    {`${doctorProfile?.reviewedBy?.prefix
                                                                                        ? `${doctorProfile?.reviewedBy?.prefix}.`
                                                                                        : ""
                                                                                        } ${doctorProfile?.reviewedBy?.name || ""}`}
                                                                                </b>
                                                                                <span className="arrowRight bannerArrowArtic"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                                                                    <path d="M15.6247 30.0003L13.833 28.2087L22.083 19.9587L13.833 11.7087L15.6247 9.91699L25.6663 19.9587L15.6247 30.0003Z" fill="white" />
                                                                                </svg></span>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}

                                                        </>
                                                    }
                                                />
                                            </>
                                        )}
                                    </div>
                                </Container>
                            </div>
                        </div>
                    </div>
                    <section
                        className={`articleDetail hk_mob_desease_article ff ${articles?.widgets?.length > 0 &&
                            articles?.redirect_url &&
                            articles?.redirect_url?.includes("/ur/")
                            ? "urdu"
                            : ""
                            }`}
                    >
                        <div className="mobile_desease_article_banner">
                            <div
                                className="review_by_bg"
                                style={{
                                    backgroundImage: `url(${articles?.image})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    height: "280px",
                                    position: "relative",
                                }}
                            >

                            </div>
                        </div>
                        <Container>
                            <Row>
                                <Col md={8}>
                                    <div className="content">
                                        {articles?.label && (
                                            <div className="articleInnerLabel">
                                                <CustomPopOver
                                                    trigger="hover"
                                                    content={
                                                        <HeadingDescVsmall
                                                            text={
                                                                <p
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: articles?.label?.description,
                                                                    }}
                                                                />
                                                            }
                                                        />
                                                    }
                                                >
                                                    <Status
                                                        text={articles?.label?.value}
                                                        bgColor={articles?.label?.color}
                                                    />
                                                </CustomPopOver>
                                            </div>
                                        )}
                                        <SectionHeadingLarge
                                            text={articles?.widgets?.length > 0 && articles?.name}
                                        />
                                        <div className="reviewed">
                                            {doctorProfile?.reviewedBy?.name && (
                                                <ReviewBy
                                                    writtenBy={
                                                        <>
                                                            {articles?.written_by?.name && (
                                                                <>
                                                                    <div>{i18nData?.written_by}</div>
                                                                    <b>{articles?.written_by?.name}</b>
                                                                </>
                                                            )}
                                                        </>
                                                    }
                                                    updateOn={
                                                        <>
                                                            {doctorProfile?.updatedOn && (
                                                                <>
                                                                    <div>{i18nData?.updated_on}</div>
                                                                    <b> {doctorProfile?.updatedOn}</b>
                                                                </>
                                                            )}
                                                        </>
                                                    }
                                                />
                                            )}
                                        </div>
                                        {/* <div className="factCheckedChip">
                                            <span className="factCheckSv"></span>
                                            <span> Fact Checked  </span>
                                        </div> */}
                                        <div className="custom_mob_affix">
                                            <AffixFC offsetTop={120} className="tooo">
                                                <div>
                                                    <div
                                                        ref={statusRef}
                                                        className={`statusContainer container ${mediaSize ? "_status" : ""
                                                            }`}
                                                    >
                                                        <ScrollContainer className="_sticky scroll-container">
                                                            <StatusWithoutBackground
                                                                icon={arrowIcon}
                                                                highlighted={highlightedTab}
                                                                status={redirectTags}
                                                            />
                                                        </ScrollContainer>
                                                        {/* <div
                                                            ref={reviewCardStick}
                                                            className="reviewCard onStick test"
                                                        >
                                                            {doctorProfile?.reviewedBy?.image && (
                                                                <Image
                                                                    src={imagePath(
                                                                        doctorProfile?.reviewedBy?.image
                                                                    )}
                                                                    alt=""
                                                                    crossorigin="anonymous"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                            )}
                                                            <Link
                                                                href={
                                                                    doctorProfile?.reviewedBy?.redirect_url ===
                                                                        null
                                                                        ? ""
                                                                        : `/doctor/${articles?.reviewed_by?.id}` ||
                                                                        ""
                                                                }
                                                            >
                                                                <div>
                                                                    {doctorProfile?.reviewedBy?.name && (
                                                                        <HeadingDescVsmall
                                                                            text={i18nData?.medically_reviewed_by}
                                                                        />
                                                                    )}
                                                                    <div className="d-flex">
                                                                        {doctorProfile?.reviewedBy?.name && (
                                                                            <HeadingDescVsmall
                                                                                text={
                                                                                    <span style={{ fontWeight: "700" }}>
                                                                                        {doctorProfile?.reviewedBy?.name}
                                                                                    </span>
                                                                                }
                                                                            />
                                                                        )}

                                                                        <div className="educations">
                                                                            {doctorProfile?.reviewedBy
                                                                                ?.doctor_educations?.length > 0 && (
                                                                                    <>
                                                                                        {doctorProfile?.reviewedBy
                                                                                            ?.doctor_educations?.length > 0 &&
                                                                                            doctorProfile?.reviewedBy?.doctor_educations?.map(
                                                                                                (item) =>
                                                                                                    doctorProfile?.reviewedBy
                                                                                                        ?.doctor_educations?.length >
                                                                                                        1 ? (
                                                                                                        <HeadingDescVsmall
                                                                                                            text={`(${item}), `}
                                                                                                        />
                                                                                                    ) : (
                                                                                                        <HeadingDescVsmall
                                                                                                            text={`(${item})`}
                                                                                                        />
                                                                                                    )
                                                                                            )}
                                                                                    </>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </AffixFC>
                                        </div>
                                        {articles?.widgets?.length > 0 && (
                                            <>
                                                <SocialLinks
                                                    slug={articles?.redirect_url}
                                                    title={articles?.name}
                                                    componentRef={articleRef.current}
                                                />
                                            </>
                                        )}

                                        {articles?.descripton && articles?.descripton != "." && (
                                            <HeadingDesc text={articles?.descripton} />
                                        )}

                                        <div
                                            className="d-none"
                                            style={{
                                                display: !articles?.hide_image_in_detail ? "none" : "",
                                            }}
                                        >
                                            {articles?.image && (
                                                <Image
                                                    src={articles?.image}
                                                    crossorigin="anonymous"
                                                    alt="articleImage"
                                                    width={100}
                                                    height={100}
                                                />
                                            )}
                                        </div>

                                        <div ref={(el) => (articleRef.current = el)}>
                                            {articles?.widgets?.length > 0 &&
                                                articles?.widgets?.map((item, index) => {
                                                    if (true) {
                                                        return (
                                                            <ScrollSpy>
                                                                {renderWidget(
                                                                    item?.key_type,
                                                                    item,
                                                                    index,
                                                                    false,
                                                                    false,
                                                                    (e) => setHighlightedTab(e)
                                                                )}
                                                            </ScrollSpy>
                                                        );
                                                    }
                                                })}
                                        </div>
                                    </div>
                                </Col>
                                <Col md={4} className=" hk-right_stick">
                                    <div className="reviewCard onStick">
                                        {doctorProfile?.reviewedBy?.image && (
                                            <Image
                                                src={imagePath(doctorProfile?.reviewedBy?.image)}
                                                alt="reviewCardImg"
                                                crossorigin="anonymous"
                                                width={100}
                                                height={100}
                                            />
                                        )}

                                        <div>
                                            {doctorProfile?.reviewedBy?.name && (
                                                <HeadingDescVsmall
                                                    text={i18nData?.medically_reviewed_by}
                                                />
                                            )}

                                            {doctorProfile?.reviewedBy?.name && (
                                                <HeadingDescVsmall
                                                    text={<b>{doctorProfile?.reviewedBy?.name}</b>}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    {doctorProfile?.reviewedBy?.name && (
                                        <ReviewBy
                                            writtenBy={
                                                <>
                                                    {articles?.written_by?.name && (
                                                        <>
                                                            <div>{i18nData?.written_by}</div>
                                                            <b>{articles?.written_by?.name}</b>
                                                        </>
                                                    )}
                                                </>
                                            }
                                            updateOn={
                                                <>
                                                    {doctorProfile?.updatedOn && (
                                                        <>
                                                            <div>{i18nData?.updated_on}</div>
                                                            <b> {doctorProfile?.updatedOn}</b>
                                                        </>
                                                    )}
                                                </>
                                            }
                                        />
                                    )}
                                    <div className="top_reads related article">
                                        {articles?.related?.length > 0 && (
                                            <SectionHeadingMed text={i18nData?.read_this_next} />
                                        )}
                                        {articles?.related?.length > 0 &&
                                            articles?.related?.map((item, i) => {
                                                return (
                                                    <>
                                                        <ArticleItemLists
                                                            key={i}
                                                            link={item?.redirect_url}
                                                            image={item?.image}
                                                            heading={item?.name}
                                                        />
                                                    </>
                                                );
                                            })}
                                    </div>
                                    <Link href="/doctor-now" className="smallAdds">
                                        <Image src={smallAdd1} alt="Small Adds" width={312} height={186} />
                                    </Link>
                                    <Link href="/" className="smallAdds">
                                        <Image src={smallAdd2} alt="Small Adds" width={312} height={186} />
                                    </Link>
                                    <div className="add">
                                        <a
                                            href={imageCollection[imageIndexToShow]?.link}
                                            target="blank"
                                        >
                                            <Image
                                                src={imageCollection[imageIndexToShow]?.image}
                                                className="img-fluid w-100"
                                                width={100}
                                                height={100}
                                            />
                                        </a>
                                    </div>
                                </Col>
                                <div className="hk_deasese_feedback">
                                    <FeedBack onValueChange={(e) => onSubmit(e, articles?.id)} />
                                </div>
                            </Row>
                            {/* <RelatedArticles i18nData={i18nData} relatedArticle={relatedArticle} slug={articles?.redirect_url} /> */}
                        </Container>
                    </section>
                </section>
            )}
        </>
    );
}

export async function getServerSideProps(context) {
    const { locale } = context;
    const { slug } = context.query;
    const diseasePage = `${getArticalUrl}${slug}`;

    try {
        const res = await APIV3.get(diseasePage, {
            headers: {
                platform: "web"
            },
        });

        if (res?.status == 200) {
            const diseasePageData = res?.data?.data;

            return {
                props: {
                    ...(await serverSideTranslations(locale, ["common"])),
                    diseasePageData
                },
            };
        }

        else {
            return { props: { diseasePageData: {} } };
        }

    } catch (error) {
        return { props: { diseasePageData: {} } };
    }
}

export default DiseasePage;
