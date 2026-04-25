import React from 'react'
import Slider from 'react-slick';
import styles from './sliderFooter.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";

const SliderFooter = (props) => {
    const router = useRouter();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const handlerRedirect = (redirect) => {
        router.push(redirect ? redirect : '/')``
    }

    return (
        <section className={`${styles.sliderFooter} sliderFooter`}>
            <Container className='h-100'>
                <Row className='h-100 justify-content-center'>
                    <Col lg={12}>
                        <div className={`${styles.wraping_sliding_banner} ${props?.widgetData?.slug == "wallet-v3" ? 'wallet_footer_slider' : ''} boxSlider`}>
                            <Slider {...settings} className='slider__fad_banner'>
                                {props?.widgetData?.data?.length > 0 ? props?.widgetData?.data?.map((item, index) => {
                                    return (<>
                                        <div key={item?.id} className={`${styles.wraper_banner_footer} boxSlideCta`} style={{
                                            backgroundImage: `url(${item?.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            borderRadius: '30px 20px 20px 30px'
                                        }} >
                                            <Row className='align-items-center h-100'>
                                                <Col lg={1}></Col>
                                                <Col lg={8} className='my-auto'>
                                                    <div className={`${styles.info_banner} info_banner infobannernew`}>
                                                        <h3>{item?.heading}</h3>
                                                        {
                                                            props?.widgetData?.slug == "corporate-wellness-v3" || props?.widgetData?.slug == "wallet-v3"
                                                            &&
                                                            <button onClick={() => handlerRedirect(props?.widgetData?.data?.[0]?.redirect_url)} className={`${styles.reqDemoBtn} remove-bg_color`}>{props?.widgetData?.data?.[0]?.button_text}</button>
                                                        }
                                                        <div className='homeBtn buttonWithBgColor_hover'>
                                                            <Link href={item?.redirect_url || ''}>
                                                                <button style={{ backgroundColor: item?.card_1_inner_color }} className='button02 buttonWithBgColor_hover'>{item?.button_text}</button>
                                                            </Link>
                                                        </div>
                                                        <p>{item?.description}</p>
                                                        <Image
                                                            src={item?.card_1_icon || ""}
                                                            alt={item?.heading}
                                                            width={282}
                                                            height={300}
                                                            className={`${styles.img__banner_fad} imageHomeSlider`}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={3}></Col>
                                            </Row>
                                        </div>
                                    </>)
                                }) : props?.sliderData?.widgets?.[2]?.data?.map((item, index) => {
                                    return (<>
                                        <div key={item?.id} className={`${styles.wraper_banner_footer} boxSlideCta`} style={{
                                            backgroundImage: `url(${item?.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            borderRadius: '30px 20px 20px 30px'
                                        }} >
                                            <Row className='align-items-center h-100'>
                                                <Col lg={1}></Col>
                                                <Col lg={8} className='my-auto'>
                                                    <div className={`${styles.info_banner} info_banner infobannernew`}>
                                                        <h3>{item?.heading}</h3>
                                                        {/* <button onClick={() => handlerRedirect(props?.widgetData?.data?.[0]?.redirect_url)} className={`${styles.reqDemoBtn} remove-bg_color`}>{props?.widgetData?.data?.[0]?.button_text}</button> */}
                                                        {/* <div className='homeBtn buttonWithBgColor_hover'>
                                                            <Link href={item?.redirect_url || ''}>
                                                                <button style={{ backgroundColor: item?.card_1_inner_color }} className='button02 buttonWithBgColor_hover'>{item?.button_text}</button>
                                                            </Link>
                                                        </div> */}
                                                        <p>{item?.description}</p>
                                                        <Image
                                                            src={item?.card_1_icon || ""}
                                                            alt={item?.heading}
                                                            width={282}
                                                            height={300}
                                                            className={`${styles.img__banner_fad} imageHomeSlider`}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg={3}></Col>
                                            </Row>
                                        </div>
                                    </>)
                                })}
                            </Slider>
                        </div>
                    </Col>
                </Row>
            </Container >
        </section >
    )
}

export default SliderFooter;
