import React, { useState, useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { HeadingDesc } from "@/components/HeadingDesc/HeadingDesc";
import { HeadingDescVsmall } from "@/components/headingDescVsmall/HeadingDescVsmall";
import { SectionHeadingLarge } from "@/components/sectionHeadingLarge";
import ReviewBy from '../reviewBy/ReviewBy'
import SocialLinks from '../socialLinks/SocialLinks'
import StatusWithoutBackground from '../statusWithoutBackground/StatusWithoutBackground'
import Link from 'next/link';
import arrowIcon from '../../public/svg/pink-arrow.svg';
import useMediaQuery from '@mui/material/useMediaQuery';
import { renderWidget } from '@/utils/common';
import { slugify } from '@/utils/utilFunctions';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Slider from 'react-slick';


const RelatedArticles = (props) => {
    const router = useRouter();
    const searchParam = router.query;
    const { admin } = router.query;
    const { relatedArticle = [], slug } = props;
    const statusRef = useRef([]);
    const reviewCardStick = useRef(null);
    const [addClass, setAddClass] = useState('');
    const [articles, setRenderArticles] = useState([]);
    const [executeScroll, setExecuteScroll] = useState(true);
    const [searchParams, setSearchParams] = useState(searchParam);
    const [classList, setClassList] = useState('');
    const isMobile = useMediaQuery('(max-width:767px)');

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrow: false,
        slidesToShow: 2,
        autoplay: true,
        slidesToScroll: 1,
    };

    const [imageCollection, setImageCollection] = useState([
        { image: '../../public/png/core_ad.png', link: 'https://getzpharma.com/product/core24/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat' },
        { image: '../../public/png/core_ad1.png', link: 'https://getzpharma.com/product/livity/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat' },
        { image: '../../public/png/core_ad2.png', link: 'https://getzpharma.com/product/agnar/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat' },
        { image: '../../public/png/core_ad3.png', link: 'https://getzpharma.com/product/olcuf/?c=pakistan&utm_source=MS&utm_medium=Banner&utm_campaign=MeriSehat' },

    ])
    const [imageIndexToShow, setImageIndexToShow] = useState(null);

    useEffect(() => {
        setImageIndexToShow(Math.floor(Math.random() * imageCollection.length));
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (!param) {
                const pageProgress =
                    document.documentElement.scrollTop /
                    (document.documentElement.scrollHeight -
                        document.documentElement.clientHeight);
                const pageProgressPercentage = pageProgress * 100;
                const pageProgressPercentageFixed = pageProgressPercentage.toFixed(0);
                if (
                    pageProgressPercentageFixed == 80 ||
                    (pageProgressPercentageFixed == 100 &&
                        relatedArticle[articles.length] !== undefined)
                ) {
                    if (articles.length < relatedArticle.length) {
                        let _temp = [...articles, relatedArticle[articles.length]];
                        setRenderArticles(_temp);
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [articles, relatedArticle, searchParams]);

    let param = admin;

    const stickStatus = () => {
        if (statusRef?.current?.length > 0) {
            statusRef?.current?.map((item, i) => {
                let status = item?.getBoundingClientRect();
                let style = window.getComputedStyle(item);
                let top = style.top ? parseInt(style.top.split('px')[0]) : 0;
                if (status.top <= top) {
                    item.classList.add('_status');
                    reviewCardStick.current.classList.add('show');
                } else {
                    item.classList.remove('_status');
                    reviewCardStick.current.classList.remove('show');
                }
            });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', stickStatus);
        return () => {
            window.removeEventListener('scroll', stickStatus);
        };
    }, []);

    return (
        <>
            {props?.relatedArticle?.length > 0 && (
                <>
                    {!isMobile ? (
                        <Row className="related_articles_wrapper">
                            <h1>Related Articles</h1>
                            {props?.relatedArticle?.map((item) => {
                                return (
                                    <Col md={3}>
                                        <div className="content relatedArticle">
                                            <Link href={item?.redirect_url}>
                                                <div className="box_wrapper">
                                                    <div className="image-container">
                                                        <Image src={item?.image} width={200} height={260} alt="Related Article" />
                                                    </div>
                                                    <h3>{item?.name}</h3>
                                                </div>
                                            </Link>
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                        ) : (<>
                                <h1 className='slider_head'>Related Articles</h1>
                                <Slider {...settings} className='slider_relatedArticle'>
                                    {props?.relatedArticle?.map((item) => {
                                        return (
                                            <Col lg={3}>
                                                <div className="content relatedArticle">
                                                    <Link href={item?.redirect_url}>
                                                        <div className="box_wrapper">
                                                            <div className="image-container">
                                                                <Image src={item?.image} width={200} height={260} alt="Related Article" />
                                                            </div>
                                                            <h3>{item?.name}</h3>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </Col>
                                        );
                                    })}
                                </Slider>
                            </>
                        )
                    }
                </>
            )}
        </>
    );
};
export default React.memo(RelatedArticles);
