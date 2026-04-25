import React from "react";
import React from "react";
import GerdSymtoms from "../components/gerdSymptoms/GerdSymtoms";
import { NewsLetter } from "@/components/NewsLetter";
import { Resource } from "@/components/resource";
import { NewBanner } from "@/components/newBanner";
import { SectionHeading } from "@/components/SectionHeading";
import { TypingAnimation } from "@/components/typingAnimation";
import { RightArrowWithBorder } from "@/components/rightArrowWithBorder";
import { AnchorLink } from "@/components/ancerWithUnderline";
import RoundButton from "@/components/roundbutton/RoundButton";
import { NewsLetter } from "@/components/NewsLetter";
import { Resource } from "@/components/resource";
import { NewBanner } from "@/components/newBanner";
import { SectionHeading } from "@/components/SectionHeading";
import { TypingAnimation } from "@/components/typingAnimation";
import { RightArrowWithBorder } from "@/components/rightArrowWithBorder";
import { AnchorLink } from "@/components/ancerWithUnderline";
import RoundButton from "@/components/roundbutton/RoundButton";
// import { FindDoctorByDiseaseFilter, HealthCareFilter, TopicsFilter } from '../Components/Forms';
import TopicsFilter from "../components/topicsFilter/TopicsFilter";
import FindDoctorByDiseaseFilter from "../components/findDoctorByDiseaseFilter/FindDoctorByDiseaseFilter";
import { SimpleSlider } from "@/components/sliders/simpleSlider";
import { SimpleSliderPricing } from "@/components/sliders/simpleSliderPricing";
import { TestimonialSlider } from "@/components/sliders/testimonialSlider";
import { SimpleSliderPills } from "@/components/sliders/simpleSliderPills";
import { ProfileCard } from "@/components/ProfileCard";
import { HealthConditions } from "@/components/healthConditions";
import { DiscoverWellnesstopics } from "@/components/discoverWellnessTopics";
import { FinDocByDisease } from "@/components/findDocByDisease";
import { ConsultWithDoctor } from "@/components/consultWithDoctor";
import { TopReads } from "@/components/topReads";
import ArticleFooter from "../components/articleFooter/ArticleFooter";
import BulletLinkList from "../components/bulletLinkList/BulletLinkList";
import TopicBanner from "../components/topicBanner/TopicBanner";
import RecomendedDoc from "../components/recommendedDoc/RecommendedDoc";
import BrowseDoctor from "../components/browseDoctor/BrowseDoctor";
import NutritionTopReads from "../components/nutritionTopReads/NutritionTopReads";
import HealthTopReads from "../components/healthTopReads/HealthTopReads";
import MoreInHealth from "../components/moreInHealth/MoreInHealth";
import FrequentlyAskedQues from "../components/frequentlyaskedques/FrequentlyAskedQues";
import VideoWidget from "../components/videoWidget/VideoWidget";
import MonitorHealthSection from "../components/monitorHealthSection/MonitorHealthSection";
import HowOurTechWorks from "../components/howOurTechWorks/HowOurTechWorks";
import HowItWorks from "../components/howItWorks/HowItWorks";
import BenefitsOFOnlineConsult from "../components/benefitsOfOnlineConsult/BenefitsOfOnlineConsult";
import MostSearchedSpeciality from "../components/mostSearchedSpeciality/MostSearchedSpeciality";
import { Container } from "react-bootstrap";
import HealthDataPlatform from "../components/healthDataPlatform/HealthDataPlatform";
import FeaturedDoctor from "../components/featuredDoctor/FeaturedDoctor";
import BannerWithSearchBar from "../components/bannerWithSearchBar/BannerWithSearchBar";
import SubscriptionBoxes from "../components/subscriptionBoxes/SubscriptionBoxes";
import ResourceSingleArticle from "../components/resourceSingleArticle/ResourceSingleArticle";
import HealthCareFilter from "../components/healthCareFilter/HealthCareFilter";
// import i18n from '../i18n';
import { DiscoverWellnesstopicsWidget } from "@/components/discoverWellnessTopicsWidget";
import { HealthTopReadsCustom } from "@/components/healthTopReadsCustom";
import { DiscoverWellnessTopicsWidgetCustomRefCard } from "@/components/discoverWellnessTopicsWidgetCustomRefCard";
import { TrustedByTheBest } from "@/components/TrustedByTheBest";
import { DoctorsWaiting } from "@/components/DoctorsWaiting";
import { TrackYourHealth } from "@/components/TrackYourHealth";
import { IntroducingBanner } from "@/components/introducingBanner";
import { OurExpertDoctor } from "@/components/OurExpertDoctor";
import { SehatScanVideo } from "@/components/SehatScanVideo";
import { InstantDoctorConsultation } from "@/components/instantDoctorConsultation";
import { CheckYourHealth } from "@/components/checkYourHealth";
import { StartAVideoCall } from "@/components/startAVideoCall";
import { HowToInstall } from "@/components/howToInstall";
import { Benefits } from "@/components/benefits";
import { Partners } from "@/components/partners";
import PricingTable from "../components/pricingTable/PricingTable";
import { OurJourney } from "@/components/ourJourney";

