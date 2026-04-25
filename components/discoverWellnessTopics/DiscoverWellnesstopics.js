/* eslint-disable react/no-array-index-key */
import React, { useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SectionHeadingMed } from "../SectionHeadingMed";
import { CardWithHeaderImage } from "../cardWithHeaderImage";
import Link from "next/link";
import { useRouter } from "next/router";
import Slider from "react-slick";
// import mixpanel from 'mixpanel-browser';
// import i18n from '../../../i18n';
import Arrow from "../../public/svg/right-arrow-border.svg";
import Image from "next/image";

function DiscoverWellnesstopics(props) {
  const router = useRouter();
  const { pathname, query } = router;

  const { widgetData = [] } = props;

  const pushToArticle = useCallback((url) => {
    if (url) {
      router.push(url);
    } else {
      return;
    }
  }, []);

  let HomePageURL = pathname;

  // const dispatch = useDispatch();
  // const userDetailsInfo = useSelector((state) => state.AuthReducer.user);

  const mixPanelTracking = () => {
    // mixpanel.track('Discover Wellness view all', {
    //     Name: userDetailsInfo?.name,
    //     Email: userDetailsInfo?.email,
    //     Number: userDetailsInfo?.phone
    // });
  };

  // useEffect(() => {

  //   dispatch(getUserDetail())

  // }, [])

  const settings = {
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: true,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          draggable: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section
      data-reference_widget_id={widgetData?.id}
      data-widget_id={widgetData?.widget_id}
      className="discoverWellnessTopics dynamic-widget profileSlider pt-4 pt-md-5"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <Container>
        <Row className="position-relative client_slider">
          <Col md={3}>
            <div className="d-flex forBorder-wellness justify-content-between mt-md-5 pt-md-5">
              <SectionHeadingMed text={widgetData?.heading} />
            </div>
          </Col>
          <Col md={9}>
            <div className="borderTop">
              <Row className="mt-5 pt-5 paddingInMobile  mob_font dd">
                <Slider {...settings}>
                  {widgetData?.data?.map((cardData, index) => (
                    <Col key={index}>
                      <CardWithHeaderImage
                        btnText={"view_more_capital"}
                        onClick={() =>
                          pushToArticle(cardData?.data?.redirect_url)
                        }
                        cardData={cardData}
                      />
                    </Col>
                  ))}
                </Slider>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default DiscoverWellnesstopics;
