import React from 'react'
import styles from './caringCompetant.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import Slider from 'react-slick';
import Router, { useRouter } from 'next/router';
import Cookies from "js-cookie";
import parse from 'html-react-parser';
import useMediaQuery from '@mui/material/useMediaQuery';

const CaringCompetant = (props) => {
    const isMobile = useMediaQuery('(max-width:768px)')

    const router = useRouter()
    const settings = {
        arrows: true,
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        centerMode: true,
        centerPadding: "60px",
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1.118,
                    centerMode: false,
                },
            },
        ],
    };

    const handleModalShow = () => {
        return Cookies.set('specDiseaseModal', 1);
    };

    const removeCookie = () => {
        return Cookies.remove('specDiseaseModal');
    }

    const { pathname } = useRouter();

    return (
        <section className={`${styles.caringCompetant} caringCompetant test01`} style={{ background: props?.widgetData?.data[0]?.card_1_color }}>
            <Container className='h-100'>
                <Row className='h-100 align-items-center boxH'>
                    <Col lg={5} className={`my-auto`}>
                        <div className={`${styles.left__sec} left__sec`} style={{ background: props?.widgetData?.data[0]?.card_1_color }}>
                            <h1> {parse(props?.widgetData?.data[0]?.heading)} </h1>
                            <p>  {props?.widgetData?.data[0]?.description} </p>
                            <div className={styles.btnWrape} onClick={() => handleModalShow()}>
                                <button className='buttonWithBgColor_hover' style={{ background: props?.widgetData?.data[0]?.card_1_inner_color }}> {props?.widgetData?.data[0]?.button_text} </button>
                            </div>
                        </div>
                    </Col>

                    {props?.widgetData?.slug == "thrive"
                        &&
                        <button className={styles.btnMobileBook} onClick={() => handleModalShow()}> {props?.widgetData?.data?.[0]?.button_text} </button>
                    }


                    {(pathname == "/find-a-doctor" && isMobile) && <button className={styles.btnMobileBook} onClick={() => handleModalShow()}> {props?.widgetData?.data?.[0]?.button_text} </button>}

                    <Col lg={7} className={`h-100 ss`}></Col>
                </Row>
                <div className={pathname == "/find-a-doctor" ? `${styles.right__sec} ${styles.right__secFad} sss` : `${styles.right__sec}`}>
                    <div className={`${styles.sliderWraperCaring} sliderWraperCaring ddd`}>
                        <Slider {...settings} >
                            {props?.widgetData?.data?.slice(1).map((item, i) => {
                                return (
                                    <>
                                        <div key={item?.id} className={styles.doc_card_caring} onClick={() => item?.redirect_url && router.push(item?.redirect_url)} >
                                            <div className={`${styles.rateWraper} rateWraper`}>
                                                <span className={styles.rateTe}> {item?.sub_head}  </span>
                                                <span className={styles.starSvg}></span>
                                            </div>
                                            {item?.image && <Image src={item?.image} width={312} height={424} alt={`text_${i}`} className={`${styles.single_doc_svg} img-fluid`} />}
                                            <div className={`${styles.infoWrape} infoWrape hsdfbv`}>
                                                <h2> {item?.heading} </h2>
                                                <p> {item?.description} </p>
                                            </div>
                                        </div>
                                        {/* {(pathname == "/find-a-doctor" && isMobile) && <button className={styles.bookNowCaring} onClick={handleModalShow}> Book now </button>} */}
                                    </>
                                )
                            })
                            }
                        </Slider>
                        {/* {isMobile && (<button className={styles.bookNowCaring} onClick={() => handleModalShow()}> Book now </button>)} */}
                    </div>

                </div>
                <Row>
                    <Col xs={12}>
                        <div className='d-lg-none d-block'>
                            <button className={styles.btnMobileBook} onClick={() => router.pathname == "/find-a-doctor" ? handleModalShow() : router.push(`${props?.widgetData?.redirect_url}`)}> {props?.widgetData?.data?.[0]?.button_text} </button>
                            {props?.widgetData?.slug == "thrive"
                                &&
                                <button className={styles.btnMobileBook} onClick={() => router.push(`${props?.widgetData?.redirect_url}`)}> {props?.widgetData?.data?.[0]?.button_text} </button>
                            }
                        </div>
                    </Col>
                </Row>

            </Container>
        </section>
    )
}

export default CaringCompetant;