export const renderWidget = (type, item, index, fullWidth = true, bnrContent, visibleCallback, className) => {


    switch (type) {
        case "web-subscription":
            return (
                <>
                    <SubscriptionBoxes widgetData={item} key={index} />
                    <PricingTable widgetData={item} key={index} />
                </>
            );

        case "app-banner":
            if (item?.data?.type === "image") {
                return (
                    <>
                        <section
                            key={index}
                            data-reference_widget_id={item?.id}
                            data-widget_id={item?.widget_id}

                            className="consultNow dynamic-widget"
                        >
                            <TopicBanner
                                showContent={bnrContent}
                                bgImg={item?.data?.image}
                                img={""}
                                type={type}
                                title={item?.heading}
                                className={className}
                                banner_color={item?.data?.banner_color}
                                desc={
                                    <div
                                        dangerouslySetInnerHTML={{ __html: item?.description }}
                                    />
                                }
                            />
                        </section>
                    </>
                );

            }


        case "web-banner":
            if (item?.data?.type === "image") {
                return (
                    <>
                        <section
                            key={index}
                            data-reference_widget_id={item?.id}
                            data-widget_id={item?.widget_id}
                            className="consultNow dynamic-widget"
                        >
                            <TopicBanner
                                showContent={bnrContent}
                                bgImg={item?.data?.image}
                                img={""}
                                type={type}
                                title={item?.heading}
                                className={className}
                                banner_color={item?.data?.banner_color}
                                desc={
                                    <div
                                        dangerouslySetInnerHTML={{ __html: item?.description }}
                                    />
                                }
                            />
                        </section>
                    </>
                );

            } else if (item?.data?.type === "web-search") {
                return <BannerWithSearchBar widgetData={item} key={index} />;
            } else {
                // return <MainBanner widgetData={item} key={index} />;
                return <NewBanner widgetData={item} key={index} />;
            }

        case "web-search":
            let cropAnimationText = item?.data?.dynamic_text?.split(","[0]);
            return (
                <section
                    key={index}
                    data-reference_widget_id={item?.id}
                    data-widget_id={item?.widget_id}
                    className="doctorFilter dynamic-widget"
                >
                    <SectionHeading
                        // heading={`${item?.heading || ''}`}
                        heading={`${item?.heading?.split("{placeholder}")[0] || ""}`}
                        colorHeading={<TypingAnimation textArry={cropAnimationText} />}
                        // icon={item?.redirect_url && <RightArrow />}
                        link={
                            item?.redirect_url && (
                                <div className="btn_container">
                                    <RightArrowWithBorder />
                                    <AnchorLink
                                        to={item?.redirect_url}
                                        // text={i18n.t('browse_all')}
                                        text="View All"
                                    />
                                </div>
                            )
                        }
                    />
                    <HealthCareFilter widgetData={item} excludeSpeciality={true} />
                </section>
            );

        case "web-doctor":
            return (
                <section
                    key={index}
                    data-reference_widget_id={item?.id}
                    data-widget_id={item?.widget_id}
                    className="_overflow-hidden doctor dynamic-widget doctorNewSection"
                >
                    <Container>
                        {item?.data && (
                            <>
                                <SimpleSlider
                                    sliderBoxWidth={true}
                                    adaptiveHeight={true}
                                    className="profileSlider"
                                    sliderTitle={`${item?.heading || ""} ${item?.data?.speciality_name || ""
                                        }`}
                                    sliderDesc={item?.description || ""}
                                >
                                    {item?.data?.map((card, index) => (
                                        <ProfileCard card={card} key={index + 1} />
                                    ))}
                                </SimpleSlider>
                            </>
                        )}
                    </Container>
                </section>
            );

        case "web-topic-pills":
            return (
                <section
                    key={index}
                    data-reference_widget_id={item?.id}
                    data-widget_id={item?.widget_id}
                    className="overflow-hidden findADoctor dynamic-widget"
                >
                    <Container>
                        {item?.data && (
                            <>
                                <SimpleSliderPills
                                    viewAllLink={item?.redirect_url}
                                    className="profileSlider one_line hk_pill_slider variable-width"
                                    sliderTitle={item?.heading}
                                    rows={2}
                                    // slidesPerRow={2}
                                    sliderBoxWidth={true}
                                >
                                    {item?.data?.map(
                                        (pill, index) =>
                                            pill?.data?.redirect_url && (
                                                <RoundButton
                                                    link={pill?.data?.redirect_url}
                                                    key={index}
                                                    text={pill?.data?.title || pill?.data?.name}
                                                />
                                            )
                                    )}
                                </SimpleSliderPills>
                            </>
                        )}
                    </Container>
                </section>
            );

        case "web-about-feature":
            return (
                <section
                    key={index}
                    className="dynamic-widget"
                    data-reference_widget_id={item?.id}
                    data-widget_id={item?.widget_id}
                >
                    <HowItWorks widgetData={item} key={index} />
                    <BenefitsOFOnlineConsult />
                </section>
            );

        case "web-call-by-reference-card":
            if (item?.data?.[0]?.type == "double-column") {
                // return <MonitorHealthSection widgetData={item} key={index} />;
            } else {
                return <HealthDataPlatform widgetData={item} key={index} />;
            }


        case "app-call-by-reference-card":
            if (item?.data?.[0]?.type == "double-column") {
                return <MonitorHealthSection widgetData={item} key={index} />;
            } else {
                return <HealthDataPlatform widgetData={item} key={index} />;
            }

        case "web-vital-health-scan":
            return <HowOurTechWorks widgetData={item} key={index} />;

        case "web-search-doctor-speciality":
            return <FindDoctorByDiseaseFilter widgetData={item} key={index} />;

        case "web-disease":
            return <HealthConditions widgetData={item} key={index} />;

        case "web-most-searched-specialties":
            return <MostSearchedSpeciality widgetData={item} key={index} />;

        case "web_widget_explore_topic":
            return (
                <section
                    key={index}
                    data-reference_widget_id={item?.id}
                    data-widget_id={item?.widget_id}
                    className="overflow-hidden dynamic-widget"
                >
                    <Container>
                        <SimpleSlider sliderChildren={4} sliderTitle={item?.data?.heading}>
                            {item?.data?.topics?.map(
                                (topic, i) =>
                                    topic?.banner_text && (
                                        <RoundButton key={i} text={topic?.banner_text} link={""} />
                                    )
                            )}
                        </SimpleSlider>
                    </Container>
                </section>
            );

        case "app-article":
            if (item?.data?.[0]?.type === "featured") {
                return <HealthTopReadsCustom widgetData={item} key={index} />;
            }

        case "web-article":
            if (item?.data?.[0]?.type === "featured") {
                return <HealthTopReads widgetData={item} key={index} />;
            }
            if (item?.data?.[0]?.type === "single_column") {
                return <NutritionTopReads widgetData={item} key={index} />;
            }
            if (item?.data?.[0]?.type === "double_column") {
                return <MoreInHealth widgetData={item} key={index} />;
            }
            if (item?.data?.[0]?.type === "single_article") {
                return <ResourceSingleArticle widgetData={item} key={index} />;
            }
        // return <></>

        case "web-media":
            if (item?.data?.[0]?.type === "image") {
                return (
                    <div className="image-area-article">
                        <Image
                            crossorigin="anonymous"
                            className="img-fluid"
                            alt={item?.data?.[0]?.alt}
                            src={item?.data?.[0]?.file_url}
                        />
                    </div>
                );
            }

            if (item?.data?.[0]?.type === "video") {
                return <VideoWidget widgetData={item} key={index} />;
            }

        case "web-media-custom":
            return <SehatScanVideo widgetData={item} key={index} />;
        case "web-media-custom":
            return <SehatScanVideo widgetData={item} key={index} />;

        case "app-media-custom":
            return <SehatScanVideo widgetData={item} key={index} />;

        // case "web-card":
        //     if (item?.data?.[0]?.type == "topic") {
        //         return <DiscoverWellnesstopics widgetData={item} key={index} />;
        //     }

        case "app-card":
            if (item?.data?.[0]?.type == "topic") {
                return <DiscoverWellnesstopics widgetData={item} key={index} />;
            }

            if (item?.data?.[0]?.type == "article") {

                if (item?.data?.[0]?.type == "article") {
                    return <DiscoverWellnesstopics widgetData={item} key={index} />;
                }
                if (item?.data?.[0]?.type == "doctor") {
                    return <FeaturedDoctor widgetData={item} key={index} />;
                }
            }
        case 'web-card-with-slider':
            if (item?.data?.[0]?.type == 'topic') {
                return (
                    <>
                        <DiscoverWellnesstopicsWidget widgetData={item} key={index} />
                    </>
                );
            }

        case "app-call-by-reference-card-custom":
            if (item?.data?.[0]?.type == "double-column") {
                return (
                    <>
                        {item?.data?.[0]?.card_type === "pricing-start-video-call" ? (
                            <>
                                <HowToInstall widgetData={item} key={index} />
                            </>
                        ) : null}
                        {item?.data?.[0]?.card_type === "pricing-benefits" ? (
                            <>
                                <Benefits widgetData={item} key={index} />
                            </>
                        ) : null}
                        {item?.data?.[0]?.card_type === "pricing-partners" ? (
                            <>
                                <TrustedByTheBest widgetData={item} key={index} />
                            </>
                        ) : null}
                        {item?.data?.[0]?.card_type === "testimonials" ? (
                            <>
                                <TestimonialSlider widgetData={item} key={index} />
                            </>
                        ) : null}
                        {item?.data?.[0]?.card_type === "pricing-doctor" ? (
                            <>
                                <section
                                    key={index}
                                    data-reference_widget_id={item?.id}
                                    data-widget_id={item?.widget_id}
                                    className="_overflow-hidden doctor dynamic-widget doctorNewSection"
                                >
                                    <Container>
                                        {item?.data && (
                                            <>
                                                <SimpleSliderPricing
                                                    sliderBoxWidth={true}
                                                    adaptiveHeight={true}
                                                    className="profileSlider"
                                                    sliderTitle={`${item?.heading || ""}`}
                                                    sliderDesc={item?.description || ""}
                                                >
                                                    {item?.data?.map((card, index) => (
                                                        <ProfileCard card={card} key={index + 1} />
                                                    ))}
                                                </SimpleSliderPricing>
                                            </>
                                        )}
                                    </Container>
                                </section>
                            </>
                        ) : null}
                    </>
                );
            }

        case "web-call-by-reference-card-custom":
            if (item?.data?.[0]?.type == "single-column") {
                return (
                    <>
                        <DiscoverWellnessTopicsWidgetCustomRefCard
                            widgetData={item}
                            key={index}
                        />
                        {item?.data?.[0]?.card_type === "trusted" ? (
                            <>
                                <TrustedByTheBest widgetData={item} key={index} />
                            </>
                        ) : null}
                        {item?.data?.[0]?.card_type === "doctor-waiting" ? (
                            <>
                                <DoctorsWaiting widgetData={item} key={index} />
                            </>
                        ) : null}
                    </>
                );
            }
            if (item?.data?.[0]?.type == "single-column-cards") {
                return (
                    <>
                        {item?.data?.[0]?.card_type === "tracking" ? (
                            <>
                                <TrackYourHealth widgetData={item} key={index} />
                            </>
                        ) : null}
                        {item?.data?.[0]?.card_type === "well-experts" ? (
                            <>
                                <OurExpertDoctor widgetData={item} key={index} />
                            </>
                        ) : null}
                    </>
                );
            }

            if (item?.data?.[0]?.type == "double-column") {
                return (
                    <>
                        {/* {item?.data?.[0]?.card_type === 'instant-dr-consultation' ? (
                            <>
                                <OurJourney widgetData={item} key={index} />
                            </>
                        ) : null} */}
                        {item?.data?.[0]?.card_type === 'instant-dr-consultation' ? (
                            <>
                                <InstantDoctorConsultation widgetData={item} key={index} />
                            </>
                        ) : null}
                        {item?.data?.[0]?.card_type === 'check-your-health' ? (
                            <>
                                <CheckYourHealth widgetData={item} key={index} />
                            </>
                        ) : null}
                        {item?.data?.[0]?.card_type === 'start-video-call' ? (
                            <>
                                <StartAVideoCall widgetData={item} key={index} />
                            </>
                        ) : null}
                        {item?.data?.[0]?.card_type === 'testimonials' ? (
                            <>
                                <TestimonialSlider widgetData={item} key={index} />
                            </>
                        ) : null}

                        {item?.data?.[0]?.card_type === 'pricing-partners' ? (
                            <>
                                <TrustedByTheBest widgetData={item} key={index} />
                            </>
                        ) : null}
                    </>
                );
            }


        case 'web-speciality':
            return (
                <FinDocByDisease
                    widgetData={item}
                />
            );

        case '':
            return <ConsultWithDoctor widgetData={item} key={index} />;

        case 'web_widget_articles':
            return <TopReads widgetData={item} key={index} />;

        case 'web-article-custom':
            return <HealthTopReadsCustom widgetData={item} key={index} />;

        case 'web-heading-and-description':
            return (
                <GerdSymtoms
                    visibleCallback={visibleCallback}
                    widgetData={item}
                    key={index}
                />
            );
        case '':
            return (
                <section
                    key={index}
                    data-reference_widget_id={item?.id}
                    data-widget_id={item?.widget_id}
                    className="overflow-hidden dynamic-widget"
                >
                    <RecomendedDoc />
                </section>
            );
        // case '':
        //   return <FeedBack widgetData={item} key={index} />;
        case 'web-in-feed-article':
            return <NewsLetter widgetData={item} key={index} />;
            case '':
                return <Resource widgetData={item} key={index} />;
        case 'web-call-to-action':
            // return <BrowseDoctor widgetData={item} key={index} />;
            return <p>lol</p>
        case 'app-call-to-action':
            // return <BrowseDoctor widgetData={item} key={index} />;
            return <p> lol </p>
        case 'web-reference':
            return (
                <ArticleFooter
                key={index}
                widgetData={item}
                sourceReviewDate={item?.heading || ''}
                sourceHeading={
                item?.data?.length > 0 ? `${item?.data?.length} sources` : ''
                }
                sourceDesc={item?.description}
                sourceContent={[<BulletLinkList points={item?.data} />]}
                />
                );

        case 'web-sehat-a-z':
            return <TopicsFilter widgetData={item} key={index} />;
        case 'web-faq':
            return (
                <section
                    key={index}
                    data-reference_widget_id={item?.id}
                    data-widget_id={item?.widget_id}
                    className="dynamic-widget"
                >
                    <FrequentlyAskedQues widgetData={item} key={'0000'} />
                </section>
            );
        // case 'web-article-helpful':
        //   return (
        //     <section
        //       key={index}
        //       data-reference_widget_id={item?.id}
        //       data-widget_id={item?.widget_id}
        //       className="dynamic-widget"
        //     >
        //       <FeedBack />
        //     </section>
        //   );
        default:
            return null;
    }
};
