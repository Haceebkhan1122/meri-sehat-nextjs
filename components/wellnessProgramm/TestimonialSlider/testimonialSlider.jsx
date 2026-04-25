import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import Image from "next/image";
import imageClient from "../../../public/svg/imageClient.svg"
import staricon from '../../../public/svg/staricon.svg'
import Star from 'public/svg/star__svg.svg';
import EmptyStar from 'public/svg/empty_star.svg';

function TestimonialSlider({ corporateData }) {

  const [widgets, setWidgets] = useState([])
  const [widgetsData, setWidgetsData] = useState([])

  useEffect(() => {
    if (corporateData) {
      let widjets = corporateData.widgets.map((item) => {
        return item;
      })
      let widjetsData = corporateData.widgets[9]?.data?.map((item) => {
        return item;
      })
      setWidgets(widjets)
      setWidgetsData(widjetsData)
    }
  }, [])

  const settings = {
    arrow: true,
    infinite: true,
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const generateStarIcons = (rating) => {
    const filledStars = Math.round(rating);
    const emptyStars = 5 - filledStars;
    const filledStarIcons = Array.from({ length: filledStars }, (_, index) => (
      <Image key={index} width={24} height={23} src={Star} alt='' />
    ));
    const emptyStarIcons = Array.from({ length: emptyStars }, (_, index) => (
      <Image key={index + filledStars} width={24} height={23} src={EmptyStar} alt='' />
    ));
    return [...filledStarIcons, ...emptyStarIcons];
  };

  return (
    <>
      <section className="testimonials_New wellnessProgramTestimonial mt100 pb100" data-aos="fade-up" data-aos-duration="800">
        <div className="position-relative">
          <Row>
            <Col lg={3} className="pe-0">
              <h2 className="headingnew2 mb-3">
                {widgets[9]?.data[0].heading}
              </h2>
              <hr className="d-lg-none d-block"></hr>
              <p>{widgets[9]?.data[0].description}</p>
            </Col>
            <Col lg={9} className="client_slider ps-4">
              <div className="box_testimonial_slid slider_banner_dr bottom_pagination">
                <Slider {...settings}>
                  {widgetsData?.map((item) => {
                    return (<>
                      <div>
                        <Row>
                          <Col lg={4}>
                            <div className="client_image">
                              <Image
                                src={item?.image}
                                alt="Client"
                                className="img-fluid"
                                width={500}
                                height={500}
                              />
                            </div>
                          </Col>
                          <Col lg={8} className="my-auto ps-md-0">
                            <div className="box_testimonial mt-5">
                              <p>{item.rating_text}</p>
                              <div className="d-flex justify-content-between">
                                <h6>{item.reviewer_name}</h6>
                                <div className="starsWraper">
                                  {generateStarIcons(item.rating)}
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </>)
                  })}
                </Slider>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  )
}

export default TestimonialSlider