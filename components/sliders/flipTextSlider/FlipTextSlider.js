import React from "react";
import Slider from "react-slick";
// import './flipTextSlider.css';
import { SectionHeadingLarge } from "@/components/sectionHeadingLarge";

// const dummyText = ['Hello', 'World', 'Welcome', 'to', 'React'];

function FlipTextSlider(props) {
  const { flipTextSliderChild } = props;

  const settings = {
    className: "gallery",
    autoplay: true,
    arrows: false,
    dots: false,
    slidesToShow: 1,
    centerPadding: "10px",
    draggable: false,
    infinite: true,
    pauseOnHover: false,
    swipe: false,
    touchMove: false,
    vertical: true,
    speed: 1000,
    autoplaySpeed: 2000,
    useTransform: true,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
    adaptiveHeight: true,
  };

  const children = flipTextSliderChild?.map((child, index) => {
    return (
      <div key={index + 1}>
        <SectionHeadingLarge text={child + ""} />
      </div>
    );
  });
  return (
    <section className="flipTextSlider">
      <Slider {...settings}>{children}</Slider>
    </section>
  );
}

// FlipTextSlider.propTypes = {
//   animationText: PropTypes.node.isRequired
// };

export default FlipTextSlider;
