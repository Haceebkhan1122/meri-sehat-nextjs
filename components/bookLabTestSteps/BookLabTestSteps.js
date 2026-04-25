import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import styles from "./bookLabTestSteps.module.css";
import Slider from "react-slick";

function BookLabTestSteps({ widgetData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    import("react-device-detect").then((item) => {
      setIsMobile(item.isMobile);
    });
  }, []);

  const settings = {
    arrow: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    SlidesPerRow: 1,
    centerMode: true,
  };
  return (
    <>
      <Container className="mt-5 mb-3 book_a_lab_test">
        <div className="d-block d-lg-none box_slider">
          <h3 className={styles.headingSlickTrack}> {widgetData?.heading} </h3>
          <Slider {...settings} className="slider_lab_test">
            {widgetData?.data?.map((item, index) => (
              <div key={index}>
                <div
                  className={`${styles.step_box} for_size_mob_bookA`}
                  style={{
                    backgroundColor: item?.card_1_color
                      ? item?.card_1_color
                      : "#E1FAF8",
                  }}
                >
                  <div className={` d-flex flex-column align-items-center book_a_lab_test_inner ${styles.book_a_lab_test_inner} `}>
                    <div className="image_inner_">
                      <div class="circle-mask">
                        <img
                          src={item?.card_1_icon}
                          width="80"
                          height="100"
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      {/* <h4 className={`step${index + 1}`}>Step {index + 1}</h4> */}
                      <p className={`${styles.newParaMobile} text-center mt-3 mb-3 newParaMobile`}>
                        {item?.card_1_desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="d-none d-lg-block col-12 col-lg-12">
          <h3 className={`mb-3 mt-3 ${styles.labTestHeading}`}> {widgetData?.heading} </h3>
          <div
            className={`row d-flex   ${styles.step_boxes} mt-3`}
          >
            {widgetData?.data?.map((item, index) => (
              <div
                key={index}
                className={`${styles.step_box} col-lg-4 col-md-4`}
                
              >
                <div className={`${styles.step_box1} d-flex flex-column align-items-center book_a_lab_test_inner `}
                style={{
                  backgroundColor: item?.card_1_color
                    ? item?.card_1_color
                    : "#E1FAF8",
                }}
                >
                  <div className="image_inner_">
                    <div class="circle-mask">
                      <img
                        src={item?.card_1_icon}
                        width="80"
                        height="100"
                        alt=""
                      />
                    </div>
                  </div>
                  <p className={`${styles.textBoxColor} text-center mt-3 mb-3`}>
                    {item?.card_1_desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

export default BookLabTestSteps;
