import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { renderWidget } from '@/utils/common';
import Slider from 'react-slick';
import styled from 'styled-components';
// import Icon from '../../public/png/arrow_icon.png';
import prevArrow from '../../public/svg/prev-icon-new.svg';
import nextArrow from '../../public/svg/next-icon-new.svg';
import { useRouter } from "next/router";
import { discoverWellnessPageFromServer, discoverWellnessPageUrduFromServer } from "@/utils/endpoints";
import API from '@/utils/httpService';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { addTranslation } from '@/store/translationSlice';
import { useDispatch } from "react-redux";
import { MetaDataCustom } from '@/components/metaDataCustom';



function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <Image width={50} height={50} src={nextArrow} alt="nextArrow" />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}>
            <Image width={50} height={50} src={prevArrow} alt="nextArrow" />
        </div>
    );
}

function DiscoverWellness(props) {
    const { _nextI18Next } = props
    const dispatch = useDispatch();
    const router = useRouter();
    const [topics, setTopics] = useState({});
    const [clssForSpace, setClssForSpace] = useState('');

    const initialLocale = _nextI18Next?.initialLocale;
    const i18n = _nextI18Next?.initialI18nStore[initialLocale]?.common;

    useEffect(() => {
        if (typeof i18n === "object" && Object.keys(i18n).length > 0) {
            dispatch(addTranslation(i18n));
        }
    }, [i18n])

    useEffect(() => {
        if (props?.wellnessPageData) {
            setTopics(props?.wellnessPageData)
        }
    }, [props?.wellnessPageData])


    const checkUser = (e, id) => {
        router.push(`/wellness-expert-profile/${id}`);
    }

    useEffect(() => {
        const checkBannerPosition1 = topics?.widgets?.[0]?.key_type == 'web-banner';
        const checkBannerPosition2 =
            topics?.widgets?.[0]?.key_type == 'web-heading-and-description';
        if (checkBannerPosition1 || checkBannerPosition2) {
            setClssForSpace('');
        } else {
            setClssForSpace('topSpace');
        }
    }, [topics]);

    let bnrContent = topics?.is_description_show;

    const notFound1 = topics?.widgets?.[5]?.data?.find((obj) => {
        return obj.type === 'double_column';
    });

    useEffect(() => {
        if (notFound1) {
            document.body.classList.add('only_for_extra_thing');
        }
        else {
            document.body.classList.remove('only_for_extra_thing');
        }
    }, [notFound1])

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


    const settingss = {
        className: 'gallery',
        centerMode: true,
        // centerPadding: '60px',
        rows: 1,
        dots: false,
        arrows: true,
        // infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        loop: true,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    swipeToSlide: true,
                    variableWidth: true,
                    draggable: true,
                    adaptiveHeight: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            }
        ]
    };


    useEffect(() => {
        const wrapper = document.getElementById("wa-btn-wrapper");
        if (router.pathname === "/page/sehat-a-z" || router.pathname === "/page/sehat-a-z/") {
            if (wrapper) {
                wrapper.style.display = "none";
            }
        }
    }, [router.pathname])


    return (
        <>
            <MetaDataCustom metaData={props?.wellnessPageData} />
            <section className={`discoverWellness ${clssForSpace} ${topics?.class_name}`}>
                <>
                    <Row className="myWidget_Controller mb-0">
                        <Col md={12} className='p-0'>
                            <div className={` my_last_widget hk_wellness_slider_doctors sehatSearchBar wellnessBanner wellnessLandingClass `} >
                                {topics?.widgets?.map((item, index) => {
                                    item.class_name = topics.class_name ? topics.class_name : null;
                                    // banner_color = item?.data?.banner_color;
                                    if (item?.key_type == 'web-disease') {
                                        item.heading = 'Browse By \n Condition'
                                        return (
                                            <>
                                                {renderWidget(
                                                    item?.key_type,
                                                    item,
                                                    index,
                                                    false,
                                                    bnrContent,
                                                )}
                                            </>
                                        )
                                    }
                                    return renderWidget(
                                        item?.key_type,
                                        item,
                                        index,
                                        false,
                                        bnrContent,
                                    );
                                })}
                            </div>
                        </Col>
                    </Row>
                </>
                {/* </div> */}
            </section>
        </>
    );
}

export const StyledWellnessBanner = styled.section``;
export const StyledBanner = styled.div`

`;


export async function getServerSideProps({ locale }) {
    const langChecker = Cookies.get("lang");
    const apiLocale = locale === "ur" || langChecker == "2" ? 2 : 1;

    // const wellnessEndPoint = locale === 'ur' || langChecker === '2' ? discoverWellnessPageUrduFromServer : discoverWellnessPageFromServer;
    try {
        const response = await API.get(discoverWellnessPageFromServer, {
            headers: {
                platform: "web",
                locale: apiLocale
            }
        });

        let wellnessData = response?.data;




        if (response?.code === 200) {
            return {
                props: {
                    wellnessPageData: wellnessData,
                    ...(await serverSideTranslations(locale, ['common'])),
                },
            };
        } else {
            return { props: { wellnessData: [] } };
        }
    } catch (error) {
        return { props: { wellnessData: [] } };
    }
}

export default DiscoverWellness;
