import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
// import './simpleSlider.css';
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/fontawesome-free-solid";

function TestimonialSlider(props) {
  const { widgetData = [], key } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (widgetData?.data?.length > 0) {
      setData(widgetData?.data);
    }
  }, [widgetData]);

  const settings = {
    arrow: true,
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
    }
    return stars;
  };

  return (
    <section className="testimonials_New" data-aos="fade-up" data-aos-duration="800">
      <Container className="">
        <section className="my-80">
          <Container>
            <div className="position-relative">
              <Row>
                <Col lg={3}>
                  <h2 className="headingnew2 mb-3">
                    {widgetData?.data?.[0]?.heading}
                  </h2>
                  <hr className="d-lg-none d-block"></hr>
                  <p>{widgetData?.data?.[0]?.description}</p>
                </Col>
                <Col lg={9} className="client_slider">
                  <div className="box_testimonial_slid slider_banner_dr bottom_pagination">
                    <Slider {...settings}>
                      {widgetData?.data?.map((item) => (
                        <div key={item.id}>
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
                              <div className="box_testimonial">
                                <p>{item?.rating_text}</p>
                                <div className="d-flex justify-content-between">
                                  <h6>{item?.reviewer_name}</h6>
                                  <div className="star_icon">
                                    {renderRatingStars(item?.rating)}
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </Container>
    </section>
  );
}

export default TestimonialSlider;
