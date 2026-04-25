import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
function Benefits(props) {
  const [isMobile, setIsMobile] = useState(false);
  const { widgetData = [], key } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(widgetData?.data);
  }, [widgetData]);

  useEffect(() => {
    import("react-device-detect").then((item) => {
      setIsMobile(item.isMobile);
    });
  }, []);
  const settings = {
    arrows: false,
    dots: true,

    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],

    speed: 500,
  };
  return (
    <>
      <section
        className="threeColumnArea pt-5 dd"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <Container>
          <div className="row align-items-center justify-content-center text-center">
            <h2 className="hide_labs_page">{widgetData?.heading}</h2>
            <div className="row my-4 slider_banner_dr benefits_slider rtl labs_sliders">
              {isMobile ? (
                <Slider {...settings}>
                  {widgetData?.data?.length > 0 &&
                    widgetData?.data?.map((item, index) => {
                      return (
                        <>
                          <div className="steps ">
                            <div className="d-none-mob">
                              <h2>Steps to book a lab test</h2>
                              <hr className="hr1"></hr>
                            </div>
                            <div>
                              <Image
                                src={item?.image}
                                alt="icon"
                                className="img-fluid"
                                width={80}
                                height={80}
                              />
                              <h4 className="my-3 d-none-mob ">Step
                                {(index === 0 && (
                                  <>
                                    <span> 1</span>
                                  </>
                                )) ||
                                  (index === 1 && (
                                    <>
                                      <span> 2</span>
                                    </>
                                  )) ||
                                  (index === 2 && (
                                    <>
                                      <span>  3</span>
                                    </>
                                  ))}
                              </h4>
                              <h4 className="my-3">{item?.heading}</h4>
                              <p>{item?.description}</p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </Slider>
              ) : (
                widgetData?.data?.length > 0 &&
                widgetData?.data?.map((item) => {
                  return (
                    <>
                      <Col md={4}>
                        <div>
                          <Image
                            src={item?.image}
                            alt="icon"
                            className="img-fluid"
                            width={80}
                            height={80}
                          />
                          <h4 className="my-3">{item?.heading}</h4>
                          <p className="urdu_peragraph">{item?.description}</p>
                        </div>
                      </Col>
                    </>
                  );
                })
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Benefits;
