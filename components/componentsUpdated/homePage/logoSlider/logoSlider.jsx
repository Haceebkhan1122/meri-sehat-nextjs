import React from "react";
import styles from "../logoSlider/logoSlider.module.scss";
import Image from "next/image";
import Slider from "react-slick";

const LogoSlider = (props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: props?.slider?.card_type == "widget-40-v3" ? 9 : 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: props?.slider?.card_type == "widget-40-v3" ? true : false,
    loop: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {props?.slider?.data?.map((slide) => {
          return (
            <div
              key={slide?.id}
              className={`text-center ${
                props?.slider?.slug == "home-v3"
                  ? "slider_new_main_banner"
                  : "partner_slider"
              }  s`}
            >
              {props?.slider?.slug == "home-v3" ? (
                <div className="logo_item">
                  {slide?.image && (
                    <Image
                      src={slide?.image}
                      width={113}
                      height={48}
                      className="img-fluid"
                      quality={100}
                    ></Image>
                  )}
                </div>
              ) : (
                <>
                  {slide?.image && (
                    <Image
                      src={slide?.image}
                      width={113}
                      height={48}
                      className="img-fluid"
                    ></Image>
                  )}
                </>
              )}
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default LogoSlider;
