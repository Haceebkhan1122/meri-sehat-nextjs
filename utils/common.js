import React from "react";
import { Container } from "react-bootstrap";
import dynamic from "next/dynamic";
import Image from "next/image";
import LabPackages from "@/components/labPackages/LabPackages";
import TopDoctorFaD from "@/components/TopDoctorFaD/TopDoctorFaD";
import OurStatistics from "../components/componentsUpdated/doctorNow/ourStatistics/OurStatistics";
import CitySpeciality from "@/components/componentsUpdated/citySpeciality/CitySpeciality";
import TopSearchedSpeciality from "@/components/componentsUpdated/topSearchedSpecialitiy/TopSearchedSpecialitiy";
import HiwFad from "@/components/componentsUpdated/find-a-doctor/hiwFad/HiwFad";
const GerdSymtoms = dynamic(() => import('../components/gerdSymptoms/GerdSymtoms').then((module) => module.default));
const NewsLetter = dynamic(() => import('@/components/NewsLetter').then((module) => module.NewsLetter));
const Resource = dynamic(() => import('@/components/resource').then((module) => module.Resource));
const NewBanner = dynamic(() => import('@/components/newBanner').then((module) => module.NewBanner));
const SectionHeading = dynamic(() => import('@/components/SectionHeading').then((module) => module.SectionHeading));
const TypingAnimation = dynamic(() => import('@/components/typingAnimation').then((module) => module.TypingAnimation));
const RightArrowWithBorder = dynamic(() => import('@/components/rightArrowWithBorder').then((module) => module.RightArrowWithBorder));
const AnchorLink = dynamic(() => import('@/components/ancerWithUnderline').then((module) => module.AnchorLink));
const RoundButton = dynamic(() => import('@/components/roundbutton/RoundButton').then((module) => module.default));
const TopicsFilter = dynamic(() => import('../components/topicsFilter/TopicsFilter').then((module) => module.default));
const FindDoctorByDiseaseFilter = dynamic(() => import('../components/findDoctorByDiseaseFilter/FindDoctorByDiseaseFilter').then((module) => module.default));
const SimpleSlider = dynamic(() => import('@/components/sliders/simpleSlider').then((module) => module.SimpleSlider));
const SimpleSliderPricing = dynamic(() => import('@/components/sliders/simpleSliderPricing').then((module) => module.SimpleSliderPricing));
const TestimonialSlider = dynamic(() => import('@/components/sliders/testimonialSlider').then((module) => module.TestimonialSlider));
const SimpleSliderPills = dynamic(() => import('@/components/sliders/simpleSliderPills').then((module) => module.SimpleSliderPills));
const ProfileCard = dynamic(() => import('@/components/ProfileCard').then((module) => module.ProfileCard));
const HealthConditions = dynamic(() => import('@/components/healthConditions').then((module) => module.HealthConditions));
const DiscoverWellnesstopics = dynamic(() => import('@/components/discoverWellnessTopics').then((module) => module.DiscoverWellnesstopics));
const FinDocByDisease = dynamic(() => import('@/components/findDocByDisease').then((module) => module.FinDocByDisease));
const ConsultWithDoctor = dynamic(() => import('@/components/consultWithDoctor').then((module) => module.ConsultWithDoctor));
const TopReads = dynamic(() => import('@/components/topReads').then((module) => module.TopReads));
const ArticleFooter = dynamic(() => import('../components/articleFooter/ArticleFooter').then((module) => module.default));
const BulletLinkList = dynamic(() => import('../components/bulletLinkList/BulletLinkList').then((module) => module.default));
const TopicBanner = dynamic(() => import('../components/topicBanner/TopicBanner').then((module) => module.default));
const RecomendedDoc = dynamic(() => import('../components/recommendedDoc/RecommendedDoc').then((module) => module.default));
const BrowseDoctor = dynamic(() => import('../components/browseDoctor/BrowseDoctor').then((module) => module.default));
const NutritionTopReads = dynamic(() => import('../components/nutritionTopReads/NutritionTopReads').then((module) => module.default));
const HealthTopReads = dynamic(() => import('../components/healthTopReads/HealthTopReads').then((module) => module.default));
const MoreInHealth = dynamic(() => import('../components/moreInHealth/MoreInHealth').then((module) => module.default));
const FrequentlyAskedQues = dynamic(() => import('../components/frequentlyaskedques/FrequentlyAskedQues').then((module) => module.default));
const VideoWidget = dynamic(() => import('../components/videoWidget/VideoWidget').then((module) => module.default));
const MonitorHealthSection = dynamic(() => import('../components/monitorHealthSection/MonitorHealthSection').then((module) => module.default));
const HowOurTechWorks = dynamic(() => import('../components/howOurTechWorks/HowOurTechWorks').then((module) => module.default));
const HowItWorks = dynamic(() => import('../components/howItWorks/HowItWorks').then((module) => module.default));
const BenefitsOFOnlineConsult = dynamic(() => import('../components/benefitsOfOnlineConsult/BenefitsOfOnlineConsult').then((module) => module.default));
const MostSearchedSpeciality = dynamic(() => import('../components/mostSearchedSpeciality/MostSearchedSpeciality').then((module) => module.default));
const HealthDataPlatform = dynamic(() => import('../components/healthDataPlatform/HealthDataPlatform').then((module) => module.default));
const FeaturedDoctor = dynamic(() => import('../components/featuredDoctor/FeaturedDoctor').then((module) => module.default));
const BannerWithSearchBar = dynamic(() => import('../components/bannerWithSearchBar/BannerWithSearchBar').then((module) => module.default));
const SubscriptionBoxes = dynamic(() => import('../components/subscriptionBoxes/SubscriptionBoxes').then((module) => module.default));
const ResourceSingleArticle = dynamic(() => import('../components/resourceSingleArticle/ResourceSingleArticle').then((module) => module.default));
const HealthCareFilter = dynamic(() => import('../components/healthCareFilter/HealthCareFilter').then((module) => module.default));
const DiscoverWellnesstopicsWidget = dynamic(() => import('@/components/discoverWellnessTopicsWidget').then((module) => module.DiscoverWellnesstopicsWidget));
const HealthTopReadsCustom = dynamic(() => import('@/components/healthTopReadsCustom').then((module) => module.HealthTopReadsCustom));
const DiscoverWellnessTopicsWidgetCustomRefCard = dynamic(() => import('@/components/discoverWellnessTopicsWidgetCustomRefCard').then((module) => module.DiscoverWellnessTopicsWidgetCustomRefCard));
const TrustedByTheBest = dynamic(() => import('@/components/TrustedByTheBest').then((module) => module.TrustedByTheBest));
const DoctorsWaiting = dynamic(() => import('@/components/DoctorsWaiting').then((module) => module.DoctorsWaiting));
const TrackYourHealth = dynamic(() => import('@/components/TrackYourHealth').then((module) => module.TrackYourHealth));
const OurExpertDoctor = dynamic(() => import('@/components/OurExpertDoctor').then((module) => module.OurExpertDoctor));
const SehatScanVideo = dynamic(() => import('@/components/SehatScanVideo').then((module) => module.SehatScanVideo));
const InstantDoctorConsultation = dynamic(() => import('@/components/instantDoctorConsultation').then((module) => module.InstantDoctorConsultation));
const CheckYourHealth = dynamic(() => import('@/components/checkYourHealth').then((module) => module.CheckYourHealth));
const StartAVideoCall = dynamic(() => import('@/components/startAVideoCall').then((module) => module.StartAVideoCall));
const HowToInstall = dynamic(() => import('@/components/howToInstall').then((module) => module.HowToInstall));
const Benefits = dynamic(() => import('@/components/benefits').then((module) => module.Benefits));
const PricingTable = dynamic(() => import('../components/pricingTable/PricingTable').then((module) => module.default));
const CommonHealth = dynamic(() => import('../components/commonHealth/CommonHealth').then((module) => module.default));
const BenefitsConsultation = dynamic(() => import('../components/homePage/benefitsConsultation/BenefitsConsultation').then((module) => module.default));
const HowItWorksDoctorNow = dynamic(() => import('../components/homePage/howItWorks').then((module) => module.HowItWorksDoctorNow));
const TwoImagesBanner = dynamic(() => import('../components/twoImagesBanner/TwoImagesBanner').then((module) => module.default));
const BookLabTest = dynamic(() => import('../components/bookLabTests/BookLabTest').then((module) => module.default));
const BookLabTestSteps = dynamic(() => import('../components/bookLabTestSteps/BookLabTestSteps').then((module) => module.default));
const BannerSlider = dynamic(() => import('../components/componentsUpdated/homePage/bannerSlider/bannerSlider').then((module) => module.default));
const TopLogoSlider = dynamic(() => import('../components/componentsUpdated/homePage/toplogoSection/toplogoSection').then((module) => module.default));
const ConsultNowSection = dynamic(() => import('../components/componentsUpdated/homePage/consultNowSection/consultNowSection').then((module) => module.default));
const ReachedWhere = dynamic(() => import('../components/componentsUpdated/find-a-doctor/reachedWhere/ReachedWhere').then((module) => module.default));
const HealthBenefits = dynamic(() => import('../components/componentsUpdated/homePage/healthBenefits/healthBenefits').then((module) => module.default));
const TrustedBy = dynamic(() => import('../components/componentsUpdated/homePage/trustedBy/trustedBy').then((module) => module.default));
const Endorsed = dynamic(() => import('../components/componentsUpdated/homePage/endorsed/Endorsed').then((module) => module.default));
const TrackHealth = dynamic(() => import('../components/componentsUpdated/homePage/trackHealth/trackHealth').then((module) => module.default));
const HealthCompanyLogoes = dynamic(() => import('../components/componentsUpdated/homePage/healthCompanyLogoes/healthCompanyLogoes').then((module) => module.default));
const Defeatdiabetes = dynamic(() => import('../components/componentsUpdated/homePage/defeatdiabetes/defeatdiabetes').then((module) => module.default));
const Successstories = dynamic(() => import('../components/componentsUpdated/homePage/successstories/successstories').then((module) => module.default));
const HealthCovrage = dynamic(() => import('../components/componentsUpdated/homePage/healthcareCoverage/HealthcareCoverage').then((module) => module.default));
const StoriesLove = dynamic(() => import('../components/componentsUpdated/doctorNow/storiesLove/StoriesLove').then((module) => module.default));
const SliderFooter = dynamic(() => import('../components/componentsUpdated/doctorNow/sliderFooter/SliderFooter').then((module) => module.default));
const DiseaseLibrary = dynamic(() => import('../components/componentsUpdated/homePage/diseaseLibrary/DiseaseLibrary').then((module) => module.default));
const MainBanner = dynamic(() => import('../components/componentsUpdated/mainBanner/MainBanner').then((module) => module.default));
const MostViewedTopics = dynamic(() => import('../components/componentsUpdated/SehatA-Z/mostViewedTopics/MostViewedTopics').then((module) => module.default));
const SehatBrowse = dynamic(() => import('../components/componentsUpdated/SehatA-Z/sehatBrowse/SehatBrowse').then((module) => module.default));
const ReduceDiabities = dynamic(() => import('../components/componentsUpdated/SehatA-Z/ReduceDiabities/ReduceDiabities').then((module) => module.default));
const SliderLimitedOffer = dynamic(() => import('../components/componentsUpdated/SehatA-Z/limitedOffer/LimitedOffer').then((module) => module.default));
const HealthArticles = dynamic(() => import('../components/componentsUpdated/SehatA-Z/healthArticles/HealthArticles').then((module) => module.default));
const ConnectDoctor = dynamic(() => import('../components/componentsUpdated/doctorNow/connectDoctor/ConnectDoctor').then((module) => module.default));
const RatingsBar = dynamic(() => import('../components/componentsUpdated/doctorNow/RatingsBar').then((module) => module.default));
const GetHelp = dynamic(() => import('../components/componentsUpdated/doctorNow/getHelp/GetHelp').then((module) => module.default));
const SecondOpinion = dynamic(() => import('../components/componentsUpdated/doctorNow/secondOpinion/SecondOpinion').then((module) => module.default));
const HowItWorksDoctor = dynamic(() => import('../components/componentsUpdated/doctorNow/howItWorksDoctor/HowItWorksDoctor').then((module) => module.default));
const CaringCompetant = dynamic(() => import('../components/componentsUpdated/doctorNow/caringCompetent/CaringCompetant').then((module) => module.default));
const AiTechnology = dynamic(() => import('../components/componentsUpdated/sehatScan/aiTechnology/aiTechnology').then((module) => module.default));
const CircialHealthVitals = dynamic(() => import('../components/componentsUpdated/sehatScan/crucialHealthVitals/crucialHealthVitals').then((module) => module.default));
const VideoSection = dynamic(() => import('../components/componentsUpdated/sehatScan/videoSection/videoSection').then((module) => module.default));
const TrackVitals = dynamic(() => import('../components/componentsUpdated/sehatScan/trackVitals/trackVitals').then((module) => module.default));
const HealthGoal = dynamic(() => import('../components/componentsUpdated/doctorNow/healthGoal/HealthGoal').then((module) => module.default));
const LearnScanTechnology = dynamic(() => import('../components/componentsUpdated/sehatScan/learnScanTechnology/learnScanTechnology').then((module) => module.default));
const Faq = dynamic(() => import('../components/componentsUpdated/homePage/faqs/faqs').then((module) => module.default));
const TrustedSection = dynamic(() => import('../components/componentsUpdated/Pricing/trustedSection/trustedSection').then((module) => module.default));
const AreUDoctor = dynamic(() => import('../components/componentsUpdated/doctorNow/areUDoctor/AreUDoctor').then((module) => module.default));
const Testimonials = dynamic(() => import('@/components/componentsUpdated/Pricing/testimonials/testimonials').then((module) => module.default));
const BannerCwp = dynamic(() => import('@/components/componentsUpdated/corporate-wellness-program/bannerCwp/BannerCwp').then((module) => module.default));
const OverLooking = dynamic(() => import('@/components/componentsUpdated/corporate-wellness-program/overLooking/OverLooking').then((module) => module.default));
const OfferPrecision = dynamic(() => import('@/components/componentsUpdated/corporate-wellness-program/offerPrecision/OfferPrecision').then((module) => module.default));
const ReadyBuild = dynamic(() => import('@/components/componentsUpdated/corporate-wellness-program/readyBuild/ReadyBuild').then((module) => module.default));
const TrustByHealth = dynamic(() => import('@/components/componentsUpdated/corporate-wellness-program/trustByHealth/TrustByHealth').then((module) => module.default));
const FadTwoBanner = dynamic(() => import('@/components/componentsUpdated/find-a-doctor/fadBannerUp/FadBannerUp').then((module) => module.default));
const CommonHealthFad = dynamic(() => import('@/components/componentsUpdated/find-a-doctor/commonHealth/CommonHealthFaD').then((module) => module.default));
const ConnectPatient = dynamic(() => import('@/components/componentsUpdated/find-a-doctor/connectPatient/ConnectPatient').then((module) => module.default));
const BannerMsPro = dynamic(() => import('@/components/componentsUpdated/mspro/bannerMsPro/BannerMsPro').then((module) => module.default));
const WorkshopsAction = dynamic(() => import('@/components/componentsUpdated/workshopsAction/workshopsAction').then((module) => module.default));
const ExploreWorkshops = dynamic(() => import('@/components/componentsUpdated/exploreWorkshops/exploreWorkshops').then((module) => module.default));
const LeaveHard = dynamic(() => import('@/components/componentsUpdated/mspro/leaveHard/LeaveHardMs').then((module) => module.default));
const SimplifyWork = dynamic(() => import('@/components/componentsUpdated/mspro/simplifyWork/SimplifyWork').then((module) => module.default));
const ManagePractice = dynamic(() => import('@/components/componentsUpdated/mspro/managePractice/ManagePractice').then((module) => module.default));
const DataExclusive = dynamic(() => import('@/components/componentsUpdated/mspro/dataExclusive/DataExclusive').then((module) => module.default));
const CompleteSolution = dynamic(() => import('@/components/componentsUpdated/mspro/completeSolution/CompleteSolution').then((module) => module.default));
const PersonalizedCare = dynamic(() => import('@/components/componentsUpdated/ccm/personalizedCare/PersonalizedCare').then((module) => module.default));
const ProgramIncludes = dynamic(() => import('@/components/componentsUpdated/ccm/programIncludes/ProgramIncludes').then((module) => module.default));
const RealStoryVid = dynamic(() => import('@/components/componentsUpdated/ccm/realStoryVid/RealStoryVid').then((module) => module.default));
const DownloadAppCta = dynamic(() => import('../components/componentsUpdated/downloads/downloadAppCta/DownloadAppCta').then((module) => module.default));
const WhyChoose = dynamic(() => import('../components/componentsUpdated/ambulatory/whychoose/WhyChoose').then((module) => module.default));
const WhatWeDo = dynamic(() => import('../components/componentsUpdated/ambulatory/whatwedo/WhatWeDo').then((module) => module.default));
const CultureCollaboration = dynamic(() => import('../components/componentsUpdated/cultureCollaboration/cultureCollaboration').then((module) => module.default));
const OpenPositions = dynamic(() => import('../components/componentsUpdated/openPositions/OpenPositions').then((module) => module.default));
const WhyWorkWithUs = dynamic(() => import('../components/componentsUpdated/whyWorkWithUs/WhyWorkWithUs').then((module) => module.default));


