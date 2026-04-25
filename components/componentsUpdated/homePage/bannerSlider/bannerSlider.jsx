import React from 'react'
import Slider from "react-slick";
import styles from '../bannerSlider/bannerSlider.module.scss'
import Image from "next/image";
import ButtonMain from '../../buttonMain/buttonMain'
import { Container, Row, Col } from "react-bootstrap";
import parse from 'html-react-parser';

function bannerSlider(props) {

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Slider {...settings} className='bannerSlider'>
        {props?.widgetData?.data?.map((slide, index) => (
          <div key={index}>
            <div
              className={`${styles.bannerMain} bannerSliderMain`}
              style={{ backgroundColor: slide?.card_1_color }}
            >
              <Container className='h-100'>
                <Row className='h-100'>
                  <Col md={6} lg={6} className='my-auto'>
                    <h1 className='mb-4 d-block d-sm-none'>{slide?.heading && parse(slide?.heading)}</h1>
                    <Image src={slide?.image || ''} width={678} height={647} className='img-fluid' alt='banner image' />
                  </Col>
                  <Col md={5} lg={5} className='my-auto ms-auto'>
                    <div>
                      <h1 className='mb-4 d-lg-block d-none'> {slide?.heading && parse(slide?.heading)}</h1>
                      <p className={styles.mb48}>{slide?.sub_head && parse(slide?.sub_head)}</p>
                      <ButtonMain backgroundcolor={slide?.card_1_inner_color} text={slide?.button_text} redirection={slide?.redirect_url} />
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        ))}
      </Slider>
    </>
  )
}

export default bannerSlider