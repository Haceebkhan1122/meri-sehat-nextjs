import React from 'react'
import styles from './hiwFad.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import Mobileframe from '/public/svg/newPages/mobile_frame.svg';
import Image from 'next/image';
import Slider from "react-slick";
import parse from 'react-html-parser';
import { isMobile } from 'react-device-detect';

const HiwFad = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const settingsMob = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <section className={`${styles.wraper_sectio_hiw} wraper_sectio_hiw  `} >
      <Container className='h-100'>
        <Row className='h-100 justify-content-center'>
          <Col lg={12} className='h-100 justify-content-center main_wraper_hiw_right'>
            <Slider {...settings} className={`${props?.widgetData?.slug === "find-a-doctor-v3" && "hIWSliderBox"} slider_hiw_fad`}>
              {props?.widgetData?.data?.map((item) => {
                return (<>
                  <div className={styles.main_wraper_hiw} >
                    <Col lg={6} className={`h-100 mobileRadius2`} style={{ background: item?.card_2_color }}>
                      <div className={styles.main_wraper_hiw_left} >
                        <Image src={item.image} width={526} height={648} alt="" className={`${styles.img_mob_frame} img-fluid`} />
                      </div>
                    </Col>
                    <Col lg={6} className='h-100 mobileRadius1' style={{ background: item?.card_1_inner_color }}>
                      <Row>
                        <Col lg={8} className='mx-auto'>
                          <div className={`${styles.main_wraper_hiw_right} main_wraper_hiw_right`} >
                            <div className={`${styles.wraper_hiww_slider_slide} ${props?.widgetData?.slug === "find-a-doctor-v3" && "fADwraper_hiww_slider_slide"} wraper_hiww_slider_slide`} >
                              <h2 className={styles.heading_doc}> {item?.heading} </h2>
                              <div className={styles.bg__index} style={{ background: item?.card_2_color }}> <h3> {item?.sub_head} </h3> </div>
                              <div className={styles.descParaaa}>
                                <p>{item?.description && parse(item.description)}</p>
                              </div>
                            </div>

                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </div>

                </>)
              })}
            </Slider>
          </Col>
        </Row>
      </Container>
    </section >
  )
}

export default HiwFad