export const renderWidget = (type, item, index, fullWidth = true, bnrContent, pageName, visibleCallback, className, setSpecialityValue, selectedCityCookie, fetchDoctorByAllFilter, setSpecialtiesModal, specialtiesModal) => {

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
                                alt={item?.data?.alt}
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
            else if (item?.data?.type === "web-search") {
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
                    data-aos="fade-up" data-aos-duration="3000"
                >
                    <Container>
                        {item?.data && (
                            <>
                                <SimpleSlider
                                    sliderBoxWidth={true}
                                    buttonRedirect={item?.redirect_url}
                                    buttonText={item?.button_text}
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

        case "app-doctor":
            return (
                <section
                    key={index}
                    data-reference_widget_id={item?.id}
                    data-widget_id={item?.widget_id}
                    className="_overflow-hidden doctor dynamic-widget doctorNewSection  doctor_now_self_page"
                    data-aos="fade-up" data-aos-duration="800"
                >
                    <Container>
                        {item?.data && (
                            <>
                                <SimpleSlider
                                    sliderBoxWidth={true}
                                    buttonRedirect={item?.redirect_url}
                                    buttonText={item?.button_text}
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
            return <MostSearchedSpeciality fetchDoctorByAllFilter={fetchDoctorByAllFilter} setSpecialtiesModal={setSpecialtiesModal} specialtiesModal={specialtiesModal} widgetData={item} key={index} />;

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
                            width={855}
                            height={480}
                        />
                    </div>
                );
            }

            if (item?.data?.[0]?.type === "video") {
                return <VideoWidget widgetData={item} key={index} />;
            }

        case "web-media-v3":
            if (item?.data?.[0]?.type === "image") {
                return (
                    <div className="image-area-article">
                        <Image
                            crossorigin="anonymous"
                            className="img-fluid"
                            alt={item?.data?.[0]?.alt}
                            src={item?.data?.[0]?.file_url}
                            width={855}
                            height={480}
                        />
                    </div>
                );
            }

            if (item?.data?.[0]?.type === "video") {
                return <VideoWidget widgetData={item} key={index} />;
            }

        case "web-media-custom":
            return <SehatScanVideo widgetData={item} key={index} />;

        case "app-media-custom":
            return <SehatScanVideo widgetData={item} key={index} />;

        case "web-card":
            if (item?.data?.[0]?.type == "topic") {
                return <DiscoverWellnesstopicsWidget widgetData={item} key={index} />;
            }


        case "app-card":
            if (item?.data?.[0]?.type == "topic") {
                return <DiscoverWellnesstopics widgetData={item} key={index} />;
            }

            if (item?.data?.[0]?.type == "article") {
                return <DiscoverWellnesstopics widgetData={item} key={index} />;
            }
            if (item?.data?.[0]?.type == "doctor") {
                return <FeaturedDoctor widgetData={item} key={index} />;
            }

        case "web-card-with-slider":
            if (item?.data?.[0]?.type == "topic") {
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
                        {item?.data?.[0]?.card_type === 'start-video-call' ? (
                            <>
                                <StartAVideoCall widgetData={item} key={index} />
                            </>
                        ) : null}
                        {item?.data?.[0]?.card_type === "pricing-doctor" ? (
                            <>
                                <section
                                    key={index}
                                    data-reference_widget_id={item?.id}
                                    data-widget_id={item?.widget_id}
                                    className="_overflow-hidden doctor dynamic-widget doctorNewSection"
                                    data-aos="fade-up" data-aos-duration="800"
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
            if (item?.data?.[0]?.type == "single-column") {
                return (
                    <>
                        <DiscoverWellnessTopicsWidgetCustomRefCard
                            widgetData={item}
                            key={index}
                        />
                    </>
                );
            }

        case "web-call-by-reference-card-custom":
            if (item?.data?.[0]?.type == "double-column-cards") {
                return (
                    <TopDoctorFaD
                        widgetData={item}
                    />
                )
            }
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

                        {item?.data?.[0]?.card_type === "check-your-health" ? (
                            <>
                                <TwoImagesBanner widgetData={item} key={index} />
                            </>
                        ) : null}

                        {item?.data?.[0]?.card_type === "doctor-now-how-its-work" ? (
                            <>
                                <BookLabTest widgetData={item} key={index} />
                            </>
                        ) : null}

                        {item?.data?.[0]?.card_type === "pricing-benefits" ? (
                            <>
                                <BookLabTestSteps widgetData={item} key={index} />
                            </>
                        ) : null}

                        {/* {item?.data?.[0]?.card_type === "subscription-packages" ? (
                            <>
                                <LabPackages widgetData={item} key={index} />
                            </>
                        ) : null} */}

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
                        {item?.data?.[0]?.card_type === "doctor-now-how-its-work" ? (
                            <>
                                <HowItWorksDoctorNow widgetData={item} key={index} />
                            </>
                        ) : null}
                        {item?.data?.[0]?.card_type === "doctor-now-benefits-of-instant-consultation" ? (
                            <>
                                <BenefitsConsultation widgetData={item} key={index} />
                            </>
                        ) : null}
                        {item?.data?.[0]?.card_type === "pricing-benefits" ? (
                            <>
                                <Benefits widgetData={item} key={index} />
                            </>
                        ) : null}
                        {item?.data?.[0]?.card_type === "pricing-start-video-call" ? (
                            <>
                                <HowToInstall widgetData={item} key={index} />
                            </>
                        ) : null}
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
                        {item?.data?.[0]?.card_type === "pricing-doctor" ? (
                            <>
                                <section
                                    key={index}
                                    data-reference_widget_id={item?.id}
                                    data-widget_id={item?.widget_id}
                                    className="_overflow-hidden doctor dynamic-widget doctorNewSection"
                                    data-aos="fade-up" data-aos-duration="800"
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
                        {item?.data?.[0]?.card_type === "doctor-now-health-concerns" ? (
                            <>
                                <CommonHealth setSpecialityValue={setSpecialityValue} selectedCityCookie={selectedCityCookie} widgetData={item} key={index} />
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

        case 'web-heading-and-description-v3':
            return (
                <GerdSymtoms
                    visibleCallback={visibleCallback}
                    widgetData={item}
                    key={index}
                />
            );
        case 'app-heading-and-description':
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
            return <BrowseDoctor widgetData={item} key={index} />;
            return <p>lol</p>
        case 'app-call-to-action':
            return <BrowseDoctor widgetData={item} key={index} />;
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


         case 'web-career-v3':
            if (item?.slug == "careers-v3" && item?.key_type == "web-career-v3") {
                return (
                <section
                    key={index}
                    data-reference_widget_id={item?.id}
                    data-widget_id={item?.widget_id}
                    className="dynamic-widget"
                >
                
                    { console.log({item})}
                    <OpenPositions widgetData={item} key={'0000'} />
                </section>
                );
            }

        // ALL V3 COMPONENTS CALL STARTS FROM HERE
        case 'web-call-by-reference-card-custom-v3':
            if (item?.card_type == "widget-1-v3" && item?.slug == 'home-v3') {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <BannerSlider widgetData={item} />
                    </section>
                )
            }



            if (item?.card_type == "widget-2-v3" && item?.slug == 'home-v3') {
                return (
                    <>
                        <TopLogoSlider widgetData={item} />
                    </>

                )
            }
            if (item?.card_type == "widget-40-v3" && item?.slug == 'home-v3') {
                return (
                    <>
                        <TopLogoSlider widgetData={item} />
                    </>

                )
            }
            if (item?.card_type == "widget-3-v3" && item?.slug == 'home-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <ConsultNowSection widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.card_type == "widget-4-v3" && item?.slug == 'home-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <ReachedWhere widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.card_type == "widget-5-v3" && item?.slug == 'home-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <HealthBenefits widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.card_type == "widget-6-v3" && item?.slug == 'home-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <TrustedBy widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.card_type == "widget-7-v3" && item?.slug == 'home-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <Endorsed widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.card_type == "widget-8-v3" && item?.slug == 'home-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <TrackHealth widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.card_type == "widget-9-v3" && item?.slug == 'home-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <HealthCompanyLogoes widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.card_type == "widget-10-v3" && item?.slug == 'home-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <Defeatdiabetes widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.card_type == "widget-11-v3" && item?.slug == 'home-v3') {
                return (
                    <>
                        <Successstories widgetData={item} />
                    </>
                )
            }
            if (item?.card_type == "widget-12-v3" && item?.slug == 'home-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <HealthCovrage widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.card_type == "widget-13-v3" && item?.slug == 'home-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <StoriesLove widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.card_type == "widget-14-v3" && item?.slug == 'home-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <SliderFooter widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.card_type == "widget-15-v3" && item?.slug == 'home-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <DiseaseLibrary widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.card_type == "widget-2-v3" && item?.slug == 'sehat-a-z-v3') {
                return (
                    <>
                        <TopLogoSlider widgetData={item} />
                    </>

                )
            }

            if (item?.card_type == "widget-2-v3" && item?.slug == 'at-home') {
                return (
                    <>
                        <TopLogoSlider widgetData={item} />
                    </>

                )
            }


            if (item?.slug == 'sehat-a-z-v3' && item?.card_type == "widget-3-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <MostViewedTopics widgetData={item} />
                    </section>

                );
            }
            if (item?.slug == 'sehat-a-z-v3' && item?.card_type == 'widget-5-v3') {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <ReduceDiabities widgetData={item} key={index} />
                    </section>
                )
            }

            if (item?.slug == 'sehat-a-z-v3' && item?.card_type == 'widget-7-v3') {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <SliderLimitedOffer widgetData={item} key={index} />
                    </section>
                )
            }


            if (item?.slug == 'sehat-a-z-v3' && item?.card_type == 'widget-9-v3') {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <ConnectDoctor widgetData={item} key={index} />
                    </section>
                )
            }
            if (item?.card_type == "widget-1-v3" && item?.slug == "doctor-now-v3") {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <MainBanner widgetData={item} pageName={pageName} />
                    </section>
                </>)
            }
            if (item?.card_type == "widget-2-v3" && item?.slug == "doctor-now-v3") {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <RatingsBar widgetData={item} pageName={pageName} />
                    </section>
                </>)
            }
            if (item?.card_type == "widget-3-v3" && item?.slug == "doctor-now-v3") {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <GetHelp widgetData={item} />
                    </section>
                </>)
            }
            if (item?.card_type == "widget-4-v3" && item?.slug == "doctor-now-v3") {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <SecondOpinion widgetData={item} />
                    </section>
                </>)
            }
            if (item?.card_type == "widget-5-v3" && item?.slug == "doctor-now-v3") {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <HowItWorksDoctor widgetData={item} />
                    </section>
                </>)
            }
            if (item?.card_type == "widget-6-v3" && item?.slug == "doctor-now-v3") {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <CaringCompetant widgetData={item} />
                    </section>
                </>)
            }

            if (item?.card_type == "widget-7-v3" && item?.slug == "doctor-now-v3") {
                return (<>
                    <OurStatistics widgetData={item} />
                </>)
            }
            if (item?.card_type == "widget-2-v3" && item?.slug == 'sehat-scan-v3') {
                return (<>
                    <TopLogoSlider widgetData={item} />
                </>)
            }
            if (item?.card_type == "widget-3-v3" && item?.slug == 'sehat-scan-v3') {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <AiTechnology widgetData={item} />
                    </section>
                </>)
            }
            if (item?.card_type == "widget-4-v3" && item?.slug == 'sehat-scan-v3') {
                return (<>
                    <CircialHealthVitals widgetData={item} />
                </>)
            }
            if (item?.card_type == "widget-5-v3" && item?.slug == 'sehat-scan-v3') {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <ReachedWhere widgetData={item} />
                    </section>
                </>)
            }
            if (item?.card_type == "widget-6-v3" && item?.slug == 'sehat-scan-v3') {
                return (<>
                    <VideoSection widgetData={item} />
                </>)
            }
            if (item?.card_type == "widget-7-v3" && item?.slug == 'sehat-scan-v3') {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <TrackVitals widgetData={item} />
                    </section>
                </>)
            }
            if (item?.card_type == "widget-8-v3" && item?.slug == 'sehat-scan-v3') {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <HealthGoal widgetData={item} />
                    </section>
                </>)
            }
            if (item?.card_type == "widget-9-v3" && item?.slug == 'sehat-scan-v3') {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <StoriesLove widgetData={item} />
                    </section>
                </>)
            }
            if (item?.card_type == "widget-10-v3" && item?.slug == 'sehat-scan-v3') {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <Endorsed widgetData={item} />
                    </section>
                </>)
            }
            if (item?.card_type == "widget-11-v3" && item?.slug == 'sehat-scan-v3') {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <HealthBenefits widgetData={item} />
                    </section>
                </>)
            }
            if (item?.card_type == "widget-12-v3" && item?.slug == 'sehat-scan-v3') {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <LearnScanTechnology widgetData={item} />
                    </section>
                </>)
            }


            if (item?.card_type == "widget-8-v3" && item?.slug == "doctor-now-v3") {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <StoriesLove widgetData={item} />
                    </section>
                </>)
            }

            if (item?.card_type == "widget-9-v3" && item?.slug == "doctor-now-v3") {
                return (<>
                    <TopLogoSlider widgetData={item} />
                </>)
            }


            if (item?.card_type == "widget-10-v3" && item?.slug == "doctor-now-v3") {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <ConnectDoctor widgetData={item} />
                    </section>
                </>)
            }

            if (item?.card_type == "widget-11-v3" && item?.slug == "doctor-now-v3") {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <AreUDoctor widgetData={item} />
                    </section>
                </>)
            }

            if (item?.card_type == "widget-12-v3" && item?.slug == "doctor-now-v3") {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <SliderFooter widgetData={item} />
                    </section>
                </>)
            }

            if (item?.card_type == "widget-14-v3" && item?.slug == "doctor-now-v3") {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <TrustedBy widgetData={item} />
                    </section>
                </>)
            }

            if (item?.card_type == "widget-1-v3" && item?.slug == "pricing-v3") {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <MainBanner widgetData={item} pageName={pageName} />
                    </section>
                </>)
            }

            if (item?.card_type == "widget-2-v3" && item?.slug == "pricing-v3") {
                return (<>
                    <TrustedSection widgetData={item} pageName={pageName} />
                </>)
            }
            if (item?.card_type == "widget-3-v3" && item?.slug == "pricing-v3") {
                return (<>
                    <TopLogoSlider widgetData={item} pageName={pageName} />
                </>)
            }
            if (item?.card_type == "widget-4-v3" && item?.slug == 'pricing-v3') {
                return (<>
                    <VideoSection widgetData={item} pageName={pageName} />

                </>)
            }
            if (item?.card_type == "widget-5-v3" && item?.slug == "pricing-v3") {
                return (<>
                    <OurStatistics widgetData={item} />
                </>)
            }
            if (item?.card_type == "widget-6-v3" && item?.slug == "pricing-v3") {
                return (<>
                    <Testimonials widgetData={item} />
                </>)
            }

            if (item?.card_type == 'widget-7-v3' && item?.slug == 'pricing-v3') {
                return (
                    <SliderLimitedOffer widgetData={item} key={index} />
                )
            }


            if (item?.card_type == 'widget-1-v3' && item?.slug == "corporate-wellness-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <BannerCwp widgetData={item} key={index} />
                    </section>
                )
            }




            if (item?.card_type == 'widget-2-v3' && item?.slug == "corporate-wellness-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <TopLogoSlider widgetData={item} key={index} />
                    </section>

                )
            }

            if (item?.card_type == 'widget-3-v3' && item?.slug == "corporate-wellness-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <OverLooking widgetData={item} key={index} />
                    </section>
                )
            }



            if (item?.card_type == 'widget-4-v3' && item?.slug == "corporate-wellness-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <OfferPrecision widgetData={item} key={index} />
                    </section>
                )
            }


            if (item?.card_type == 'widget-5-v3' && item?.slug == "corporate-wellness-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <ReachedWhere widgetData={item} key={index} />
                    </section>
                )
            }

            if (item?.card_type == 'widget-6-v3' && item?.slug == "corporate-wellness-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <Endorsed widgetData={item} key={index} />
                    </section>
                )
            }

            if (item?.card_type == 'widget-7-v3' && item?.slug == "corporate-wellness-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <ReadyBuild widgetData={item} key={index} />
                    </section>
                )
            }

            if (item?.card_type == 'widget-8-v3' && item?.slug == "corporate-wellness-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <StoriesLove widgetData={item} key={index} />
                    </section>
                )
            }

            if (item?.card_type == 'widget-9-v3' && item?.slug == "corporate-wellness-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <SliderFooter widgetData={item} key={index} />
                    </section>
                )
            }



            if (item?.card_type == "widget-4-v3" && item?.slug == 'corporate-wellness-program-workshop') {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <AiTechnology widgetData={item} />
                    </section>
                </>)
            }

            if (item?.card_type == "widget-6-v3" && item?.slug == "corporate-wellness-program-workshop") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <StoriesLove widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-5-v3" && item?.slug == "corporate-wellness-program-workshop") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <WorkshopsAction widgetData={item} />
                        </section>
                    </>
                )
            }


            if (item?.card_type == "widget-2-v3" && item?.slug == "corporate-wellness-program-workshop") {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <RatingsBar widgetData={item} pageName={pageName} />
                    </section>
                </>)
            }


            if (item?.card_type == 'widget-2-v3' && item?.slug == "ambulatory") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <ConnectDoctor widgetData={item} key={index} pageName={pageName} />
                    </section>
                )
            }
            if (item?.card_type == 'widget-3-v3' && item?.slug == "ambulatory") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <TrustedBy widgetData={item} key={index} pageName={pageName} />
                    </section>
                )
            }
            if (item?.card_type == 'widget-4-v3' && item?.slug == "ambulatory") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <WhatWeDo widgetData={item} key={index} pageName={pageName} />
                    </section>
                )
            }
            if (item?.card_type == 'widget-5-v3' && item?.slug == "ambulatory") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <ReachedWhere widgetData={item} key={index} pageName={pageName} />
                    </section>
                )
            }

            if (item?.card_type == 'widget-6-v3' && item?.slug == "ambulatory") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <TrackVitals widgetData={item} key={index} pageName={pageName} />
                    </section>
                )
            }
            if (item?.card_type == 'widget-8-v3' && item?.slug == "ambulatory") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <TrackHealth widgetData={item} key={index} pageName={pageName} />
                    </section>
                )
            }
            if (item?.card_type == 'widget-9-v3' && item?.slug == "ambulatory") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <Testimonials widgetData={item} key={index} pageName={pageName} />
                    </section>
                )
            }

            if (item?.card_type == 'widget-7-v3' && item?.slug == "ambulatory") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <WhyChoose widgetData={item} key={index} pageName={pageName} />
                    </section>
                )
            }

            if (item?.slug == 'at-home' && item?.card_type == "widget-3-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000" className="test">
                        <MostViewedTopics widgetData={item} key={index} pageName={pageName} />
                    </section>

                );
            }


            if (item?.card_type == "widget-4-v3" && item?.slug == "at-home") {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <SecondOpinion widgetData={item} />
                    </section>
                </>)
            }


            if (item?.card_type == 'widget-5-v3' && item?.slug == "at-home") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <WhyChoose widgetData={item} key={index} pageName={pageName} />

                    </section>
                )
            }

            if (item?.card_type == "widget-6-v3" && item?.slug == 'at-home') {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <AiTechnology widgetData={item} />
                    </section>
                </>)
            }

            if (item?.card_type == "widget-7-v3" && item?.slug == 'at-home') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <StoriesLove widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.card_type == "widget-2-v3" && item?.slug == 'careers-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <HealthCompanyLogoes widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.card_type == "widget-3-v3" && item?.slug == 'careers-v3') {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <CultureCollaboration widgetData={item} />
                    </section>
                )
            }
            if (item?.slug == 'careers-v3' && item?.card_type == "widget-4-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <MostViewedTopics widgetData={item} />
                    </section>

                );
            }
              
            if (item?.card_type == "widget-5-v3" && item?.slug == 'careers-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <Endorsed widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-8-v3" && item?.slug == 'careers-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <TrustedBy widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.card_type == "widget-7-v3" && item?.slug == 'careers-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <WhyWorkWithUs widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.card_type == "widget-1-v3" && item?.slug == 'careers-v3') {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <MainBanner widgetData={item} key={index} />

                    </section>
                )
            }


        case 'web-cwp-workshop-v3':
            if (item?.slug == "corporate-wellness-program-workshop") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <ExploreWorkshops widgetData={item} />
                        </section>
                    </>
                )
            }
            if (item?.slug == "corporate-wellness-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <ExploreWorkshops widgetData={item} key={index} />
                    </section>
                )
            }


        case 'app-call-by-reference-card-custom-v3':
            if (item?.card_type == "widget-1-v3" && item?.slug == "find-a-doctor-v3") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <FadTwoBanner widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-2-v3" && item?.slug == "find-a-doctor-v3") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <TopLogoSlider widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-3-v3" && item?.slug == "find-a-doctor-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <CommonHealthFad widgetData={item} />
                    </section>
                )
            }

            if (item?.card_type == "widget-4-v3" && item?.slug == "find-a-doctor-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <ConnectPatient widgetData={item} />
                    </section>
                )
            }

            if (item?.card_type == "widget-5-v3" && item?.slug == "find-a-doctor-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <CaringCompetant widgetData={item} />
                    </section>
                )
            }

            if (item?.card_type == "widget-6-v3" && item?.slug == "find-a-doctor-v3") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <h2 className="reachedTitleText" > {item?.heading} </h2>
                        <ReachedWhere widgetData={item} />
                    </section>
                )
            }



            if (item?.card_type == "widget-8-v3" && item?.slug == "find-a-doctor-v3") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <HiwFad widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-9-v3" && item?.slug == "find-a-doctor-v3") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <CitySpeciality widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-10-v3" && item?.slug == "find-a-doctor-v3") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <StoriesLove widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-11-v3" && item?.slug == "find-a-doctor-v3") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <AreUDoctor widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-12-v3" && item?.slug == "find-a-doctor-v3") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <SliderFooter widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-1-v3" && item?.slug == "wallet-v3") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <SliderFooter widgetData={item} />
                        </section>
                    </>
                )
            }


            if (item?.card_type == "widget-1-v3" && item?.slug == "thrive") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <BannerMsPro widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-2-v3" && item?.slug == "thrive") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <TopLogoSlider widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-3-v3" && item?.slug == "thrive") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <RealStoryVid widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-4-v3" && item?.slug == "thrive") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <PersonalizedCare widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-5-v3" && item?.slug == "thrive") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <ReadyBuild widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-6-v3" && item?.slug == "thrive") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <TopLogoSlider widgetData={item} />
                        </section>
                    </>
                )
            }


            if (item?.card_type == "widget-7-v3" && item?.slug == "thrive") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <OurStatistics widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-8-v3" && item?.slug == "thrive") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <ProgramIncludes widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-9-v3" && item?.slug == "thrive") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <ReduceDiabities widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-10-v3" && item?.slug == "thrive") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <CaringCompetant widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-1-v3" && item?.slug == "downloads-v3") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <BannerMsPro widgetData={item} pageName={pageName} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-2-v3" && item?.slug == "downloads-v3") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <DownloadAppCta widgetData={item} pageName={pageName} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-3-v3" && item?.slug == 'downloads-v3') {
                return (
                    <>
                        <TopLogoSlider widgetData={item} />
                    </>

                )
            }

            if (item?.card_type == "widget-4-v3" && item?.slug == 'downloads-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <ReachedWhere widgetData={item} />
                        </section>
                    </>
                )
            }

            if (item?.card_type == "widget-5-v3" && item?.slug == "downloads-v3") {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <GetHelp widgetData={item} />
                    </section>
                </>)
            }



        case "web-most-searched-specialties-v3":
            if (item?.slug !== "ms-pro-v3") {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <TopSearchedSpeciality widgetData={item} key={index} />
                        </section>
                    </>
                )
            }

        case 'web-banner-v3':

            if (item?.slug == 'sehat-a-z-v3' && item?.slug !== 'sehat-scan-v3') {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <MainBanner widgetData={item} key={index} />
                    </section>
                );
            }

            if (item?.slug == 'corporate-wellness-v3') {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000" className="boxBanner">
                        <MainBanner widgetData={item} key={index} />
                    </section>
                );
            }

            if (item?.slug == 'doctor-now-v3') {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <MainBanner widgetData={item} pageName={pageName} />
                    </section>
                );
            }

            if (item?.slug == "ambulatory") {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000" className="mainBbb">
                        <MainBanner widgetData={item} key={index} pageName={pageName} />

                    </section>
                )
            }


            if (item?.slug === 'sehat-scan-v3' && item?.slug !== 'sehat-a-z-v3' && item?.widget_id == 1) {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <MainBanner widgetData={item} key={index} pageName={pageName} />
                    </section>
                );
            }
            if (item?.slug == "corporate-wellness-program-workshop") {
                return (<>
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <MainBanner widgetData={item} pageName={pageName} />
                    </section>
                </>)
            }
            if (item?.slug == 'at-home') {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <MainBanner widgetData={item} key={index} pageName={pageName} />
                    </section>
                );
            }



        case 'web-sehat-a-z-v3':
            if (item?.slug == 'sehat-a-z-v3') {
                return (
                    <section data-aos="fade-up" data-aos-duration="3000">
                        <SehatBrowse />
                    </section>
                );
            }

        case 'web-faq-v3':
            if (item?.slug == 'doctor-now-v3' && item?.widget_id == 15) {
                return (
                    <Faq widgetData={item} key={index} />
                );
            }
            if (item?.slug == 'sehat-scan-v3') {
                return (
                    <Faq widgetData={item} key={index} />
                );
            }
            if (item?.slug == 'find-a-doctor-v3') {
                return (
                    <Faq widgetData={item} key={index} />
                );
            }
            if (item?.slug == 'pricing-v3') {
                return (
                    <Faq widgetData={item} key={index} />
                );
            }

            if (item?.slug == "corporate-wellness-v3") {
                return (
                    <Faq widgetData={item} key={index} />
                )
            }

            if (item?.slug == "wallet-v3" && item?.key_type == "web-faq-v3") {
                return (
                    <Faq widgetData={item} key={index} />
                )
            }

            if (item?.slug == 'thrive' && item?.key_type == "web-faq-v3") {
                return (
                    <Faq widgetData={item} key={index} />
                );
            }

            if (item?.slug == 'corporate-wellness-program-workshop' && item?.key_type == "web-faq-v3") {
                return (
                    <Faq widgetData={item} key={index} />
                );
            }


            if (item?.key_type == "web-faq-v3" && item?.slug == 'at-home') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <Faq widgetData={item} key={index} />
                        </section>
                    </>
                )
            }
            if (item?.slug == 'careers-v3' && item?.widget_id == 15) {
                return (
                    <Faq widgetData={item} key={index} />
                );
            }
            if (item?.key_type == "web-faq-v3" && item?.slug == 'ambulatory') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <Faq widgetData={item} key={index} />
                        </section>
                    </>
                )
            }

        case 'web-article-v3':
            if (item?.slug == 'sehat-a-z-v3' && item?.key_type == 'web-article-v3') {
                return (
                    <>
                        <section data-aos="fade-up" data-aos-duration="3000">
                            <HealthArticles widgetData={item} key={index} />
                        </section>
                    </>
                )
            }
        default:
            return null;
    }
};
